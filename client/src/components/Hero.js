import React from 'react';
import styles from '../styles/Hero.module.css'; // Import the CSS module

const Hero = () => (
    <div className={styles.hero}> {/* Apply styles from the CSS module */}
        <h1>Your body hears everything your mind says</h1>
        <p>Expert medical care from professionals you trust</p>
        <p>We offer personalized treatments designed to help you live your best life.</p>
        <p>Join us on a journey to wellness with the latest in healthcare innovations.</p>
        <p>Our dedicated team is here to guide you through every step of your health journey.</p>
    </div>
);

export default Hero;
