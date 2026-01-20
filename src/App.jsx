
import React, { useContext } from 'react';
import { DataProvider } from './context/DataContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import './App.css';

const Main = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Login />;
  }

  if (currentUser.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
