import React, { useEffect, useState, useRef, useContext } from "react";
import Axios from "axios"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card"
import {v4 as uuidv4} from "uuid"
import Image from "react-bootstrap/Image"
import {io} from "socket.io-client"
import { ChatUserContext } from "./ChatUserContext";

export default function ChatWindow(){
    const[msg,setMsg]=useState("")
    const[messages,setMessages]=useState([])
    const{chatUser,user}=useContext(ChatUserContext)
    const[comingMessage,setComingMessage]=useState({})
    const scrollDown=useRef()
    const socket=useRef()
    const sendMsg= async(event)=>{
        event.preventDefault()
        await Axios.post("http://localhost:3001/api/msg/add_msg",{from:user._id,to:chatUser._id,message:msg})
        socket.current.emit("send-msg",{
            to:chatUser._id,
            from:user._id,
            message:msg
        })
        const msgs=[...messages]
        msgs.push({fromSelf:true,message:msg})
        setMessages(msgs)
        setMsg("")
    }
    const handleMsg=(event)=>{
        setMsg(event.target.value)
    }
    useEffect(()=>{
        if(chatUser){
            Axios.post("http://localhost:3001/api/msg/get_msg",{from:user._id,to:chatUser._id}).then((response)=>{
                setMessages(response.data)
            })
        }
    },[chatUser])
    useEffect(()=>{
        if(user){
            socket.current=io("http://localhost:3001")
            socket.current.emit("add-user",user._id)
        }
    },[user])
    useEffect(()=>{
        socket.current.on("msg-receive",(msg)=>{
            //console.log({msg})
            setComingMessage({fromSelf:false,message:msg})
        })
    },[socket.current])
    useEffect(()=>{
        scrollDown.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    useEffect(()=>{
        comingMessage && setMessages((prev)=>[...prev,comingMessage])       
    },[comingMessage])
    return(
        <Container style={{height:"75vh"}}>
            {!(chatUser===null || chatUser===undefined)?
                <div className="d-flex justify-content-space-between">
                <Image src={chatUser.avatarImage} />
                <Card.Header as="h1" className="d-flex align-items-center">{chatUser.username}</Card.Header>
            </div>:<></>}
            <Container style={{overflowY:"auto", height:"60vh"}}>
                {
                    messages.map((val,key)=>{
                        return(
                            <div ref={scrollDown} style={{ fontSize: '20px', marginBottom: "10px" }} key={uuidv4()}>
                            <div key={uuidv4()} className={`d-flex ${val.fromSelf ? 'justify-content-end' : 'justify-content-start'}`}>
                                <Card.Text
                                className={`text-wrap ${val.fromSelf ? 'bg-primary text-white' : 'bg-light'}`}
                                style={{ maxWidth: '40%', borderRadius: '8px', padding:"5px" }}
                                >
                                {val.message}
                                </Card.Text>
                            </div>
                            </div>
                        )
                    })
                }
            </Container>
            <Form onSubmit={sendMsg} className="d-flex align-items-end mt-3">
                <Form.Group className="d-flex justifty-content-space-between w-100" style={{flexShrink:0}}>
                    <Form.Control type="text" placeholder="Aa" value={msg} onChange={(event)=>{handleMsg(event)}}/>
                    <Button type="submit">✓</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}