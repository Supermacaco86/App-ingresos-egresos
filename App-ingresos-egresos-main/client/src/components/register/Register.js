import React from "react";
import { useState } from "react";


export default function Register(){

    const[user, setUser]=useState({
        email:'',
        password:'',
    })

    const handleChange = e => {
        console.log(e)
    }

    return(
        <form>
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            name="email" 
            placeholder="email"
            onChange={handleChange}/>

            <label htmlFor="password">Password</label>
            <input 
            type="passsword" 
            name="password"
            placeholder="password" 
            id="password"
            onChange={handleChange}/>

            <button>Registrate</button>
        </form>
    )
} 