import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import Table from "react-bootstrap/Table"
import Axios from "axios"
import { ChatUserContext } from "./ChatUserContext";

export default function FriendList(){
    const {setChatUser,user}=useContext(ChatUserContext)
    const[friends,setFriends]=useState([])
    useEffect(()=>{
        Axios.post("http://localhost:3001/api/auth/get_friends",{id:user._id}).then((response)=>{
            setFriends(response.data[0].friends)
        })
    },[])
    const setChat=(chatUser)=>{
        //localStorage.setItem("chatUser",JSON.stringify(user))
        setChatUser(chatUser)
    }
    return(
        <>
        <div style={{ height:"75vh", overflowY: 'auto' }}>
            <Table>
                <tbody>
                    {friends.map((val,key)=>{
                        return(                          
                            <tr key={val._id}>
                                <td><Image src={val.avatarImage} /></td>
                                <td><Card.Text>{val.username}</Card.Text></td>
                                <td><Button onClick={()=>{setChat(val)}}>Chat with me</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
        </>
    )
}