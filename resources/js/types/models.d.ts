export interface Department {
    id: number;
    name: string;
    description: string;
    duration: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

export interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    gender: 'male' | 'female' | 'other';
    department_id: number;
    department?: Department;
    registered_at: string;
    created_at: string;
    updated_at: string;
}
