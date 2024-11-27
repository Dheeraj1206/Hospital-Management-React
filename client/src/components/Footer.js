import React from 'react';
import styles from '../styles/Footer.module.css'; // Import the CSS module

const Footer = () => (
    <div className={styles.footer}> {/* Apply styles from the CSS module */}
        <p>
            &copy; 2024 Medcare Hospital. All Rights Reserved. |{' '}
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
    </div>
);

export default Footer;
