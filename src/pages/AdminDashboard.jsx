
import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import PermissionModal from '../components/PermissionModal';
import DocumentManager from '../components/DocumentManager';
import Alert from '../components/Alert';

const AdminDashboard = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const { users, logs, addUser, updateUser, deleteUser } = useContext(DataContext);

    const [activeTab, setActiveTab] = useState('users');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPermModal, setShowPermModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [generatedPass, setGeneratedPass] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    // Form State
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', role: 'user' });

    // Add User Logic
    const handleAddUser = (e) => {
        e.preventDefault();
        if (users.find(u => u.email === newUser.email)) {
            setAlertMsg('Bu email artıq mövcuddur!');
            return;
        }

        const password = Math.random().toString(36).slice(-8); // Simple random pass
        const userPayload = {
            ...newUser,
            password,
            active: true,
            permissions: { read: true, write: false, delete: false } // Default perms
        };

        addUser(userPayload, currentUser);
        setGeneratedPass(password);
        setShowAddModal(false);
        setShowPassModal(true);
        setNewUser({ firstName: '', lastName: '', email: '', role: 'user' });
        setAlertMsg('İstifadəçi uğurla əlavə edildi!');
        setTimeout(() => setAlertMsg(''), 3000);
    };

    // Permission Logic
    const openPermModal = (user) => {
        setSelectedUser(user);
        setShowPermModal(true);
    };

    const savePermissions = (userId, perms) => {
        updateUser(userId, { permissions: perms }, currentUser);
        setAlertMsg('İcazələr yeniləndi!');
        setTimeout(() => setAlertMsg(''), 3000);
    };

    // User Actions
    const toggleStatus = (user) => {
        updateUser(user.id, { active: !user.active }, currentUser);
    };

    const resetPassword = (user) => {
        const password = Math.random().toString(36).slice(-8);
        updateUser(user.id, { password }, currentUser);
        setGeneratedPass(password);
        setShowPassModal(true);
        setAlertMsg('Yeni şifrə yaradıldı!');
    };

    const handleDelete = (id) => {
        if (window.confirm('Bu istifadəçini silmək istədiyinizə əminsiniz?')) {
            deleteUser(id, currentUser);
            setAlertMsg('İstifadəçi silindi!');
        }
    };

    return (
        <div className="app-container active">
            <Navbar
                title="ESIDMS - Admin Panel"
                user={currentUser}
                role="Admin"
                onLogout={logout}
            />

            <div className="container">
                <div className="page-header">
                    <h2>Admin Tənzimləmələri</h2>
                    <p>
                        {activeTab === 'users' && 'Sistemdəki istifadəçiləri və yetkiləri idarə edin'}
                        {activeTab === 'logs' && 'İstifadəçi hərəkətlərini izləyin'}
                        {activeTab === 'docs' && 'Bütün sənədləri idarə edin'}
                    </p>
                </div>

                <Alert message={alertMsg} />

                <div className="tabs">
                    <button className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>İstifadəçilər</button>
                    <button className={`tab ${activeTab === 'docs' ? 'active' : ''}`} onClick={() => setActiveTab('docs')}>Sənədlər (Ref)</button>
                    <button className={`tab ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>Loqlar</button>
                </div>

                {activeTab === 'users' && (
                    <>
                        <div className="card">
                            <Button onClick={() => setShowAddModal(true)} style={{ width: 'auto' }}>+ Yeni İstifadəçi</Button>
                        </div>
                        <div className="card">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ad Soyad</th>
                                        <th>Email</th>
                                        <th>Rol</th>
                                        <th>Status</th>
                                        <th>İcazələr (R/W/D)</th>
                                        <th>Əməliyyatlar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        u.role !== 'admin' && (
                                            <tr key={u.id}>
                                                <td>{u.firstName} {u.lastName}</td>
                                                <td>{u.email}</td>
                                                <td><span className="role-badge">{u.role === 'admin' ? 'Admin' : 'İstifadəçi'}</span></td>
                                                <td>
                                                    <span className={`status-badge ${u.active ? 'status-active' : 'status-inactive'}`}>
                                                        {u.active ? 'Aktiv' : 'Deaktiv'}
                                                    </span>
                                                </td>
                                                <td>
                                                    {u.permissions?.read ? '✅' : '❌'} /
                                                    {u.permissions?.write ? '✅' : '❌'} /
                                                    {u.permissions?.delete ? '✅' : '❌'}
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <Button className="btn-sm" variant={u.active ? 'danger' : 'success'} onClick={() => toggleStatus(u)}>
                                                            {u.active ? 'Deaktiv' : 'Aktiv'}
                                                        </Button>
                                                        <Button className="btn-sm" variant="warning" onClick={() => openPermModal(u)}>Yetkilər</Button>
                                                        <Button className="btn-sm" variant="secondary" onClick={() => resetPassword(u)}>Şifrə</Button>
                                                        <Button className="btn-sm" variant="danger" onClick={() => handleDelete(u.id)}>Sil</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'docs' && (
                    <DocumentManager currentUser={currentUser} />
                )}

                {activeTab === 'logs' && (
                    <div className="card">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tarix</th>
                                    <th>İstifadəçi</th>
                                    <th>Əməliyyat</th>
                                    <th>Detallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? <tr><td colSpan="4" style={{ textAlign: 'center' }}>Loq yoxdur</td></tr> : logs.map(l => (
                                    <tr key={l.id}>
                                        <td>{new Date(l.timestamp).toLocaleString('az-AZ')}</td>
                                        <td>{l.userName}</td>
                                        <td><span className="doc-badge">{l.action}</span></td>
                                        <td>{l.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add User Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Yeni İstifadəçi">
                <form id="addUserForm" onSubmit={handleAddUser}>
                    <Input label="Ad" value={newUser.firstName} onChange={e => setNewUser({ ...newUser, firstName: e.target.value })} required />
                    <Input label="Soyad" value={newUser.lastName} onChange={e => setNewUser({ ...newUser, lastName: e.target.value })} required />
                    <Input label="Email" type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required />
                    <div className="form-group">
                        <label>Rol</label>
                        <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}>
                            <option value="user">İstifadəçi</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>Ləğv et</Button>
                        <Button type="submit">Əlavə et</Button>
                    </div>
                </form>
            </Modal>

            {/* Permission Modal */}
            <PermissionModal
                isOpen={showPermModal}
                onClose={() => setShowPermModal(false)}
                user={selectedUser}
                onSave={savePermissions}
            />

            {/* Password Display Modal */}
            <Modal
                isOpen={showPassModal}
                onClose={() => setShowPassModal(false)}
                title="Yaradılmış Şifrə"
                footer={<Button onClick={() => setShowPassModal(false)}>Bağla</Button>}
            >
                <p style={{ color: '#999', fontSize: '14px' }}>Bu şifrəni kopyalayın:</p>
                <div className="password-display">{generatedPass}</div>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
