
import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Alert from '../components/Alert';

const UserDashboard = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const { documents, addDocument, deleteDocument, shelves, folders, addShelf, addFolder } = useContext(DataContext);

    const [view, setView] = useState('shelves'); // shelves, list (shelf), folder, search
    const [currentShelf, setCurrentShelf] = useState(null);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddShelfModal, setShowAddShelfModal] = useState(false);
    const [showAddFolderModal, setShowAddFolderModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [alertMsg, setAlertMsg] = useState('');

    // Inputs for new Shelf/Folder
    const [newShelfName, setNewShelfName] = useState('');
    const [newFolderName, setNewFolderName] = useState('');

    // Permissions
    const canRead = currentUser.permissions?.read;
    const canWrite = currentUser.permissions?.write;
    const canDelete = currentUser.permissions?.delete;

    // Search Logic
    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        const results = documents.filter(d =>
            d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setView('search');
    };

    // Add Shelf Logic
    const handleAddShelf = (e) => {
        e.preventDefault();
        if (!newShelfName.trim()) {
            setAlertMsg('Rəf adı daxil edilməyib!');
            return;
        }
        addShelf(newShelfName, currentUser);
        setAlertMsg('Rəf yaradıldı!');
        setTimeout(() => setAlertMsg(''), 3000);
        setShowAddShelfModal(false);
        setNewShelfName('');
    }

    // Add Folder Logic
    const handleAddFolder = (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) {
            setAlertMsg('Qovluq adı daxil edilməyib!');
            return;
        }
        addFolder(currentShelf, newFolderName, currentUser);
        setAlertMsg('Qovluq yaradıldı!');
        setTimeout(() => setAlertMsg(''), 3000);
        setShowAddFolderModal(false);
        setNewFolderName('');
    }

    // Add Document Logic
    const [newDoc, setNewDoc] = useState({
        number: '', type: '', title: '', content: '', note: '',
        date: new Date().toISOString().split('T')[0],
        sender: '', receiver: '', location: '', folder: ''
    });
    const [docFile, setDocFile] = useState(null);

    const handleCtxAddDoc = (e) => {
        e.preventDefault();
        if (!docFile) {
            setAlertMsg('Fayl seçilməyib!');
            return;
        }
        const docPayload = {
            ...newDoc,
            fileName: docFile.name
        };
        addDocument(docPayload, currentUser);
        setAlertMsg('Sənəd əlavə edildi!');
        setTimeout(() => setAlertMsg(''), 3000);
        setShowAddModal(false);
        // Reset form
        setNewDoc({ number: '', type: '', title: '', content: '', note: '', date: new Date().toISOString().split('T')[0], sender: '', receiver: '', location: '', folder: '' });
        setDocFile(null);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (window.confirm('Silmək istədiyinizə əminsiniz?')) {
            deleteDocument(id, currentUser);
        }
    };

    // Views
    const renderShelves = () => {
        if (!canRead) return <div style={{ padding: '20px', textAlign: 'center' }}>Sənədləri görmək üçün icazəniz yoxdur.</div>;

        return (
            <div className="shelves-grid">
                {shelves.length === 0 && <p>Rəf tapılmadı. Yeni rəf yaradın.</p>}
                {shelves.map(shelf => {
                    const shelfDocs = documents.filter(d => d.location === shelf);
                    return (
                        <div key={shelf} className="shelf-card" onClick={() => { setCurrentShelf(shelf); setView('list'); }}>
                            <div className="shelf-icon">📁</div>
                            <div className="shelf-name">{shelf}</div>
                            <div className="shelf-info">
                                <div className="shelf-stat">
                                    <div className="shelf-stat-number">{shelfDocs.length}</div>
                                    <div className="shelf-stat-label">Sənəd</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderList = (shelf) => {
        // Shelf View: Shows Folders + Documents directly in Shelf (no folder)
        const shelfFolders = folders[shelf] || [];
        const docsInShelfRoot = documents.filter(d => d.location === shelf && !d.folder);

        return (
            <div className="card">
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Button variant="secondary" className="btn-sm" onClick={() => { setView('shelves'); setCurrentShelf(null); setSearchTerm(''); }}>← Rəflər</Button>
                        <h3>Rəf: {shelf}</h3>
                    </div>
                    {canWrite && <Button className="btn-sm" onClick={() => setShowAddFolderModal(true)}>+ Yeni Qovluq</Button>}
                </div>

                {/* Folders Grid within List View */}
                {shelfFolders.length > 0 && (
                    <div className="folders-grid" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
                        {shelfFolders.map(folder => (
                            <div key={folder} className="folder-item"
                                style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'cursor', minWidth: '100px', textAlign: 'center', backgroundColor: '#f9f9f9', cursor: 'pointer' }}
                                onClick={() => { setCurrentFolder(folder); setView('folder'); }}
                            >
                                <div style={{ fontSize: '24px' }}>📂</div>
                                <div>{folder}</div>
                            </div>
                        ))}
                    </div>
                )}

                <h4>Sənədlər</h4>
                {docsInShelfRoot.length === 0 ? <p>Bu rəfdə (kökdə) sənəd yoxdur.</p> : renderDocTable(docsInShelfRoot)}
            </div>
        );
    };

    const renderFolder = (shelf, folder) => {
        const folderDocs = documents.filter(d => d.location === shelf && d.folder === folder);

        return (
            <div className="card">
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Button variant="secondary" className="btn-sm" onClick={() => { setView('list'); setCurrentFolder(null); }}>← {shelf}</Button>
                        <h3>{shelf} / {folder}</h3>
                    </div>
                </div>
                {folderDocs.length === 0 ? <p>Bu qovluqda sənəd yoxdur.</p> : renderDocTable(folderDocs)}
            </div>
        )
    }

    const renderDocTable = (docs) => (
        <table>
            <thead>
                <tr>
                    <th>Nömrə</th>
                    <th>Növ</th>
                    <th>Başlıq</th>
                    <th>Tarix</th>
                    <th>Göndərən/Ünvan</th>
                    {canDelete && <th>Əməliyyatlar</th>}
                </tr>
            </thead>
            <tbody>
                {docs.map(d => (
                    <tr key={d.id} onClick={() => setSelectedDoc(d)}>
                        <td>{d.number}</td>
                        <td><span className="doc-badge">{d.type}</span></td>
                        <td>{d.title}</td>
                        <td>{d.date}</td>
                        <td>{d.sender} → {d.receiver}</td>
                        {canDelete && (
                            <td onClick={e => e.stopPropagation()}>
                                <Button variant="danger" className="btn-sm" onClick={(e) => handleDelete(d.id, e)}>Sil</Button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="app-container active">
            <Navbar
                title="ESIDMS - Sənəd Arxivi"
                user={currentUser}
                role="İstifadəçi"
                onLogout={logout}
            />

            <div className="container">
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2>Sənəd Rəfləri</h2>
                        <p>Sənədləri izləyin və idarə edin</p>
                    </div>
                    {canWrite && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button onClick={() => setShowAddShelfModal(true)}>+ Yeni Rəf</Button>
                            <Button onClick={() => setShowAddModal(true)}>+ Yeni Sənəd</Button>
                        </div>
                    )}
                </div>

                <div className="search-section">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Sənəd axtar (Nömrə, Başlıq, Növ)..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                        />
                        <Button onClick={handleSearch}>🔍 Axtar</Button>
                    </div>
                </div>

                <Alert message={alertMsg} />

                {view === 'shelves' && renderShelves()}
                {view === 'list' && currentShelf && renderList(currentShelf)}
                {view === 'folder' && currentShelf && currentFolder && renderFolder(currentShelf, currentFolder)}
                {view === 'search' && (
                    <div className="card">
                        <h3>Axtarış nəticələri: "{searchTerm}"</h3>
                        <Button variant="secondary" className="btn-sm" style={{ marginBottom: '10px' }} onClick={() => { setView('shelves'); setSearchTerm(''); }}>Bağla</Button>
                        {renderDocTable(searchResults)}
                    </div>
                )}
            </div>

            {/* Add Document Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Yeni Sənəd">
                <form onSubmit={handleCtxAddDoc}>
                    <div className="form-row">
                        <Input label="Sənədin Nömrəsi" value={newDoc.number} onChange={e => setNewDoc({ ...newDoc, number: e.target.value })} required />
                        <div className="form-group">
                            <label>Növ</label>
                            <select value={newDoc.type} onChange={e => setNewDoc({ ...newDoc, type: e.target.value })} required>
                                <option value="">Seçin...</option>
                                <option value="məktub">Məktub</option>
                                <option value="arayış">Arayış</option>
                                <option value="ərizə">Ərizə</option>
                                <option value="kitab">Kitab</option>
                                <option value="jurnal">Jurnal</option>
                            </select>
                        </div>
                    </div>
                    <Input label="Başlıq" value={newDoc.title} onChange={e => setNewDoc({ ...newDoc, title: e.target.value })} required />
                    <Input label="Qısa Məzmun" type="textarea" value={newDoc.content} onChange={e => setNewDoc({ ...newDoc, content: e.target.value })} required />
                    <Input label="Qeyd" type="textarea" value={newDoc.note} onChange={e => setNewDoc({ ...newDoc, note: e.target.value })} />

                    <div className="form-row">
                        <Input label="Tarix" type="date" value={newDoc.date} onChange={e => setNewDoc({ ...newDoc, date: e.target.value })} required />
                        <Input label="Göndərən" value={newDoc.sender} onChange={e => setNewDoc({ ...newDoc, sender: e.target.value })} required />
                    </div>
                    <div className="form-row">
                        <Input label="Ünvanlanan" value={newDoc.receiver} onChange={e => setNewDoc({ ...newDoc, receiver: e.target.value })} required />
                        <div className="form-group">
                            <label>Yerləşmə (Rəf)</label>
                            <select value={newDoc.location} onChange={e => setNewDoc({ ...newDoc, location: e.target.value })} required>
                                <option value="">Seçin...</option>
                                {shelves.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    {newDoc.location && folders[newDoc.location] && folders[newDoc.location].length > 0 && (
                        <div className="form-group">
                            <label>Qovluq (Seçilə bilər)</label>
                            <select value={newDoc.folder} onChange={e => setNewDoc({ ...newDoc, folder: e.target.value })}>
                                <option value="">(Heç biri - Rəfin özündə)</option>
                                {folders[newDoc.location].map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Fayl</label>
                        <div className={`file-upload ${docFile ? 'has-file' : ''}`} onClick={() => document.getElementById('uDocFile').click()}>
                            <div>{docFile ? `✓ ${docFile.name}` : '📄 Fayl seçin'}</div>
                        </div>
                        <input type="file" id="uDocFile" style={{ display: 'none' }} onChange={e => setDocFile(e.target.files[0])} />
                    </div>

                    <div className="modal-footer">
                        <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>Ləğv et</Button>
                        <Button type="submit">Əlavə et</Button>
                    </div>
                </form>
            </Modal>

            {/* Add Shelf Modal */}
            <Modal isOpen={showAddShelfModal} onClose={() => setShowAddShelfModal(false)} title="Yeni Rəf">
                <form onSubmit={handleAddShelf}>
                    <Input label="Rəf Adı" value={newShelfName} onChange={e => setNewShelfName(e.target.value)} required placeholder="Məs: Rəf B-2" />
                    <div className="modal-footer">
                        <Button type="button" variant="secondary" onClick={() => setShowAddShelfModal(false)}>Ləğv et</Button>
                        <Button type="submit">Yarat</Button>
                    </div>
                </form>
            </Modal>

            {/* Add Folder Modal */}
            <Modal isOpen={showAddFolderModal} onClose={() => setShowAddFolderModal(false)} title={`Yeni Qovluq (${currentShelf})`}>
                <form onSubmit={handleAddFolder}>
                    <Input label="Qovluq Adı" value={newFolderName} onChange={e => setNewFolderName(e.target.value)} required placeholder="Məs: Hesabatlar" />
                    <div className="modal-footer">
                        <Button type="button" variant="secondary" onClick={() => setShowAddFolderModal(false)}>Ləğv et</Button>
                        <Button type="submit">Yarat</Button>
                    </div>
                </form>
            </Modal>

            {/* Document Detail Modal */}
            <Modal
                isOpen={!!selectedDoc}
                onClose={() => setSelectedDoc(null)}
                title={selectedDoc?.title}
                footer={
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button variant="success" onClick={() => alert('Yüklənir...')}>📥 Yüklə</Button>
                        <Button variant="secondary" onClick={() => setSelectedDoc(null)}>Bağla</Button>
                    </div>
                }
            >
                {selectedDoc && (
                    <div style={{ lineHeight: '1.8' }}>
                        <p><strong>Nömrə:</strong> {selectedDoc.number}</p>
                        <p><strong>Növ:</strong> {selectedDoc.type}</p>
                        <p><strong>Məzmun:</strong> {selectedDoc.content}</p>
                        {selectedDoc.note && <p><strong>Qeyd:</strong> {selectedDoc.note}</p>}
                        <p><strong>Tarix:</strong> {selectedDoc.date}</p>
                        <p><strong>Göndərən:</strong> {selectedDoc.sender}</p>
                        <p><strong>Ünvanlanan:</strong> {selectedDoc.receiver}</p>
                        <p><strong>Yerləşmə:</strong> {selectedDoc.location}</p>
                        {selectedDoc.folder && <p><strong>Qovluq:</strong> {selectedDoc.folder}</p>}
                        <p><strong>Fayl:</strong> {selectedDoc.fileName}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UserDashboard;
