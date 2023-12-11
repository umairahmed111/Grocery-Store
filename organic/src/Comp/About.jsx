import React, { useState } from 'react';
import Aboutimage from '../image/organic-about-1.png';
import { Link } from 'react-router-dom';

function About() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const textStyle = {
    color: 'Black',
    fontSize: '18px',
  };

  return (
    <div className='about'>
      <div className='about-img'>
        <img src={Aboutimage} alt='img' />
      </div>

      <div className='about-text'>
        <h1><strong>Welcome to Groso.</strong></h1>
        <p style={textStyle}><br />
        Bringing Freshness to Your Table.
        <br /><br />                
          At Groso, we are committed to providing you with the best online shopping experience.We offer a wide range of products across various categories, including fruits, dairy products, bakery products, and more.{' '}
          {expanded && (
            <>
           
              <br /><br />
              <strong>Our Mission:</strong><br />
                At Groso Market, our mission is to offer our customers the freshest, locally sourced produce and a wide variety of high-quality products. We aim to foster healthier lifestyles while supporting local farmers and producers.
              <br />
              
            </>
            
          )}
          
        </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href='#' className='about-btn' onClick={toggleExpand}>
          {expanded ? 'Read less' : 'Read more'}
        </a>
        <Link to="/" className='about-btn'>Home</Link>
        </div>
      </div>
    </div>
  );
}

export default About;
