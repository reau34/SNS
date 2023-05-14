import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ChatPage from "./pages/ChatPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import "react-bootstrap/dist/react-bootstrap.min.js"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>      
    </>
  );
}


