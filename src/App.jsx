// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./Home/index.jsx";
// import Navbar from "./Header/index.jsx";
import Layout from "./Layout/layout.jsx";
import Profile from "./Profile/index.jsx";
import ContactPage from "./Contact/index.jsx";
import VenueDetails from "./Specific/index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactPage />} />   
        <Route path="/specific" element={<VenueDetails />} />     
      </Routes>
    </Router>
  )
}

export default App;
