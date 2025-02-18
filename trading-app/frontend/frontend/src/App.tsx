import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Browse from './components/Browse';
import MyProfile from './components/MyProfile';
import CreateTrade from './components/CreateTrade';
import { AuthProvider } from './context/AuthContext.js'
import CreateOffer from './components/CreateOffer';
import SpecificTrade from './components/SpecificTrade';
import ChangePassword from './components/ChangePassword';
import Navbar from './components/Navbar';
import About from "./components/About"
import Contact from "./components/Contact"
import Welcome from './components/Welcome'

// App Component
function App() {
  return (
    <AuthProvider>

    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/create-trade" element={<CreateTrade />} />
        <Route path="/trades/:id" element={<SpecificTrade />} />
        <Route path="/create-offer/:tradeId" element={<CreateOffer />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

// Conditional Navbar Component
function ConditionalNavbar() {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];

  // Render Navbar only if current location's pathname is not in noNavbarRoutes
  return noNavbarRoutes.includes(location.pathname) ? null : <Navbar />;
}

export default App;
