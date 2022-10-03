import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";


export default function Register(){

    const[user, setUser]=useState({
        email:'',
        password:'',
    });

    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({target:{name, value}}) => {
        setUser({...user, [name]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try{
            await signup(user.email, user.password)
            navigate('/Home')
        }catch(error){
            console.log(error.code)
            if(error.code === "auth/invalid-email"){
                setError("Correo invalido")
            }else if(error.code === "auth/email-already-in-use"){
                setError("Usuario ya registrado")
            }else if(error.code === "auth/weak-password"){
                setError("La contraseña debe tener al menos 6 digitos")
            }
        }
        
    }

    return(
        <div>
            {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
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
            placeholder="*********" 
            id="password"
            onChange={handleChange}/>

            <button>Registrate</button>
        </form>
        </div>
    )
} 