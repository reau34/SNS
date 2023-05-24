import React from "react";
import Navbar from "react-bootstrap/Navbar"
import { useLocation } from "react-router-dom";

export default function DefaultNavbar(){
    let currentLocation=useLocation()
    const logout=()=>{
        localStorage.clear()
    }
    return(
        <Navbar expand="lg" className="justify-content-end">
            {currentLocation.pathname==="/chat"?
            <Navbar.Brand href="/users">Users</Navbar.Brand>:
            <Navbar.Brand href="/chat">Chat</Navbar.Brand>
            }
            <Navbar.Brand href="/" onClick={logout}>Sign Out</Navbar.Brand>
        </Navbar>
    )
}