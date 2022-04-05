import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const Bid = ()=>{
    const history = useHistory()
    const [body,setBody] = useState("")
    const [phone,setPhone] = useState("")
    

    const postDetails = (e)=>{
          e.preventDefault()
        fetch("/bidpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                body:body,
                phone:phone,  
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Bid submission Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    

   return(
       <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >
          <form onSubmit={postDetails}>
             <input
            type="text"
            name="phone"
             placeholder="Contact..."
             value={phone}
            onChange={(e)=>setPhone(e.target.value)}
             /> <br/>
             <p>Tell an employer a little bit about yourself, why he or she must hire you?</p>
             <br/>
             <input
            type="text"
            name="body"
             placeholder="Why to hire you?..."
             value={body}
            onChange={(e)=>setBody(e.target.value)}
             />
           
            <button className="btn-land btn-outline waves-effect waves-light #64b5f6 black darken-1"
            type="submit"
            
            >
                Submit bid
            </button>
</form>
       </div>
   )
}


export default Bid