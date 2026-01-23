
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';

const PermissionModal = ({ isOpen, onClose, user, onSave }) => {
    const [perms, setPerms] = useState({ read: false, write: false, delete: false });

    useEffect(() => {
        if (user && user.permissions) {
            setPerms(user.permissions);
        }
    }, [user]);

    const handleChange = (key) => {
        setPerms(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        onSave(user.id, perms);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`İcazələr: ${user?.firstName} ${user?.lastName}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <p>İstifadəçiyə verilən yetkiləri seçin:</p>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="checkbox"
                        checked={perms.read}
                        onChange={() => handleChange('read')}
                    />
                    <strong>Oxumaq (Read)</strong> - Sənədləri görmək
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="checkbox"
                        checked={perms.write}
                        onChange={() => handleChange('write')}
                    />
                    <strong>Yazmaq (Write)</strong> - Yeni sənəd əlavə etmək
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="checkbox"
                        checked={perms.delete}
                        onChange={() => handleChange('delete')}
                    />
                    <strong>Silmək (Delete)</strong> - Sənədləri silmək
                </label>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Button variant="secondary" onClick={onClose}>Ləğv et</Button>
                    <Button variant="primary" onClick={handleSave}>Yadda saxla</Button>
                </div>
            </div>
        </Modal>
    );
};

export default PermissionModal;
