// src/js/views/home.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchContacts();
    }, []);

    useEffect(() => {
        console.log('Store contacts:', store.contacts);  // Log para ver el estado de los contactos
    }, [store.contacts]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
                <h1>Contact List</h1>
                <Link to="/details" className="btn btn-success">Add a new contact</Link>
            </div>
            <div className="row">
                {Array.isArray(store.contacts) && store.contacts.map(contact => (
                    <div key={contact.id} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{contact.name}</h5>
                                <p className="card-text">{contact.address}</p>
                                <p className="card-text">{contact.phone}</p>
                                <p className="card-text">{contact.email}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary" onClick={() => actions.updateContact(contact.id)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className="btn btn-danger" onClick={() => actions.deleteContact(contact.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
