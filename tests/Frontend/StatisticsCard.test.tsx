/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import StatisticsCard from '../../resources/js/Components/StatisticsCard';
import { Users } from 'lucide-react';

// Mock test setup - would normally be configured with Jest/Vitest
describe('StatisticsCard', () => {
    it('displays the correct title and value', () => {
        render(
            <StatisticsCard 
                title="Total Students" 
                value={42} 
                icon={<Users data-testid="users-icon" />} 
                color="blue" 
            />
        );
        
        expect(screen.getByText('Total Students')).toBeInTheDocument();
        expect(screen.getByText('42')).toBeInTheDocument();
        expect(screen.getByTestId('users-icon')).toBeInTheDocument();
    });

    it('formats large numbers with commas', () => {
        render(
            <StatisticsCard 
                title="Total Students" 
                value={1234} 
                icon={<Users />} 
                color="blue" 
            />
        );
        
        expect(screen.getByText('1,234')).toBeInTheDocument();
    });

    it('applies correct color classes', () => {
        const { container } = render(
            <StatisticsCard 
                title="Total Students" 
                value={42} 
                icon={<Users />} 
                color="green" 
            />
        );
        
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass('border-green-500');
    });

    it('shows loading state when loading prop is true', () => {
        render(
            <StatisticsCard 
                title="Total Students" 
                value={42} 
                icon={<Users />} 
                color="blue" 
                loading={true}
            />
        );
        
        expect(screen.queryByText('Total Students')).not.toBeInTheDocument();
        expect(screen.queryByText('42')).not.toBeInTheDocument();
        
        // Should show skeleton loader
        const skeletonCard = screen.getByRole('generic');
        expect(skeletonCard).toHaveClass('animate-pulse');
    });

    it('shows hover effect classes', () => {
        const { container } = render(
            <StatisticsCard 
                title="Total Students" 
                value={42} 
                icon={<Users />} 
                color="blue" 
            />
        );
        
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass('hover:shadow-lg', 'transition-shadow');
    });
});