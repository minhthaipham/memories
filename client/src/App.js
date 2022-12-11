import { Container, AppBar, Grid, Typography, Grow } from "@mui/material";
import React from "react";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import DetailPost from "./components/DetailPost";
function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home/search" element={<Home />} />
        <Route path="/home/:id" element={<DetailPost />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
