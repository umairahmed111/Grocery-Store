import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const totalAmount = searchParams.get('amount');

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        email: '',
    });

    const { fullName, phone, address, email } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform payment processing or submit the form data as needed
        console.log('Payment Details:', formData);
        // Redirect to a success page or home page after payment
        navigate('/success');
    };

    return (
        <div className="container mt-5" style= {{ padding: "50px"}}>
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea
                        className="form-control"
                        name="address"
                        value={address}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Total Amount</label>
                    <input
                        type="text"
                        className="form-control"
                        value={`Rs. ${totalAmount}`}
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default Payment;
