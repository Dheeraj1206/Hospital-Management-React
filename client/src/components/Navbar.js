import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => (
    <div className="navbar">
        <div className="logo">
            <img src="logo.png" alt="Medcare Logo" />
        </div>
        <ul>
        <li><Link to="/">Home</Link></li>
            <li><Link to="/">Department</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/">Contact</Link></li>
        </ul>
        <a href="#" className="book-now">Book Now</a>
    </div>
);

export default Navbar;
