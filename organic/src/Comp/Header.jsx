import React from 'react';
import Nav from './Nav';
import image from '../image/organic-pattern-1.png';
import { NavLink } from 'react-router-dom';
import Footer from "./Footer";
function Header() {
    return (
        <div className='main'>
            <Nav/>
            <div className='m-text'>
                <img src={image} className='header-image' alt='image'/>
                <h2>Eat <font>Clean</font> and <font>Green</font>.Eat Organic</h2>
                <NavLink className='m-btn' to='/item'>Product</NavLink>
                <NavLink className='m-btn' to='/about'>About</NavLink>
            </div>
        </div>
    )
}

export default Header;