
import { StatsChart } from '../../../components/features/StatsChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { FileText, Users, Building2, TrendingUp } from 'lucide-react';

export default function DashboardHome() {
    const stats = [
        {
            title: "Ümumi Müraciətlər",
            value: "12,345",
            change: "+12% keçən aydan",
            icon: FileText,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },
        {
            title: "Aktiv Banklar",
            value: "24",
            change: "Stabil",
            icon: Building2,
            color: "text-green-600",
            bg: "bg-green-100"
        },
        {
            title: "Sistem İstifadəçiləri",
            value: "156",
            change: "+4 yeni",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-100"
        },
        {
            title: "Ortalama Emal Vaxtı",
            value: "1.2 gün",
            change: "-0.3 gün",
            icon: TrendingUp,
            color: "text-orange-600",
            bg: "bg-orange-100"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                <span className={stat.change.includes('+') ? 'text-green-600 font-medium' : stat.change.includes('-') ? 'text-green-600 font-medium' : 'text-gray-500'}>
                                    {stat.change}
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <StatsChart />
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Son Müraciətlər</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                                            AA
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Əliyev Anar</p>
                                            <p className="text-xs text-gray-500">Kapital Bank • 12 Yan 2026</p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-primary-600">
                                        Yeni
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
