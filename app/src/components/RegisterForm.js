import React from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"


export default function RegisterForm(){
    const handleSubmit=(event)=>{
        event.preventDefault()
        alert("ELO")
    }
    
    return(
        <>
            <Card.Header as="h1" className="d-flex justify-content-center ">Sign up</Card.Header>
            <Container className="d-flex min-vh-100 justify-content-center align-items-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Username"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Email"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password"></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="justify-content-center">Confirm</Button>
                </Form>
            </Container>
        </>
    )
}