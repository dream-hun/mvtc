import { Head, useForm } from '@inertiajs/react';
import { Department, Student } from '@/types/models';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Props {
  student: Student;
  departments: Department[];
}

export default function Edit({ student, departments }: Props) {
  const { data, setData, patch, errors, processing } = useForm({
    name: student.name,
    email: student.email,
    phone: student.phone,
    address: student.address,
    gender: student.gender,
    department_id: student.department_id.toString(),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route('students.update', student.id));
  };

  const handleGenderChange = (value: string) => {
    if (value === 'male' || value === 'female' || value === 'other') {
      setData('gender', value);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Edit Student
        </h2>
      }
    >
      <Head title="Edit Student" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form onSubmit={submit} className="space-y-6 max-w-xl">
                <FormField
                  name="name"
                  render={() => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          value={data.name}
                          onChange={e => setData('name', e.target.value)}
                        />
                      </FormControl>
                      {errors.name && <FormMessage>{errors.name}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  render={() => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          value={data.email}
                          onChange={e => setData('email', e.target.value)}
                        />
                      </FormControl>
                      {errors.email && <FormMessage>{errors.email}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  name="phone"
                  render={() => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          value={data.phone}
                          onChange={e => setData('phone', e.target.value)}
                        />
                      </FormControl>
                      {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  name="address"
                  render={() => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          value={data.address}
                          onChange={e => setData('address', e.target.value)}
                        />
                      </FormControl>
                      {errors.address && <FormMessage>{errors.address}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  name="gender"
                  render={() => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        value={data.gender}
                        onValueChange={handleGenderChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && <FormMessage>{errors.gender}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  name="department_id"
                  render={() => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        value={data.department_id}
                        onValueChange={value => setData('department_id', value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem
                              key={department.id}
                              value={department.id.toString()}
                            >
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.department_id && (
                        <FormMessage>{errors.department_id}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={processing}>
                    Update Student
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
