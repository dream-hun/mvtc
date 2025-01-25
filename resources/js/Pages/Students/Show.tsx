import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Student } from '@/types/models';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Props {
  student: Student;
}

export default function Show({ student }: Props) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Student Details
        </h2>
      }
    >
      <Head title={`Student - ${student.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex justify-between items-center mb-6">
                <Link href={route('students.index')}>
                  <Button variant="outline">Back to List</Button>
                </Link>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{student.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p>{student.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p>{student.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p>{student.address}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Gender</h3>
                    <p className="capitalize">{student.gender}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Department</h3>
                    <p>{student.department?.name}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex space-x-4">
                <Link href={route('students.edit', student.id)}>
                  <Button>Edit Student</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
