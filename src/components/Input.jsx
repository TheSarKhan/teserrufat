
import React from 'react';

const Input = ({ label, id, type = 'text', className = '', error, ...props }) => {
    return (
        <div className={`form-group ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            {type === 'textarea' ? (
                <textarea id={id} {...props} />
            ) : (
                <input type={type} id={id} {...props} />
            )}
            {error && <span className="error-text" style={{ color: '#e74c3c', fontSize: '12px' }}>{error}</span>}
        </div>
    );
};

export default Input;
