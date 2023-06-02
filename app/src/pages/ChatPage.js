import React, { useState } from "react"
import DefaultNavbar from "../components/DefaultNavbar"
import FriendList from "../components/FriendList"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ChatWindow from "../components/ChatWindow"
import { ChatUserContext } from "../components/ChatUserContext"

export default function ChatPage(){
    const user=JSON.parse(localStorage.getItem("user"))
    const[chatUser,setChatUser]=useState({})
    return(
        <>
            <DefaultNavbar />
            <ChatUserContext.Provider value={{chatUser,setChatUser,user}}>
                <Container fluid className="w-75 h-75 border border-4">
                    <Row>
                        <Col lg={3}><FriendList /></Col>
                        <Col lg={9}><ChatWindow  /></Col>
                    </Row>
                </Container>
            </ChatUserContext.Provider>
        </>
    )
}