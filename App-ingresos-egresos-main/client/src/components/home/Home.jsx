import React from "react";
import { useAuth } from "../../context/authContext"
import Button from 'react-bootstrap/Button';


export default function Home(){

    const { user, logout, loading } = useAuth()

    const handleLogaut = async () => {
        await logout()
    }

    if(loading){
        return <h1>Cargando</h1>
    }
    return(
        <div>
        <h1>Bienvenido {user.email}</h1>
        <Button variant="outline-dark" onClick={handleLogaut}>
            Salir
        </Button>
        </div>
    )
} 