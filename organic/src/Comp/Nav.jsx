import React from 'react';
import { NavLink } from 'react-router-dom';
function Nav() {
    return (
        <div>
            <div className='logo'>
                <a href='/'>GROSO</a>
            </div>

            <div className='side-box' style={{ border: '1px solid black' }}>
                <div className='search' >
                    <NavLink to='/cart'>
                        <i class="fa-solid fa-cart-shopping" style={{ cursor: 'pointer' }}></i>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Nav;