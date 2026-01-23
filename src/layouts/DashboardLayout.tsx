
import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, FileText, Search, ShieldAlert, LogOut, Menu } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';

export default function DashboardLayout() {
    const { user, logout, isLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    const navItems = [
        { icon: LayoutDashboard, label: 'Statistikalar', path: '/dashboard', roles: ['SUPER_ADMIN'] },
        { icon: FileText, label: 'Müraciətlər', path: '/dashboard/applications', roles: ['SUPER_ADMIN', 'ADMIN', 'USER'] },
        { icon: Search, label: 'Axtarış', path: '/dashboard/search', roles: ['SUPER_ADMIN', 'ADMIN', 'USER'] },
        { icon: Users, label: 'İstifadəçilər', path: '/dashboard/users', roles: ['SUPER_ADMIN', 'ADMIN'] },
        { icon: ShieldAlert, label: 'Audit & Əməliyyatlar', path: '/dashboard/audit', roles: ['SUPER_ADMIN'] },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50 md:relative",
                    sidebarOpen ? "w-64" : "w-16"
                )}
            >
                <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
                    {sidebarOpen ? (
                        <span className="text-xl font-bold text-primary-700 truncate">AgroArchive</span>
                    ) : (
                        <span className="text-xl font-bold text-primary-700">AA</span>
                    )}
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        if (!item.roles.includes(user.role)) return null;
                        return (
                            <a
                                key={item.path}
                                href={item.path}
                                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-colors group"
                                title={!sidebarOpen ? item.label : ''}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                            </a>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className={cn("flex items-center space-x-3 mb-4", !sidebarOpen && "justify-center")}>
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                            {user.name.charAt(0)}
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.role}</p>
                            </div>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50", !sidebarOpen && "justify-center px-0")}
                        onClick={logout}
                    >
                        <LogOut className="w-5 h-5 mr-0 md:mr-2" />
                        {sidebarOpen && "Çıxış"}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu className="w-5 h-5" />
                    </Button>
                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('az-AZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
