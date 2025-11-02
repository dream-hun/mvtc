import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import StatisticsCard from '@/Components/StatisticsCard';
import { Users, UserCheck, UserX, Building2, Clock } from 'lucide-react';
import { Student } from '@/types/models';

interface DashboardStatistics {
    totalStudents: number;
    maleStudents: number;
    femaleStudents: number;
    totalDepartments: number;
}

interface DashboardProps {
    statistics: DashboardStatistics;
    recentStudents: Student[];
}

export default function Dashboard({ statistics, recentStudents }: DashboardProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatisticsCard
                            title="Total Students"
                            value={statistics.totalStudents}
                            icon={<Users className="h-6 w-6" />}
                            color="blue"
                        />
                        <StatisticsCard
                            title="Male Students"
                            value={statistics.maleStudents}
                            icon={<UserCheck className="h-6 w-6" />}
                            color="green"
                        />
                        <StatisticsCard
                            title="Female Students"
                            value={statistics.femaleStudents}
                            icon={<UserX className="h-6 w-6" />}
                            color="purple"
                        />
                        <StatisticsCard
                            title="Active Departments"
                            value={statistics.totalDepartments}
                            icon={<Building2 className="h-6 w-6" />}
                            color="orange"
                        />
                    </div>

                    {/* Recent Students */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Recent Registrations</h3>
                                <Link 
                                    href={route('students.index')} 
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    View all students →
                                </Link>
                            </div>
                            
                            {recentStudents.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>No students registered yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentStudents.map((student) => (
                                        <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <Users className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                                                    <p className="text-xs text-gray-500">{student.department?.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                <Clock className="h-3 w-3" />
                                                <span>{student.registered_at}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link
                                    href={route('students.index')}
                                    className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <Users className="h-8 w-8 text-blue-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-blue-900">Manage Students</p>
                                        <p className="text-sm text-blue-600">View and manage student records</p>
                                    </div>
                                </Link>
                                
                                <Link
                                    href={route('departments.index')}
                                    className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                    <Building2 className="h-8 w-8 text-green-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-green-900">Manage Departments</p>
                                        <p className="text-sm text-green-600">View and manage departments</p>
                                    </div>
                                </Link>
                                
                                <Link
                                    href={route('students.create')}
                                    className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                                >
                                    <UserCheck className="h-8 w-8 text-purple-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-purple-900">New Registration</p>
                                        <p className="text-sm text-purple-600">Register a new student</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
