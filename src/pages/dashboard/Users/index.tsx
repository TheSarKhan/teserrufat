import { useState } from 'react';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Plus, Search, MoreVertical, ShieldCheck, User as UserIcon } from 'lucide-react';
import { MOCK_USERS } from '../../../lib/mockData';

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const users = MOCK_USERS.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">İstifadəçilər</h2>
                    <p className="text-gray-500">Sistem istifadəçilərinin idarə edilməsi</p>
                </div>
                <Button className="bg-primary-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni İstifadəçi
                </Button>
            </div>

            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                    placeholder="Ad və ya E-mail ilə axtarış..."
                    className="border-none shadow-none focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ad Soyad</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Əməliyyatlar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                            <UserIcon className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium text-gray-900">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <ShieldCheck className={`w-4 h-4 ${user.role === 'SUPER_ADMIN' ? 'text-purple-600' : user.role === 'ADMIN' ? 'text-blue-600' : 'text-gray-400'}`} />
                                        <span className="text-sm font-medium">
                                            {user.role === 'SUPER_ADMIN' ? 'Super Admin' : user.role === 'ADMIN' ? 'Admin' : 'İstifadəçi'}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                        Aktiv
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
