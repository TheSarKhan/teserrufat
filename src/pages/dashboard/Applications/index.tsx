import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/card';
import { Calendar } from 'lucide-react';
import { AVAILABLE_YEARS } from '../../../lib/mockData';

export default function ApplicationYears() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Müraciətlər: İl Seçimi</h2>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {AVAILABLE_YEARS.map((year) => (
                    <Card
                        key={year}
                        className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-gray-200"
                        onClick={() => navigate(`/dashboard/applications/${year}`)}
                    >
                        <CardContent className="flex flex-col items-center justify-center p-10 space-y-4">
                            <div className="p-4 bg-primary-100 rounded-full text-primary-600">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{year}</div>
                            <p className="text-sm text-gray-500">Arxiv qovluğu</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
