import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import Axios from "axios"
import Pagination from "./Pagination";

export default function UsersTable(){
    const[users,setUsers]=useState([])
    const user=JSON.parse(localStorage.getItem("user"))
    const[activePage,setActivePage]=useState(1)
    const rowsPerPage=6
    useEffect(()=>{
        Axios.post(`http://localhost:3001/api/auth/get_users/${user._id}`).then((response)=>{
            setUsers(response.data)
        })
    },[])

    const totalPages=Math.ceil(users.length/rowsPerPage)
    const usersOnPage=[...users].slice((activePage-1)*rowsPerPage,activePage*rowsPerPage)
    const addFriend=(friendId)=>{
        Axios.put("http://localhost:3001/api/auth/add_friend",{id:user._id,friendId:friendId})
    }
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
                        usersOnPage.map((val,key)=>{
                            return(
                                <tr key={val._id}>
                                    <td><Image src={val.avatarImage}></Image></td>
                                    <td>{val.username}</td>
                                    <td><Button onClick={()=>{addFriend(val._id)}}>Add</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} />
        </>
    )
}