import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Search, Filter, AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from '../../../components/ui/input';

const MOCK_LOGS = [
    { id: 1, user: 'Super Admin', action: 'LOGIN', target: 'System', date: '2026-01-24 10:00:00', status: 'SUCCESS' },
    { id: 2, user: 'Admin User', action: 'CREATE_APPLICATION', target: 'APP-004', date: '2026-01-24 10:15:00', status: 'SUCCESS' },
    { id: 3, user: 'Normal User', action: 'DELETE_ATTEMPT', target: 'APP-001', date: '2026-01-24 11:00:00', status: 'FAILED' },
    { id: 4, user: 'Admin User', action: 'UPDATE_USER', target: 'Normal User', date: '2026-01-24 11:30:00', status: 'SUCCESS' },
    { id: 5, user: 'Super Admin', action: 'EXPORT_DATA', target: 'All Applications', date: '2026-01-24 12:00:00', status: 'SUCCESS' },
];

export default function AuditPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const logs = MOCK_LOGS.filter(log =>
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Audit Logları</h2>
                <p className="text-gray-500">Sistem daxilində baş verən bütün əməliyyatların tarixçəsi</p>
            </div>

            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                    placeholder="İstifadəçi və ya əməliyyat növü axtar..."
                    className="border-none shadow-none focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Filter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            <div className="rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tarix</TableHead>
                            <TableHead>İstifadəçi</TableHead>
                            <TableHead>Əməliyyat</TableHead>
                            <TableHead>Hədəf</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="text-sm text-gray-500">{log.date}</TableCell>
                                <TableCell className="font-medium">{log.user}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-xs font-semibold text-gray-800">
                                        {log.action}
                                    </span>
                                </TableCell>
                                <TableCell>{log.target}</TableCell>
                                <TableCell>
                                    {log.status === 'SUCCESS' ? (
                                        <div className="flex items-center text-green-600 space-x-1">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-xs font-medium">Uğurlu</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-600 space-x-1">
                                            <AlertCircle className="w-4 h-4" />
                                            <span className="text-xs font-medium">Xəta</span>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
