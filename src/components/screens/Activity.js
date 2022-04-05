import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Activity = () => {
    const [userBid,setBid] = useState("")
    
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    useEffect((id)=>{
       fetch(`/userbid/${id}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
         
            setBid(result)
       })
    },[])

    return (
        <div>
            <h3 style={{marginTop:"50px"}}>Hello activity</h3>
          {userBid ?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
        
               <div>
                   
               </div>
           </div>
     
           <div className="gallery" style={{marginBottom:"40px"}}>
               {
                   userBid.posts.map(item=>{
                       return(
                        <div>
                          <h4>{item.posts.name}</h4>
                         <h6>{item.posts.phone}</h6>
                        </div>
                       )
                   })
               }

           
           </div>
       </div>
       
       
       : <h3>loading...!</h3>}   
        </div>
    )
}

export default Activity
