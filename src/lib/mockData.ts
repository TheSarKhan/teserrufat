export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    permissions: string[];
}

export const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'Super Admin',
        email: 'super@agro.gov.az',
        role: 'SUPER_ADMIN',
        permissions: ['all'],
    },
    {
        id: '2',
        name: 'Admin User',
        email: 'admin@agro.gov.az',
        role: 'ADMIN',
        permissions: ['manage_users', 'view_all', 'approve_requests'],
    },
    {
        id: '3',
        name: 'Normal User',
        email: 'user@agro.gov.az',
        role: 'USER',
        permissions: ['view_own', 'create_application'],
    },
];

export interface Application {
    id: string;
    citizenName: string;
    voen: string;
    bankName: string;
    year: string;
    date: string;
    description: string;
    status: 'NEW' | 'PROCESSED' | 'ARCHIVED' | 'PENDING_DELETE';
    fileUrl?: string;
    keywords?: string[];
}

export const MOCK_APPLICATIONS: Application[] = [
    {
        id: 'APP-001',
        citizenName: 'Əliyev Anar Məmməd oğlu',
        voen: '1234567890',
        bankName: 'Kapital Bank',
        year: '2026',
        date: '2026-01-12',
        description: 'Aqrar kredit müraciəti sənədləri',
        status: 'NEW',
        keywords: ['kredit', 'müqavilə', '2026'],
    },
    {
        id: 'APP-002',
        citizenName: 'Həsənov Orxan Əli oğlu',
        voen: '9876543210',
        bankName: 'Paşa Bank',
        year: '2026',
        date: '2026-01-15',
        description: 'Subsidiya hesabatı',
        status: 'PROCESSED',
        keywords: ['subsidiya', 'hesabat'],
    },
    {
        id: 'APP-003',
        citizenName: 'Quliyev Sənan Vəli oğlu',
        voen: '5556667770',
        bankName: 'ABB',
        year: '2025',
        date: '2025-12-20',
        description: 'Köhnə ilin hesabatı',
        status: 'ARCHIVED',
        keywords: ['2025', 'arxiv'],
    },
];

export const AVAILABLE_YEARS = ['2026', '2025', '2024'];
export const AVAILABLE_BANKS = ['Kapital Bank', 'Paşa Bank', 'ABB', 'Unibank', 'Muğan Bank'];
