
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if (!result.success) {
            setError(result.message);
        }
    };

    const showTestAccounts = () => (
        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '13px', color: '#999' }}>
            <strong>Test hesabları:</strong><br />
            Admin: admin@test.az / admin123<br />
            İstifadəçi: user@test.az / user123
        </div>
    );

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="logo">
                    <h1>ESIDMS</h1>
                    <p>Elektron Sənəd İdarəetmə Sistemi</p>
                </div>

                <Alert type="error" message={error} />

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Şifrə"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <div className="forgot-link">
                        <a onClick={() => alert('Demo versiyada mövcud deyil')}>Şifrəmi unutdum</a>
                    </div>

                    <Button type="submit">Daxil ol</Button>
                </form>
                {showTestAccounts()}
            </div>
        </div>
    );
};

export default Login;
