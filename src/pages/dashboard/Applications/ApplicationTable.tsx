import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_APPLICATIONS } from '../../../lib/mockData';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { ArrowLeft, Plus, Search, Download, Trash2, Eye } from 'lucide-react';
import { type Application } from '../../../lib/mockData';

export default function ApplicationTable() {
    const { year, bankId } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter applications
    const applications = MOCK_APPLICATIONS.filter(app =>
        (app.year === year) &&
        (app.bankName === bankId || decodeURIComponent(bankId || '') === app.bankName) && // Handle URL encoding if needed
        (app.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.voen.includes(searchTerm))
    );

    const getStatusColor = (status: Application['status']) => {
        switch (status) {
            case 'NEW': return 'bg-blue-100 text-blue-700';
            case 'PROCESSED': return 'bg-green-100 text-green-700';
            case 'ARCHIVED': return 'bg-gray-100 text-gray-700';
            case 'PENDING_DELETE': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/applications/${year}`)}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{decodeURIComponent(bankId || '')}</h2>
                        <p className="text-sm text-gray-500">{year} ili üzrə vətəndaş müraciətləri</p>
                    </div>
                </div>
                <Button className="bg-primary-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Müraciət
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                    placeholder="Ad, Soyad və ya VÖEN ilə axtarış..."
                    className="border-none shadow-none focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline">Export Excel</Button>
            </div>

            {/* Table */}
            <div className="rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Müraciət №</TableHead>
                            <TableHead>Vətəndaş</TableHead>
                            <TableHead>VÖEN</TableHead>
                            <TableHead>Tarix</TableHead>
                            <TableHead>Təsvir</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Əməliyyatlar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.id}</TableCell>
                                    <TableCell>{app.citizenName}</TableCell>
                                    <TableCell>{app.voen}</TableCell>
                                    <TableCell>{app.date}</TableCell>
                                    <TableCell title={app.description} className="max-w-[200px] truncate">{app.description}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Baxış">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Yüklə">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" title="Sil">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                                    Məlumat tapılmadı
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
