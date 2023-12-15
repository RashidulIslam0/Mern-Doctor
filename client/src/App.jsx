// import { useState } from "react";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <div>
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
