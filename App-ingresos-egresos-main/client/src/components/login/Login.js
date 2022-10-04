import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Button from 'react-bootstrap/Button';


export default function Login(){

    const[user, setUser]=useState({
        email:'',
        password:'',
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({target:{name, value}}) => {
        setUser({...user, [name]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try{
            await login(user.email, user.password)
            navigate('/Home')
        }catch(error){
            console.log(error.code)
            switch(error){
                case error.code === "auth/invalid-email":
                    setError("Correo invalido");
                    break;
                case error.code === "auth/email-already-in-use":
                    setError("Usuario ya registrado");
                    break;
                case error.code === "auth/weak-password":
                    setError("La contraseña debe tener al menos 6 digitos");
                    break;
                case error.code === "auth/wrong-password":
                    setError("Contraseña incorrecta");
                    break;
                case error.code === "auth/user-not-found":
                    setError("El usuario no existe"); 
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

            <label htmlFor="password">Contraseña</label>
            <input 
            type="password" 
            name="password"
            id="password"
            placeholder="********" 
            onChange={handleChange}/>

            <Button type="submit" variant="outline-dark">Ingreso</Button>
        </form>
        </div>
    )
} 