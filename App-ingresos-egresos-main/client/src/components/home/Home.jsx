import React from "react";
import { useAuth } from "../../context/authContext"


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
        <button onClick={handleLogaut}>
            Salir
        </button>
        </div>
    )
} 