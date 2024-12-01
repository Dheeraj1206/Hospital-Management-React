import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className={styles.navbar}> {/* Apply styles from the CSS module */}
            <div className={styles.logo}>
                <Link to="/">
                    <img src={'/images/MedLine Logo/logo1.png'} alt="Medcare Logo" />
                </Link>
            </div>
            <div
                className={`${styles['menu-toggle']} ${menuOpen ? styles.open : ''}`} // Applying styles from the module
                onClick={toggleMenu}
            >
                ☰
            </div>
            <ul className={menuOpen ? styles.open : ''}> {/* Applying styles from the module */}
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/">Department</Link>
                </li>
                <li>
                    <Link to="/hospitals">Hospitals</Link>
                </li>
                <li>
                    <Link to="/doctors">Doctors</Link>
                </li>
                <li>
                    <Link to="/">Contact</Link>
                </li>
                {/* Mobile-only Book Now button */}
                <li className={styles['mobile-book-now']}>
                    <Link to="/book-now" className={styles['book-now']}>
                        Book Now
                    </Link>
                </li>
            </ul>

            {/* Desktop-only Book Now button */}
            <Link to="/book-now" className={`${styles['book-now']} ${styles['desktop-book-now']}`}>
                Book Now
            </Link>
        </div>
    );
};

export default Navbar;
