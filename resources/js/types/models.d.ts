export interface Department {
    id: number;
    name: string;
    description: string;
    duration: string;
    status: 'active' | 'inactive';
    student_count?: number;
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

export interface DashboardStatistics {
    totalStudents: number;
    maleStudents: number;
    femaleStudents: number;
    totalDepartments: number;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export interface FilterParams {
    search?: string;
    sort?: string;
    direction?: 'asc' | 'desc';
    page?: number;
}
