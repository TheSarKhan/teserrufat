
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/card';
import { Building2, ArrowLeft } from 'lucide-react';
import { AVAILABLE_BANKS } from '../../../lib/mockData';
import { Button } from '../../../components/ui/button';

export default function BankList() {
    const { year } = useParams();
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/applications')}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-2xl font-bold tracking-tight">Kredit Təşkilatları ({year})</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {AVAILABLE_BANKS.map((bank) => (
                    <Card
                        key={bank}
                        className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 bg-white border-gray-200"
                        onClick={() => navigate(`/dashboard/applications/${year}/${bank}`)}
                    >
                        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                            <div className="p-3 bg-secondary-100 rounded-full text-secondary-600">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div className="text-lg font-bold text-center text-gray-900">{bank}</div>
                            <p className="text-xs text-gray-400">Qovluq</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
