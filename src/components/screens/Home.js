import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import { Link, NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Content from './ReadMore';
import { Avatar, Tooltip,  } from '@material-ui/core';
import { FaMapMarked, FaMapPin, FaMoneyBill, FaPhone } from 'react-icons/fa';
import { IoMdMap } from 'react-icons/io';





const Home  = ()=>{
    const [data,setData] = useState([])
    const {state} = useContext(UserContext)
    
   
    
    useEffect(()=>{
       fetch('/allpost',{
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

    
    return (
        <div>
            <Navbar/>
            <div className="options-nav">
                <div className="subnav">
                <NavLink to="/"><h4 style={{color:"#009879"}}>Jobs</h4></NavLink>
                <hr />
                <NavLink to="/create"><h4 style={{color:"#009879"}}>Hire</h4></NavLink>
            </div>
            </div>
            {
               data.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                           <div className="card-header">
                            <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }><div className="avatar" style={{color:"black"}}><Avatar alt="user" className="avatar-only" src={state.pic}/><p style={{marginRight:"25px"}}>  {item.postedBy.name}</p></div></Link> {item.postedBy._id == state._id 
                           
                          
                            }</h5>
                            </div>
                            <div className="card-image">
                                <img src={item.photo} alt="imag"/>
                            </div>
                            <div className="card-content">
                               <h4 style={{color:"#009879"}}>{item.title}</h4>
                                <h6><FaMoneyBill/><strong> Budget Tsh: {item.price}/=</strong></h6>
                                <h6><IoMdMap/><strong> Location: {item.location}</strong></h6>
                                <h6><FaPhone/><strong> Contact: {item.phone}</strong></h6>
                                <br/>
                                <p><Content body={item.body}/></p>
                                <br/><br/>
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
                            <div className="bilike">
                             <h6>{item.likes.length} likes</h6>
                            <Link to="/bid"><button className="btn-land btn-success" style={{marginLeft:"20px"}}  >Bid</button></Link>
                            </div>
                                
                                
                                
                            </div>
                        </div> 
                        
                   )
                   
               })
           }
        </div>
    )
}


export default Home