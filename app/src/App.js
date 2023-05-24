import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ChatPage from "./pages/ChatPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import AvatarSelectPage from "./pages/AvatarSelectPage";
import "react-bootstrap/dist/react-bootstrap.min.js"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/users" element={<UsersPage />}/>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/avatar" element={<AvatarSelectPage />} />
        </Routes>
      </Router>      
    </>
  );
}


