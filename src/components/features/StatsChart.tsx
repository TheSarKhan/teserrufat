import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const data = [
    { name: 'Yan', documents: 400 },
    { name: 'Fev', documents: 300 },
    { name: 'Mar', documents: 600 },
    { name: 'Apr', documents: 800 },
    { name: 'May', documents: 500 },
    { name: 'Iyn', documents: 900 },
    { name: 'Iyl', documents: 1000 },
];

export function StatsChart() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Müraciət Statistikası (2026)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                itemStyle={{ color: '#0ea5e9' }}
                            />
                            <Area type="monotone" dataKey="documents" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorDocs)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
