import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationControlsProps {
    currentPage: number;
    lastPage: number;
    total: number;
    perPage: number;
    onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    lastPage,
    total,
    perPage,
    onPageChange
}) => {
    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, total);
    
    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (lastPage <= maxVisiblePages) {
            // Show all pages if total pages is small
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            // Show pages around current page
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(lastPage, currentPage + 2);
            
            // Adjust if we're near the beginning or end
            if (currentPage <= 3) {
                end = Math.min(lastPage, 5);
            }
            if (currentPage >= lastPage - 2) {
                start = Math.max(1, lastPage - 4);
            }
            
            // Add first page and ellipsis if needed
            if (start > 1) {
                pages.push(1);
                if (start > 2) {
                    pages.push('...');
                }
            }
            
            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            // Add ellipsis and last page if needed
            if (end < lastPage) {
                if (end < lastPage - 1) {
                    pages.push('...');
                }
                pages.push(lastPage);
            }
        }
        
        return pages;
    };

    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
            {/* Mobile pagination */}
            <div className="flex-1 flex justify-between sm:hidden">
                <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                </Button>
                <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === lastPage}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Button>
            </div>
            
            {/* Desktop pagination */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startItem}</span> to{' '}
                        <span className="font-medium">{endItem}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                
                <div className="flex items-center space-x-1">
                    {/* Previous button */}
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-2"
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    
                    {/* Page numbers */}
                    {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="px-3 py-2 text-gray-500">...</span>
                            ) : (
                                <Button
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => onPageChange(page as number)}
                                    className="px-3"
                                >
                                    {page}
                                </Button>
                            )}
                        </React.Fragment>
                    ))}
                    
                    {/* Next button */}
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === lastPage}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-2"
                    >
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaginationControls;