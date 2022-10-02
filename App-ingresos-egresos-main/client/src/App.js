import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Register from "./components/register/Register"

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes>
          <Route path='/' exact element={<LandingPage/>}/>
          <Route path='/Home' exact element={<Home/>}/>
          <Route path='/Login' exact element={<Login/>}/>
          <Route path='/Register' exact element={<Register/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
