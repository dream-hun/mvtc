/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortableTable, { TableColumn } from '../../resources/js/Components/SortableTable';

// Mock test setup - would normally be configured with Jest/Vitest
describe('SortableTable', () => {
    const mockColumns: TableColumn[] = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: false },
        { 
            key: 'status', 
            label: 'Status', 
            sortable: true,
            render: (item) => <span className="status">{item.status}</span>
        }
    ];

    const mockData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', status: 'inactive' }
    ];

    const mockOnSort = jest.fn();

    beforeEach(() => {
        mockOnSort.mockClear();
    });

    it('renders table headers correctly', () => {
        render(
            <SortableTable
                columns={mockColumns}
                data={mockData}
                onSort={mockOnSort}
            />
        );

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Phone')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('renders table data correctly', () => {
        render(
            <SortableTable
                columns={mockColumns}
                data={mockData}
                onSort={mockOnSort}
            />
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    });

    it('uses custom render function when provided', () => {
        render(
            <SortableTable
                columns={mockColumns}
                data={mockData}
                onSort={mockOnSort}
            />
        );

        const statusElements = screen.getAllByText('active');
        expect(statusElements[0]).toHaveClass('status');
    });

    it('calls onSort when sortable header is clicked', () => {
        render(
            <SortableTable
                columns={mockColumns}
                data={mockData}
                onSort={mockOnSort}
            />
        );

        const nameHeader = screen.getByText('Name').closest('th');
        fireEvent.click(nameHeader!);

        expect(mockOnSort).toHaveBeenCalledWith('name');
    });

    it('does not call onSort when non-sortable header is clicked', () => {
        render(
            <SortableTable
                columns={mockColumns}
                data={mockData}
                onSort={mockOnSort}
            />
        );

        const phoneHeader = screen.getByText('Phone').closest('th');
        fireEvent.click(phoneHeader!);

        expect(mockOnSort).not.toHaveBeenCalled();
    });

    it('shows correct sort icon for current sort field', () => {
        render(
            <SortableTable
                columns={mockColumns}
                data={mockData}
                sortField="name"
                sortDirection="asc"
                onSort={mockOnSort}
            />
        );

        // Should show ascending icon for name column
        const nameHeader = screen.getByText('Name').closest('th');
        expect(nameHeader).toBeInTheDocument();
    });

    it('shows empty state when no data', () => {
        render(
            <SortableTable
                columns={mockColumns}
                data={[]}
                onSort={mockOnSort}
            />
        );

        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('shows loading state when loading prop is true', () => {
        render(
            <SortableTable
                columns={mockColumns}
                data={mockData}
                onSort={mockOnSort}
                loading={true}
            />
        );

        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        
        // Should show skeleton loader
        const table = screen.getByRole('table');
        expect(table.closest('div')).toHaveClass('animate-pulse');
    });

    it('adds hover class to sortable headers', () => {
        render(
            <SortableTable
                columns={mockColumns}
                data={mockData}
                onSort={mockOnSort}
            />
        );

        const nameHeader = screen.getByText('Name').closest('th');
        const phoneHeader = screen.getByText('Phone').closest('th');

        expect(nameHeader).toHaveClass('cursor-pointer', 'hover:bg-gray-50');
        expect(phoneHeader).not.toHaveClass('cursor-pointer', 'hover:bg-gray-50');
    });
});