import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<div className="navbar">
			<div className="logo">
				<Link to="/">
					<img src={'/images/MedLine Logo/logo1.png'} alt="Medcare Logo" />
				</Link>
			</div>
			<div
				className={`menu-toggle ${menuOpen ? 'open' : ''}`}
				onClick={toggleMenu}
			>
				☰
			</div>
			<ul className={menuOpen ? 'open' : ''}>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/">Department</Link>
				</li>
				<li>
					<Link to="/">Hospitals</Link>
				</li>
				<li>
					<Link to="/doctors">Doctors</Link>
				</li>
				<li>
					<Link to="/">Contact</Link>
				</li>
				{/* Mobile-only Book Now button */}
				<li className="mobile-book-now">
					<Link to="/book-now" className="book-now">
						Book Now
					</Link>
				</li>
			</ul>

			{/* Desktop-only Book Now button */}
			<Link to="/book-now" className="book-now desktop-book-now">
				Book Now
			</Link>
		</div>
	);
};

export default Navbar;
