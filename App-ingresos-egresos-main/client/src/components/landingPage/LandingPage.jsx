import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Register from "../register/Register"
import Login from "../login/Login"

export default function Loading(){

    return(
        <div>
            <Link to = "/Home">
                <h1>Landing Page</h1>
            </Link>
            <Link to = "/Register">
                <Button variant="outline-dark">Registrate</Button>
            </Link>
            <Link to = "/Login">
                <Button variant="outline-dark">Entrar</Button>
            </Link>
        </div>   
       
    )
}