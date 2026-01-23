import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/auth/Login';
import DashboardHome from './pages/dashboard/Home';
import ApplicationYears from './pages/dashboard/Applications';
import BankList from './pages/dashboard/Applications/BankList';
import ApplicationTable from './pages/dashboard/Applications/ApplicationTable';
import SearchPage from './pages/dashboard/Search';
import UsersPage from './pages/dashboard/Users';
import AuditPage from './pages/dashboard/Audit';

// Placeholder Components

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="applications" element={<ApplicationYears />} />
            <Route path="applications/:year" element={<BankList />} />
            <Route path="applications/:year/:bankId" element={<ApplicationTable />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="audit" element={<AuditPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
