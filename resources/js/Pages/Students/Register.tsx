import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Department } from '@/types/models';
import RegistrationLayout from '@/Layouts/RegistrationLayout';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface RegisterProps {
    departments: Department[];
}

export default function Register({ departments }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        department_id: '',
    });

    const { toast } = useToast();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('student.apply'), {
            onSuccess: () => {
                reset();
                toast({
                    title: "Success!",
                    description: "Your application has been submitted successfully.",
                    variant: "default",
                });
            },
            onError: () => {
                toast({
                    title: "Error!",
                    description: "There was a problem submitting your application. Please try again.",
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <RegistrationLayout>
            <Head title="Student Registration" />
            <div className="py-12">




                                <p className="mt-1 text-sm text-gray-600">
                                    Please fill out the form below to apply for admission.
                                </p>

                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                                    <div className="col-span-1">
                                        <InputLabel htmlFor="name" value="Full Name" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="col-span-1">
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="col-span-1">
                                        <InputLabel htmlFor="phone" value="Phone Number" />
                                        <TextInput
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={data.phone}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('phone', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>

                                    <div className="col-span-1">
                                        <InputLabel htmlFor="gender" value="Gender" />
                                        <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Gender</SelectLabel>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.gender} className="mt-2" />
                                    </div>

                                    <div className="col-span-1">
                                        <InputLabel htmlFor="department_id" value="Department" />
                                        <Select value={data.department_id} onValueChange={(value) => setData('department_id', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Departments</SelectLabel>
                                                    {departments.map((department) => (
                                                        <SelectItem key={department.id} value={department.id.toString()}>
                                                            {department.name} - 6 Months
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.department_id} className="mt-2" />
                                    </div>

                                    <div className="col-span-full">
                                        <InputLabel htmlFor="address" value="Address" />
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={data.address}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            rows={3}
                                            onChange={(e) => setData('address', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.address} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-end">
                                    <Button
                                        className="px-6"
                                        disabled={processing}
                                    >
                                        Submit Application
                                    </Button>
                                </div>
                            </form>
                            <Toaster />
                            <div className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                                    {processing && (
                                        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                            <div className="p-4">
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                                        <p className="text-sm font-medium text-gray-900">Processing...</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            </div>
        </RegistrationLayout>
    );
}
