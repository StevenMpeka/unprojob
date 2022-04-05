import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import Content from './ReadMore';
import { Avatar, Tooltip,  } from '@material-ui/core';

const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('/getsubpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[])

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
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
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return (
       <div className="home" style={{
        marginTop:"50px",
   }}>
           {
               data.map(item=>{
                   return(
                    <div className="card home-card" key={item._id}>
                    <div className="card-header">
                     <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }><div className="avatar"><Avatar alt="user" className="avatar-only" src={item.pic}/>{item.postedBy.name}</div></Link> {item.postedBy._id == state._id 
                    
                    && <i className="material-icons delete" style={{
                        float:"right",
                        alignSelf:"center",
                        
                       
                     }} 
                     onClick={()=>deletePost(item._id)}
                     >delete</i>

                     }</h5>
                     </div>
                    
                     <div className="card-content">
                    
                         <h6>{item.title}</h6>
                         <p><Content body={item.body}/></p>
                         <h6>{item.likes.length} likes</h6>
                     <i className="material-icons" style={{color:"gray"}}>message</i>
                     <i className="material-icons" style={{color:"gray"}}>share</i>
                     {item.likes.includes(state._id)
                     ? 
                      <i className="material-icons" style={{color:"red"}}
                             onClick={()=>{unlikePost(item._id)}}
                       >favorite</i>
                     : 
                     <i className="material-icons" style={{color:"gray"}}
                     onClick={()=>{likePost(item._id)}}
                     >favorite</i>
                     }
                     
                    
                         
                         
                         
                         <form onSubmit={(e)=>{
                             e.preventDefault()
                             makeComment(e.target[0].value,item._id)
                         }}>
                           <input type="text" placeholder="add a comment" />  
                         </form>
                         
                     </div>
                 </div> 
            )
        })
    }
   
   
</div>
   )
}


export default Home