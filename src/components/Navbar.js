import React from 'react';

const Navbar = () => (
    <div className="navbar">
        <div className="logo">
            <img src="logo.png" alt="Medcare Logo" />
        </div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Department</a></li>
            <li><a href="#">Doctors</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        <a href="#" className="book-now">Book Now</a>
    </div>
);

export default Navbar;
