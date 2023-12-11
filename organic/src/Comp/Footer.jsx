import React from 'react';
import './Footer.css'; // Import the CSS file for styling

function Footer() {
    return (
        <div className='footer-container'>
            <h3>Subscribe to get updated</h3>
            <div className='subscribe-input'>
                <input placeholder='example@gmail.com' type='email' />
                <a className='subscribe-btn' href='#'>Send</a>
            </div>
        </div>
    );
}

export default Footer;
