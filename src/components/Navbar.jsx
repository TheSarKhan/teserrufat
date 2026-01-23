
import React, { useContext } from 'react';
// We will import AuthContext later, for now just props or mock
// To avoid circular dependency or missing file error, we'll implement header basic structure

const Navbar = ({ title, user, role, onLogout }) => {
    return (
        <div className="navbar">
            <h1>{title}</h1>
            <div className="navbar-right">
                <div className="user-info">
                    <span>{user?.firstName} {user?.lastName}</span>
                    <span style={{ opacity: 0.7 }}>|</span>
                    <span>{role}</span>
                </div>
                <button className="logout-btn" onClick={onLogout}>Çıxış</button>
            </div>
        </div>
    );
};

export default Navbar;
