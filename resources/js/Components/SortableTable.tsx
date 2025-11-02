import React from 'react';
import { ChevronUpIcon, ChevronDownIcon, ArrowUpDownIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface TableColumn {
    key: string;
    label: string;
    sortable: boolean;
    render?: (item: any) => React.ReactNode;
}

interface SortableTableProps {
    columns: TableColumn[];
    data: any[];
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
    onSort: (field: string) => void;
    loading?: boolean;
}

const SortIcon: React.FC<{ 
    field: string; 
    currentSort?: string; 
    direction?: 'asc' | 'desc' 
}> = ({ field, currentSort, direction }) => {
    if (currentSort !== field) {
        return <ArrowUpDownIcon className="h-4 w-4 text-gray-400" />;
    }
    
    return direction === 'asc' 
        ? <ChevronUpIcon className="h-4 w-4 text-gray-600" />
        : <ChevronDownIcon className="h-4 w-4 text-gray-600" />;
};

const SortableTable: React.FC<SortableTableProps> = ({ 
    columns, 
    data, 
    sortField, 
    sortDirection, 
    onSort,
    loading = false
}) => {
    if (loading) {
        return (
            <div className="animate-pulse">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.key}>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead 
                            key={column.key}
                            className={column.sortable ? 'cursor-pointer hover:bg-gray-50 select-none' : ''}
                            onClick={() => column.sortable && onSort(column.key)}
                        >
                            <div className="flex items-center space-x-1">
                                <span>{column.label}</span>
                                {column.sortable && (
                                    <SortIcon 
                                        field={column.key} 
                                        currentSort={sortField} 
                                        direction={sortDirection} 
                                    />
                                )}
                            </div>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell 
                            colSpan={columns.length} 
                            className="text-center py-8 text-gray-500"
                        >
                            No data available
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((row, index) => (
                        <TableRow key={row.id || index} className="hover:bg-gray-50">
                            {columns.map((column) => (
                                <TableCell key={column.key}>
                                    {column.render ? column.render(row) : row[column.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};

export default SortableTable;