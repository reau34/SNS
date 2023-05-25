import React from "react";
import Container from "react-bootstrap/Container"
import Button from"react-bootstrap/Button"

export default function Pagination({activePage,setActivePage,totalPages}){
    return(
        <>
            <Container>
                <Button disabled={activePage===1} onClick={()=>{setActivePage(1)}}>First</Button>
                <Button disabled={activePage===totalPages} onClick={()=>{setActivePage(activePage+1)}}>Next</Button>
                <Button disabled={activePage===1} onClick={()=>{setActivePage(activePage-1)}}>Previous</Button>
                <Button disabled={activePage===totalPages} onClick={()=>{setActivePage(totalPages)}}>Last</Button>
            </Container>
        </>
    )
}