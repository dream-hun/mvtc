import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Student } from '@/types/models';
import { Pencil, Trash2, Search, Plus } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';
import SortableTable, { TableColumn } from '@/Components/SortableTable';
import PaginationControls from '@/Components/PaginationControls';

interface Props {
  students: {
    data: Student[];
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
}

export default function Index({ students, filters }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const { delete: destroy } = useForm();

  const handleDelete = (student: Student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      destroy(route('students.destroy', studentToDelete.id));
    }
    setDeleteDialogOpen(false);
  };

  const handleSort = (field: string) => {
    const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
    router.get(route('students.index'), {
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
    router.get(route('students.index'), {
      ...filters,
      search: searchTerm,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handlePageChange = (page: number) => {
    router.get(route('students.index'), {
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
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: false,
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      render: (student: Student) => student.department?.name || 'N/A',
    },
    {
      key: 'gender',
      label: 'Gender',
      sortable: true,
      render: (student: Student) => (
        <span className="capitalize">{student.gender}</span>
      ),
    },
    {
      key: 'created_at',
      label: 'Registered At',
      sortable: true,
      render: (student: Student) => format(new Date(student.registered_at), 'MMM d, yyyy'),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (student: Student) => (
        <div className="flex space-x-2">
          <Link href={route('students.show', student.id)}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
          <Link href={route('students.edit', student.id)}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(student)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Students
        </h2>
      }
    >
      <Head title="Students" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg">
            {/* Header with search and add button */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Students</h3>
                  <p className="text-sm text-gray-500">
                    Manage student records and registrations
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  {/* Search */}
                  <form onSubmit={handleSearch} className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button type="submit" variant="outline">
                      Search
                    </Button>
                  </form>
                  
                  {/* Add Student Button */}
                  <Link href={route('students.create')}>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <SortableTable
                columns={columns}
                data={students.data}
                sortField={filters.sort}
                sortDirection={filters.direction}
                onSort={handleSort}
              />
            </div>

            {/* Pagination */}
            <PaginationControls
              currentPage={students.current_page}
              lastPage={students.last_page}
              total={students.total}
              perPage={students.per_page}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student's record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AuthenticatedLayout>
  );
}
