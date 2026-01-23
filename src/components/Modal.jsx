
import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    {footer ? footer : <Button variant="secondary" onClick={onClose}>Bağla</Button>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
