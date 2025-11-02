import React from 'react';

interface StatisticsCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'purple' | 'orange';
    loading?: boolean;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ 
    title, 
    value, 
    icon, 
    color, 
    loading = false 
}) => {
    const colorClasses = {
        blue: {
            border: 'border-blue-500',
            iconBg: 'bg-blue-100',
            iconText: 'text-blue-600'
        },
        green: {
            border: 'border-green-500',
            iconBg: 'bg-green-100',
            iconText: 'text-green-600'
        },
        purple: {
            border: 'border-purple-500',
            iconBg: 'bg-purple-100',
            iconText: 'text-purple-600'
        },
        orange: {
            border: 'border-orange-500',
            iconBg: 'bg-orange-100',
            iconText: 'text-orange-600'
        }
    };

    const colors = colorClasses[color];

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300 animate-pulse">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-gray-200 w-12 h-12"></div>
                    <div className="ml-4 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${colors.border} hover:shadow-lg transition-shadow duration-200`}>
            <div className="flex items-center">
                <div className={`p-3 rounded-full ${colors.iconBg} ${colors.iconText}`}>
                    {icon}
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{value.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCard;