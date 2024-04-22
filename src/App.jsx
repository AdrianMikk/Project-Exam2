// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./Home/index.jsx";
// import Navbar from "./Header/index.jsx";
import Layout from "./Layout/layout.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App;
