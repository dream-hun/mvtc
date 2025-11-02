import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Department } from '@/types/models';
import { PlusIcon, PencilIcon, TrashIcon, Search } from 'lucide-react';
import SortableTable, { TableColumn } from '@/Components/SortableTable';
import PaginationControls from '@/Components/PaginationControls';

interface DepartmentsProps extends PageProps {
    departments: {
        data: Department[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        search?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
    };
    message?: string;
}

export default function Index({ auth, departments, filters, message }: DepartmentsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSort = (field: string) => {
        const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(route('departments.index'), {
            ...filters,
            sort: field,
            direction,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('departments.index'), {
            ...filters,
            search: searchTerm,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePageChange = (page: number) => {
        router.get(route('departments.index'), {
            ...filters,
            page,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const columns: TableColumn[] = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            render: (department: Department) => (
                <div>
                    <div className="text-sm font-medium text-gray-900">{department.name}</div>
                    <div className="text-sm text-gray-500">{department.description}</div>
                </div>
            ),
        },
        {
            key: 'duration',
            label: 'Duration',
            sortable: true,
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (department: Department) => (
                <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        department.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {department.status}
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Created',
            sortable: true,
            render: (department: Department) => new Date(department.created_at).toLocaleDateString(),
        },
        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            render: (department: Department) => (
                <div className="flex space-x-2">
                    <Link href={route('departments.edit', department.id)}>
                        <Button variant="outline" size="sm">
                            <PencilIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link
                        href={route('departments.destroy', department.id)}
                        method="delete"
                        as="button"
                    >
                        <Button variant="destructive" size="sm">
                            <TrashIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Departments</h2>}
        >
            <Head title="Departments" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {message && (
                        <div className="mb-4 rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">{message}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white shadow-sm sm:rounded-lg">
                        {/* Header with search and add button */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Departments</h3>
                                    <p className="text-sm text-gray-500">
                                        Manage academic departments and programs
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                                    {/* Search */}
                                    <form onSubmit={handleSearch} className="flex space-x-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="text"
                                                placeholder="Search departments..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 w-64"
                                            />
                                        </div>
                                        <Button type="submit" variant="outline">
                                            Search
                                        </Button>
                                    </form>
                                    
                                    {/* Add Department Button */}
                                    <Link href={route('departments.create')}>
                                        <Button>
                                            <PlusIcon className="mr-2 h-4 w-4" />
                                            Add Department
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <SortableTable
                                columns={columns}
                                data={departments.data}
                                sortField={filters.sort}
                                sortDirection={filters.direction}
                                onSort={handleSort}
                            />
                        </div>

                        {/* Pagination */}
                        <PaginationControls
                            currentPage={departments.current_page}
                            lastPage={departments.last_page}
                            total={departments.total}
                            perPage={departments.per_page}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
