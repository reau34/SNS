import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import {useNavigate} from "react-router-dom"
import Axios from "axios"


export default function RegisterForm(){
    const[user,setUser]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    let navigate=useNavigate()
    const LoginPage=()=>{
        navigate("/")
    }
    const handleChange=(event)=>{
        setUser({...user,[event.target.name]:event.target.value})
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        if(user.password===user.confirmPassword){
            Axios.post("http://localhost:3001/api/auth/sign_up",{username:user.username,email:user.email,password:user.password}).then((response)=>{
                console.log(response.data.status)
                if(!response.data.status){
                    alert(response.data.message)
                }else{
                    localStorage.setItem("user",JSON.stringify(response.data.user))
                    navigate("/avatar")
                }
            })
        }else{
            alert("Passwords are not the same.")
        }
    }
    const buttonStyle={
        marginLeft:"60px"
    }
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/chat")
        }
    },[])
    return(
        <>
            <Card.Header as="h1" className="d-flex justify-content-center mt-5">Sign up</Card.Header>
            <Container className="d-flex mt-5 flex-column justify-content-center align-items-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Username" name="username" onChange={(event)=>{handleChange(event)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Email" name="email" onChange={(event)=>{handleChange(event)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={(event)=>{handleChange(event)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(event)=>{handleChange(event)}}/>
                    </Form.Group>
                    <Button type="submit" style={buttonStyle}>Confirm</Button>              
                </Form>
                <Button  variant="success" className="mt-3" onClick={LoginPage}>Sign in</Button>
            </Container>
        </>
    )
}