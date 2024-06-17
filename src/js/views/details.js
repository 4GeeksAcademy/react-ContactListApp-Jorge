// src/js/views/details.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Details = () => {
    const { actions } = useContext(Context);
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.addContact(contact);
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <h1>Add a new contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" value={contact.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={contact.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" name="phone" value={contact.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={contact.address} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Save contact</button>
                <Link to="/" className="btn btn-secondary ms-2">or get back to contacts</Link>
            </form>
        </div>
    );
};
