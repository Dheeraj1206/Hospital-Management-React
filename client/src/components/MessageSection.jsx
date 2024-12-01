import React from 'react';
import styles from '../styles/MessageSection.module.css'; // Import the CSS module

const MessageSection = () => (
    <div className={styles['message-section']}> {/* Apply styles from the CSS module */}
        <h2>Message From Our Medical Director</h2>
        <p>We are committed to providing high-quality healthcare services with compassion and respect for our patients.</p>
    </div>
);

export default MessageSection;
