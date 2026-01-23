import { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Search as SearchIcon, ScanText, User } from 'lucide-react';
import { MOCK_APPLICATIONS, AVAILABLE_BANKS } from '../../../lib/mockData';

export default function SearchPage() {
    const [activeTab, setActiveTab] = useState<'CITIZEN' | 'OCR'>('CITIZEN');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBank, setSelectedBank] = useState('');

    // Filter logic
    const results = MOCK_APPLICATIONS.filter(app => {
        if (activeTab === 'CITIZEN') {
            const matchName = app.citizenName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchVoen = app.voen.includes(searchTerm);
            const matchBank = selectedBank ? app.bankName === selectedBank : true;
            return (matchName || matchVoen) && matchBank;
        } else {
            // OCR search mock
            const matchKeyword = app.keywords?.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchKeyword;
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Ətraflı Axtarış</h2>
                <p className="text-gray-500">Vətəndaş məlumatlarına və ya sənəd daxili mətnlərə görə axtarış</p>
            </div>

            <div className="flex space-x-4 border-b border-gray-200 pb-1">
                <button
                    className={`pb-2 px-4 text-sm font-medium transition-colors relative ${activeTab === 'CITIZEN' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                    onClick={() => setActiveTab('CITIZEN')}
                >
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Vətəndaş üzrə</span>
                    </div>
                    {activeTab === 'CITIZEN' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
                </button>
                <button
                    className={`pb-2 px-4 text-sm font-medium transition-colors relative ${activeTab === 'OCR' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                    onClick={() => setActiveTab('OCR')}
                >
                    <div className="flex items-center space-x-2">
                        <ScanText className="w-4 h-4" />
                        <span>OCR (Mətn) üzrə</span>
                    </div>
                    {activeTab === 'OCR' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
                </button>
            </div>

            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="md:col-span-2 relative">
                            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder={activeTab === 'CITIZEN' ? "Ad, Soyad və ya VÖEN daxil edin..." : "Açar söz daxil edin (məs: subsidiya, müqavilə)..."}
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {activeTab === 'CITIZEN' && (
                            <div className="md:col-span-1">
                                <select
                                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                                    value={selectedBank}
                                    onChange={(e) => setSelectedBank(e.target.value)}
                                >
                                    <option value="">Bütün Banklar</option>
                                    {AVAILABLE_BANKS.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="md:col-span-1">
                            <Button className="w-full bg-primary-600">Axtar</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Müraciət №</TableHead>
                            <TableHead>Vətəndaş</TableHead>
                            <TableHead>Bank</TableHead>
                            <TableHead>Tarix</TableHead>
                            <TableHead>Uyğunluq</TableHead>
                            <TableHead className="text-right">Əməliyyat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {searchTerm && results.length > 0 ? (
                            results.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.id}</TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium text-gray-900">{app.citizenName}</p>
                                            <p className="text-xs text-gray-500">{app.voen}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{app.bankName}</TableCell>
                                    <TableCell>{app.date}</TableCell>
                                    <TableCell>
                                        {activeTab === 'OCR' ? (
                                            <div className="flex flex-wrap gap-1">
                                                {app.keywords?.filter(k => k.toLowerCase().includes(searchTerm.toLowerCase())).map(k => (
                                                    <span key={k} className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                                        {k}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 text-xs">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Bax</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                                    {searchTerm ? "Nəticə tapılmadı" : "Axtarış etmək üçün məlumat daxil edin"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
