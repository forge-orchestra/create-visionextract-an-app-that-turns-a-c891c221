import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { useRouter } from 'next/router';

interface DataTableProps {
  data: Array<Record<string, any>>;
  columns: Array<{ key: string; label: string }>;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-100">
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;