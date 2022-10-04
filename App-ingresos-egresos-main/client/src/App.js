import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import AuthProvider from './context/authContext';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRouted';

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path='/' exact element={<LandingPage/>}/>
              <Route
                path='/Home'
                element={
                  <ProtectedRoute>
                    <Home/>
                  </ProtectedRoute>
                  }/>
                <Route path='/Login' exact element={<Login/>}/>
              <Route path='/Register' exact element={<Register/>}/>
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>
  );
}

export default App;
