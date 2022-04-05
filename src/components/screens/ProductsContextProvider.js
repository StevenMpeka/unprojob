import axios from 'axios';
import { Mongoose } from 'mongoose';
import React, { createContext } from 'react'


export const ProductsContext = createContext('default');

export class ProductsContextProvider extends React.Component {
    state = {
        posts: [],
        
    }

    componentDidMount() {
        
       
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           this.setState(result.posts)
       })
    
    }

   
    render() {
    return (
        <ProductsContext.Provider value={{ posts: [...this.state.posts] }}>
                {this.props.children}
        </ProductsContext.Provider>
    )
}
}

