export declare class AdminEntity {
    id: number;
    name: string;
    role: 'admin' | 'super_admin';
    password: string;
    isActive: boolean;
}
