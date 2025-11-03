/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControls from '../../resources/js/Components/PaginationControls';

// Mock test setup - would normally be configured with Jest/Vitest
describe('PaginationControls', () => {
    const mockOnPageChange = jest.fn();

    beforeEach(() => {
        mockOnPageChange.mockClear();
    });

    it('does not render when there is only one page', () => {
        const { container } = render(
            <PaginationControls
                currentPage={1}
                lastPage={1}
                total={5}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('displays correct results information', () => {
        render(
            <PaginationControls
                currentPage={1}
                lastPage={3}
                total={25}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        expect(screen.getByText(/Showing 1 to 10 of 25 results/)).toBeInTheDocument();
    });

    it('displays correct results information for last page', () => {
        render(
            <PaginationControls
                currentPage={3}
                lastPage={3}
                total={25}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        expect(screen.getByText(/Showing 21 to 25 of 25 results/)).toBeInTheDocument();
    });

    it('disables previous button on first page', () => {
        render(
            <PaginationControls
                currentPage={1}
                lastPage={3}
                total={25}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        const prevButtons = screen.getAllByText(/Previous/);
        prevButtons.forEach(button => {
            expect(button.closest('button')).toBeDisabled();
        });
    });

    it('disables next button on last page', () => {
        render(
            <PaginationControls
                currentPage={3}
                lastPage={3}
                total={25}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        const nextButtons = screen.getAllByText(/Next/);
        nextButtons.forEach(button => {
            expect(button.closest('button')).toBeDisabled();
        });
    });

    it('calls onPageChange when previous button is clicked', () => {
        render(
            <PaginationControls
                currentPage={2}
                lastPage={3}
                total={25}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        const prevButtons = screen.getAllByText(/Previous/);
        fireEvent.click(prevButtons[0]);

        expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });

    it('calls onPageChange when next button is clicked', () => {
        render(
            <PaginationControls
                currentPage={1}
                lastPage={3}
                total={25}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        const nextButtons = screen.getAllByText(/Next/);
        fireEvent.click(nextButtons[0]);

        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when page number is clicked', () => {
        render(
            <PaginationControls
                currentPage={1}
                lastPage={5}
                total={50}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        const pageButton = screen.getByText('3');
        fireEvent.click(pageButton);

        expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it('highlights current page button', () => {
        render(
            <PaginationControls
                currentPage={2}
                lastPage={5}
                total={50}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        const currentPageButton = screen.getByText('2');
        expect(currentPageButton.closest('button')).toHaveClass('bg-primary'); // or whatever the active class is
    });

    it('shows ellipsis for large page ranges', () => {
        render(
            <PaginationControls
                currentPage={10}
                lastPage={20}
                total={200}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        const ellipsis = screen.getAllByText('...');
        expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('shows first and last page numbers when using ellipsis', () => {
        render(
            <PaginationControls
                currentPage={10}
                lastPage={20}
                total={200}
                perPage={10}
                onPageChange={mockOnPageChange}
            />
        );

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument();
    });
});