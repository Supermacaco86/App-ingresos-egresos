import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Register(){

    const[user, setUser]=useState({
        email:'',
        password:'',
        confirmacion:'',
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
            if(user.password === user.confirmacion){
                 await signup(user.email, user.password)
                navigate('/Home')
            }else{
                setError("La contraseña y la confirmacion deben coincidir")
            }
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="name@example.com" />
        </Form.Group>
            
    

            <label htmlFor="password">Contraseña</label>
            <input 
            type="password" 
            name="password"
            placeholder="*********" 
            id="password"
            onChange={handleChange}/>

            <label htmlFor="password">Repita su contraseña</label>
            <input 
            type="password" 
            name="confirmacion"
            placeholder="*********" 
            id="confirmacion"
            onChange={handleChange}/>

            <Button type="submit" variant="outline-dark">Registrate</Button>
        </form>
        </div>
    )
} 