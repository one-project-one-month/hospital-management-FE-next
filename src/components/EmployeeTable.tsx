"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Badge,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui";
import { cn } from "@/lib/utils";
import Link from "next/link";

const data: Employee[] = [
  { id: 1, name: "Alice Johnson", role: "doctor" },
  { id: 2, name: "Bob Smith", role: "receptionist" },
  { id: 3, name: "Charlie Brown", role: "doctor" },
  { id: 4, name: "Diana Prince", role: "receptionist" },
  { id: 5, name: "Ethan Hunt", role: "doctor" },
  { id: 6, name: "Fiona Scott", role: "receptionist" },
  { id: 7, name: "George Miller", role: "doctor" },
  { id: 8, name: "Hannah Davis", role: "receptionist" },
  { id: 9, name: "Ian Clark", role: "doctor" },
  { id: 10, name: "Jane Foster", role: "receptionist" },
  { id: 11, name: "Kevin Lee", role: "doctor" },
  { id: 12, name: "Laura Kim", role: "receptionist" },
];

export type Employee = {
  id: number;
  name: string;
  role: "doctor" | "receptionist";
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "actions",
    header: () => <div className="px-4.5 text-left">Actions</div>,
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <div className="capitalize">
          <Link
            href={{
              pathname: "/admin/employee/edit",
              query: { id: rowData.id },
            }}
          >
            <Button variant="ghost" className="text-sm">
              <SquarePen />
              edit
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-destructive text-sm">
                <Trash2 /> delete
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="default">
                    Close
                  </Button>
                </DialogClose>

                <DialogClose
                  onClick={() => {
                    console.log(`${rowData.name} is deleted!`);
                  }}
                  asChild
                >
                  <Button type="button" variant="destructive">
                    DELETE
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rowData = row.original;
      const { role } = rowData;

      return (
        <div className="flex gap-2">
          {row.getValue("name")}
          <Badge
            variant="outline"
            className={cn(
              role === "doctor" && "border-blue-700 text-blue-700",
              role === "receptionist" && "border-green-700 text-green-700",
            )}
          >
            {rowData.role}
          </Badge>
        </div>
      );
    },
  },
];

export function EnployeeTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* Filter */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination BTN */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
