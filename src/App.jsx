import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Home/index.jsx';
import Layout from './Layout/layout.jsx';
import Profile from './Profile/index.jsx';
import ContactPage from './Contact/index.jsx';
import VenueDetails from './Specific/index.jsx';
import Register from './Register/index.jsx';
import Login from './Login/index.jsx'; 

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />  
            <Route path="venues" element={<HomePage />} />  
            <Route path="profile" element={<Profile />} />
            <Route path="contact" element={<ContactPage />} />   
            <Route path="venues/:id" element={<VenueDetails />} />
            <Route path="register" element={<Register />} /> 
            <Route path="login" element={<Login />} /> 
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
