
import React from 'react';

const Alert = ({ type = 'success', message }) => {
    if (!message) return null;

    return (
        <div className={`alert ${type === 'error' ? 'error' : 'success'}`}>
            {message}
        </div>
    );
};

export default Alert;
