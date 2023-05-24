import React, { useState } from "react"
import Axios from "axios"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/esm/Container"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/esm/Button"
import avatar0 from "./../images/avatar0.png"
import avatar1 from "./../images/avatar1.png"
import avatar2 from "./../images/avatar2.png"
import avatar3 from "./../images/avatar3.png"
import { useNavigate } from "react-router-dom"

export default function AvatarSelectForm(){
    const[image,setImage]=useState(0)
    const avatars=[avatar0,avatar1,avatar2,avatar3]
    let navigate=useNavigate()
    const handleSubmit=()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        Axios.post(`http://localhost:3001/api/auth/set_avatar/${user._id}`,{image:avatars[image]})
        navigate("/chat")
    }
    return(
        <>
            <Card.Header as="h1" className="d-flex justify-content-center mt-5">Select an avatar</Card.Header>
            <Container className="d-flex align-items-center justify-content-center mt-5">
                <Image src={avatar0} roundedCircle onClick={()=>setImage(0)} className={image===0?"border border-warning":""}/>
                <Image src={avatar1} roundedCircle onClick={()=>setImage(1)} className={image===1?"border border-warning":""}/>
                <Image src={avatar2} roundedCircle onClick={()=>setImage(2)} className={image===2?"border border-warning":""}/>
                <Image src={avatar3} roundedCircle onClick={()=>setImage(3)} className={image===3?"border border-warning":""}/>
            </Container>
            <Container className="d-flex justify-content-center mt-5">
                <Button variant="success" type="submit" onClick={handleSubmit}>Confirm</Button>
            </Container>         
        </>
    )
}