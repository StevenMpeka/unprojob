import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {Link ,NavLink,useHistory} from 'react-router-dom'
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components';
import { IconContext } from 'react-icons/lib';
import * as FaIcons from 'react-icons/fa';
import { IoMdTrendingUp } from 'react-icons/io'
import {useParams} from 'react-router-dom'



const NavIcon = styled(Link)`
  margin-left: 5rem;
  font-size: 2rem;
  display:flex;
  justify-content: flex-end;
  margin-top: 15px;
  
`;
const SidebarNav = styled.nav`
  background: black;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 999;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [data,setData] = useState([])
    const [sidebar, setSidebar] = useState(false);
    const {userid} = useParams()
    const showSidebar = () => setSidebar(!sidebar);

     const history = useHistory()
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Apiplife")
        data.append("cloud_name","apiplife")
        fetch("https://api.cloudinary.com/v1_1/apiplife/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
    
       
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])

    const updatePhoto = (file)=>{
        setImage(file)
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = mypics.filter(item=>{
                return item._id !== result._id
            })
            setPics(newData)
        })
    }

   return (
       <div style={{maxWidth:"550px",margin:"0px auto", marginTop:"30px", marginBottom:"30px"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}> 
           
               <div>
                   <img style={{width:"90px",height:"90px",borderRadius:"80px",marginTop:"15px"}}
                   src={state?state.pic:"loading"} alt="imag"
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h6>{state?state.email:"loading"}</h6>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                   </div>

               </div>
               <IconContext.Provider value={{ color: '#222' }}>
        <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          
          <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} style={{color:"white"}} />
            </NavIcon>
            <button className="btn-land btn-success #c62828 black darken-3"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                logout
            </button>
            <li><NavLink to="/create"><FaIcons.FaUpload size={20}/>Create Post</NavLink></li>
            <li><NavLink to="/activity"><FaIcons.FaBook size={20}/>Activity</NavLink></li>
            <li><NavLink to="/write"><FaIcons.FaBook size={20}/>New blog post</NavLink></li>
            {/* <li><NavLink to="/setting"><FaIcons.FaBook size={20}/>settings</NavLink></li> */}
            <li><NavLink to="/news"><IoMdTrendingUp size={20}/>News</NavLink></li>
          </SidebarWrap>
        </SidebarNav>
          </IconContext.Provider>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn-land btn-outline #64b5f6 black darken-1">
                Update Profile
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            
            
            

            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
             
            </div>      
           <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                           <div className="item">
                       <i className="material-icons delete" style={{
                            float:"right",
                            alignSelf:"center",
                            
                           
                         }} 
                         onClick={()=>deletePost(item._id)}
                         >delete</i>

                        <img key={item._id}  src={item.photo} alt={item.title}/> 

                        </div> 
                       )
                   })
               }

           
           </div>
       </div>
   )
}


export default Profile