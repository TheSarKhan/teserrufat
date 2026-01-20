
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    // Seed Data...
    const initialUsers = [
        { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@test.az', role: 'admin', password: 'admin123', active: true, permissions: { read: true, write: true, delete: true } },
        { id: 2, firstName: 'User', lastName: 'One', email: 'user@test.az', role: 'user', password: 'user123', active: true, permissions: { read: true, write: false, delete: false } }
    ];

    const initialDocs = [
        { id: 1, number: 'DOC-001', type: 'məktub', title: 'Maliyyə Hesabatı', content: '2024 hesabatı', date: '2024-01-15', sender: 'Maliyyə', receiver: 'Direktor', location: 'Rəf A-1', folder: null, fileName: 'doc1.pdf' },
        { id: 2, number: 'DOC-002', type: 'arayış', title: 'İşçi Arayışı', content: 'Əməkdaş arayışı', date: '2024-01-20', sender: 'HR', receiver: 'Əməkdaş', location: 'Rəf A-1', folder: 'İşçilər', fileName: 'doc2.pdf' }
    ];

    // derive initial shelves from docs
    const initialShelves = [...new Set(initialDocs.map(d => d.location))];
    const initialFolders = {}; // { "Rəf A-1": ["İşçilər"] }
    initialDocs.forEach(d => {
        if (d.folder && d.location) {
            if (!initialFolders[d.location]) initialFolders[d.location] = [];
            if (!initialFolders[d.location].includes(d.folder)) initialFolders[d.location].push(d.folder);
        }
    });


    const [users, setUsers] = useState(initialUsers);
    const [documents, setDocuments] = useState(initialDocs);
    const [shelves, setShelves] = useState(initialShelves);
    const [folders, setFolders] = useState(initialFolders);
    const [logs, setLogs] = useState([]);

    // Log Action
    const logAction = (userId, userName, action, details) => {
        const newLog = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            userId,
            userName,
            action,
            details
        };
        setLogs(prev => [newLog, ...prev]);
    };

    // User Actions
    const addUser = (userData, adminUser) => {
        const newUser = { ...userData, id: Date.now() };
        setUsers([...users, newUser]);
        logAction(adminUser.id, adminUser.firstName, 'ADD_USER', `Added user ${newUser.email}`);
    };

    const updateUser = (id, updates, adminUser) => {
        setUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));
        logAction(adminUser.id, adminUser.firstName, 'UPDATE_USER', `Updated user ${id}`);
    };

    const deleteUser = (id, adminUser) => {
        setUsers(users.filter(u => u.id !== id));
        logAction(adminUser.id, adminUser.firstName, 'DELETE_USER', `Deleted user ${id}`);
    };

    // Shelf & Folder Actions
    const addShelf = (shelfName, user) => {
        if (shelves.includes(shelfName)) return;
        setShelves([...shelves, shelfName]);
        logAction(user.id, user.firstName, 'ADD_SHELF', `Added shelf ${shelfName}`);
    }

    const addFolder = (shelfName, folderName, user) => {
        setFolders(prev => {
            const shelfFolders = prev[shelfName] ? [...prev[shelfName]] : [];
            if (shelfFolders.includes(folderName)) return prev;
            return {
                ...prev,
                [shelfName]: [...shelfFolders, folderName]
            };
        });
        logAction(user.id, user.firstName, 'ADD_FOLDER', `Added folder ${folderName} to ${shelfName}`);
    }

    // Document Actions
    const addDocument = (docData, user) => {
        const newDoc = { ...docData, id: Date.now() };
        setDocuments([...documents, newDoc]);
        logAction(user.id, user.firstName, 'ADD_DOC', `Added doc ${newDoc.number}`);
    };

    const deleteDocument = (id, user) => {
        setDocuments(documents.filter(d => d.id !== id));
        logAction(user.id, user.firstName, 'DELETE_DOC', `Deleted doc ${id}`);
    };

    return (
        <DataContext.Provider value={{
            users, documents, logs,
            shelves, folders,
            addUser, updateUser, deleteUser,
            addDocument, deleteDocument,
            addShelf, addFolder,
            logAction
        }}>
            {children}
        </DataContext.Provider>
    );
};
