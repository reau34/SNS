import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import Axios from "axios"

export default function UsersTable(){
    const[users,setUsers]=useState([])

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        Axios.post(`http://localhost:3001/api/auth/get_users/${user._id}`).then((response)=>{
            setUsers(response.data)
        })
    },[])
    return(
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Add user to your friend list</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((val,key)=>{
                            return(
                                <tr key={val._id}>
                                    <td><Image src={val.avatarImage}></Image></td>
                                    <td>PRZYCISK</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}