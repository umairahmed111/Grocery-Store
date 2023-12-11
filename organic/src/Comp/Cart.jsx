import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
    const location = useLocation();
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const updateCart = (updatedCart) => {
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const addToCart = (newItem) => {
        const updatedCart = [...cartItems, newItem];
        updateCart(updatedCart);
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter((item) => item._id !== itemId);
        updateCart(updatedCart);
        console.log('Item removed:', itemId);
    };

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        if (location.pathname === '/item') {
            // Clear cart data from localStorage when navigating to the product page
            localStorage.removeItem('cart');
        }
    }, [location.pathname]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.Quantity * item.Rate, 0);
    };

    const calculateShipping = () => {
        const totalAmount = calculateTotal();
        return (totalAmount * 0.15).toFixed(2); // Assuming 15% shipping cost
    };

    const calculateGrossTotal = () => {
        const totalAmount = calculateTotal();
        const shippingCost = parseFloat(calculateShipping());
        return (totalAmount + shippingCost).toFixed(2);
    };
    return (
        <div className="container mt-5" style={{ padding:"100px"}} >
            <h2 className="mb-4">Items and Billing</h2>
            <div className="row">
                <div className="col-md-8">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Image</th>
                                <th>Item</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((data) => (
                                <tr key={data._id}>
                                    <td><img src={data.imageUrl} alt={data.Item} className='itemImage' style={{ width: '50px', height: '50px' }} /></td>
                                    <td>{data.Item}</td>
                                    <td>{data.Category}</td>
                                    <td>{data.Quantity}</td>
                                    <td>{data.Rate}</td>
                                    <td>{data.Quantity * data.Rate}</td>
                                    <td><button className="btn btn-danger btn-sm" onClick={() => removeFromCart(data._id)}>Remove</button></td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="5"><strong>Total</strong></td>
                                <td colSpan="2"><strong>{calculateTotal()}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <div className="bg-light p-3">
                        <h4 className="mb-3">Billing Summary</h4>
                        <p><strong>Total Items:</strong> {cartItems.length}</p>
                        <p><strong>Total Amount:</strong> Rs. {calculateTotal()}</p>
                        <p><strong>Shipping Cost:</strong> Rs. {calculateShipping()}</p>
                        <hr />
                        <p><strong>Gross Total:</strong> Rs. {calculateGrossTotal()}</p>
                        <NavLink to ={`/payment?amount=${calculateGrossTotal()}`}>
                            <button className="btn btn-primary" >Make Payment</button></NavLink>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <NavLink to='/item'>
                    <button style={{"background-color":"green", color:"white"}}>Go Back</button>
                </NavLink>
            </div>
        </div>
    );
}

export default Cart;
