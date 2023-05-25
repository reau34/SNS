import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image"
import Axios from "axios"

export default function FriendList(){
    const[friends,setFriends]=useState([])
    const user=JSON.parse(localStorage.getItem("user"))
    useEffect(()=>{
        Axios.post("http://localhost:3001/api/auth/get_friends",{id:user._id}).then((response)=>{
            setFriends(response.data)
        })
    },[])
    const currentChat=()=>{
        console.log("elo")
    }
    return(
        <>
            <Container>
                {
                    friends.map((val,key)=>{
                        return(
                            <div key={val._id}>
                                <Image src={val.avatarImage} />
                                <Button>{val.username}</Button>
                            </div>
                        )
                    })
                }
            </Container>
        </>
    )
}