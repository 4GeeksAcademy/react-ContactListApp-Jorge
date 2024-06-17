// src/js/store/flux.js
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
            // Fetch all contacts
            fetchContacts: () => {
                fetch('https://playground.4geeks.com/contact/agendas/Jorge_Enrique/contacts')
                    .then(response => response.json())
                    .then(data => {
                        console.log('Contacts fetched:', data),  // Log para ver los datos recibidos
                        setStore({ contacts: data });
                    })
                    .catch(error => console.error('Error fetching contacts:', error));
            },
            // Add a new contact
            addContact: (contact) => {
                fetch('https://playground.4geeks.com/contact/agendas/Jorge_Enrique/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contact)
                })
                    .then(response => response.json())
                    .then(data => {
                        const store = getStore();
                        setStore({ contacts: [...store.contacts, data] });
                    })
                    .catch(error => console.error('Error adding contact:', error));
            },
            // Update an existing contact
            updateContact: (contact) => {
                fetch(`https://playground.4geeks.com/contact/agendas/Jorge_Enrique/contacts/${contact.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contact)
                })
                    .then(response => response.json())
                    .then(data => {
                        const store = getStore();
                        const updatedContacts = store.contacts.map(c => c.id === data.id ? data : c);
                        setStore({ contacts: updatedContacts });
                    })
                    .catch(error => console.error('Error updating contact:', error));
            },
            // Delete a contact
            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/Jorge_Enrique/contacts/${id}`, {
                    method: 'DELETE'
                })
                    .then(() => {
                        const store = getStore();
                        const filteredContacts = store.contacts.filter(contact => contact.id !== id);
                        setStore({ contacts: filteredContacts });
                    })
                    .catch(error => console.error('Error deleting contact:', error));
            }
        }
    };
};

export default getState;
