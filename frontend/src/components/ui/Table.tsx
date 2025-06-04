import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table 
        className={twMerge('min-w-full divide-y divide-gray-200', className)} 
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHead = ({ children, className, ...props }: TableHeadProps) => {
  return (
    <thead 
      className={twMerge('bg-gray-50', className)} 
      {...props}
    >
      {children}
    </thead>
  );
};

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody = ({ children, className, ...props }: TableBodyProps) => {
  return (
    <tbody 
      className={twMerge('divide-y divide-gray-200 bg-white', className)} 
      {...props}
    >
      {children}
    </tbody>
  );
};

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export const TableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
    <tr 
      className={twMerge('hover:bg-gray-50 transition-colors duration-150', className)} 
      {...props}
    >
      {children}
    </tr>
  );
};

interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export const TableHeader = ({ children, className, ...props }: TableHeaderProps) => {
  return (
    <th 
      className={twMerge(
        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
        className
      )} 
      {...props}
    >
      {children}
    </th>
  );
};

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export const TableCell = ({ children, className, ...props }: TableCellProps) => {
  return (
    <td 
      className={twMerge('px-6 py-4 whitespace-nowrap text-sm text-gray-500', className)} 
      {...props}
    >
      {children}
    </td>
  );
};

interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableFooter = ({ children, className, ...props }: TableFooterProps) => {
  return (
    <tfoot 
      className={twMerge('bg-gray-50', className)} 
      {...props}
    >
      {children}
    </tfoot>
  );
};