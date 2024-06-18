const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            selectedContact: null
        },
        actions: {
            // Fetch all existing contacts in agenda + check if agenda exists in API
            fetchContacts: () => {
                fetch('https://playground.4geeks.com/contact/agendas/Jorge_Enrique/contacts')
                    .then(response => {
                        if (response.status === 404) {
                            throw new Error('Agenda not found');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Contacts fetched:', data.contacts);
                        localStorage.setItem('contacts', JSON.stringify(data.contacts));  // Guardar en LocalStorage
                        setStore({ contacts: data.contacts });
                    })
                    .catch(error => {
                        console.error('Error fetching contacts:', error);
                        if (error.message === 'Agenda not found') {
                            // Create new agenda
                            fetch('https://playground.4geeks.com/contact/agendas/Jorge_Enrique', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ agenda_name: 'Jorge_Enrique' })
                            })
                            .then(response => response.json())
                            .then(() => {
                                alert('Su agenda ha sido creada dentro de la base de datos. Por favor, recargue la página.');
                            })
                            .catch(postError => console.error('Error creating agenda:', postError));
                        }
                    });
            },
            // Load contacts from localStorage
            loadContactsFromLocalStorage: () => {
                const localContacts = localStorage.getItem('contacts');
                if (localContacts) {
                    setStore({ contacts: JSON.parse(localContacts) });
                }
            },
            // Add a new contact with POST
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
                        const updatedContacts = [...store.contacts, data];
                        localStorage.setItem('contacts', JSON.stringify(updatedContacts));  // Guardar en LocalStorage
                        setStore({ contacts: updatedContacts });
                    })
                    .catch(error => console.error('Error adding contact:', error));
            },
            // Update an existing contact with PUT
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
                        localStorage.setItem('contacts', JSON.stringify(updatedContacts));  // Guardar en LocalStorage
                        setStore({ contacts: updatedContacts });
                    })
                    .catch(error => console.error('Error updating contact:', error));
            },
            // Delete a contact with DELETE
            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/Jorge_Enrique/contacts/${id}`, {
                    method: 'DELETE'
                })
                    .then(() => {
                        const store = getStore();
                        const filteredContacts = store.contacts.filter(contact => contact.id !== id);
                        localStorage.setItem('contacts', JSON.stringify(filteredContacts));  // Guardar en LocalStorage
                        setStore({ contacts: filteredContacts });
                    })
                    .catch(error => console.error('Error deleting contact:', error));
            },
            // Set selected contact
            setSelectedContact: (contact) => {
                setStore({ selectedContact: contact });
            },
            // Clear selected contact
            clearSelectedContact: () => {
                setStore({ selectedContact: null });
            }
        }
    };
};

export default getState;
