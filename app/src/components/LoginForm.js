import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import Container from "react-bootstrap/esm/Container"
import Card from "react-bootstrap/Card"
import Axios from "axios"

export default function LoginForm(){
    const[user,setUser]=useState({
        username:"",
        password:""
    })
    let navigate=useNavigate()
    const registerPage=()=>{
        navigate("/register")
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        Axios.post("http://localhost:3001/api/auth/sign_in",{username:user.username,password:user.password}).then((response)=>{
            if(!response.data.status){
                alert(response.data.message)
            }else{
                console.log(response.data.user)
                localStorage.setItem("user",JSON.stringify(response.data.user))
                navigate("/chat")
            }
        })
    }
    const buttonStyle={
        marginLeft:"60px"
    }
    const handleChange=(event)=>{
        setUser({...user,[event.target.name]:event.target.value})
    }
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/chat")
        }
    },[])
    return(
        <>
            <Card.Header as="h1" className="d-flex justify-content-center mt-5">Sign in</Card.Header>
            <Container className="d-flex mt-5 flex-column jutify-content-center align-items-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Username" name="username" onChange={(event)=>{handleChange(event)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={(event)=>{handleChange(event)}}></Form.Control>
                    </Form.Group>
                    <Button style={buttonStyle} type="submit">Confirm</Button>
                </Form>
                <Button variant="success" className="mt-3" onClick={registerPage}>Sign up</Button>
            </Container>
        </>
    )
}