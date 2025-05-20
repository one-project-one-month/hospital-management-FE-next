"use client";

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
import { ArrowUpDown, CalendarPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import Link from "next/link";
import { useState } from "react";

const data: Employee[] = [
  { id: 1, name: "Alice Johnson", role: "receptionist" },
  { id: 2, name: "Bob Smith", role: "receptionist" },
  { id: 3, name: "Charlie Brown", role: "receptionist" },
  { id: 4, name: "Diana Prince", role: "receptionist" },
  { id: 5, name: "Ethan Hunt", role: "receptionist" },
  { id: 6, name: "Fiona Scott", role: "receptionist" },
  { id: 7, name: "George Miller", role: "receptionist" },
  { id: 8, name: "Hannah Davis", role: "receptionist" },
  { id: 9, name: "Ian Clark", role: "receptionist" },
  { id: 10, name: "Jane Foster", role: "receptionist" },
  { id: 11, name: "Kevin Lee", role: "receptionist" },
  { id: 12, name: "Laura Kim", role: "receptionist" },
];

type Employee = {
  id: number;
  name: string;
  role: "receptionist";
};

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "actions",
    header: () => <div className="px-4.5 text-left">Actions</div>,
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <div className="capitalize">
          <Link
            href={{
              pathname: "/receptionist/make_appointment/patient_profile",
              query: { id: rowData.id },
            }}
          >
            {/* Edit Btn */}
            <Button variant="ghost" className="text-sm">
              <CalendarPlus />
              Make an appointment
            </Button>
          </Link>
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
      return <div className="flex gap-2">{row.getValue("name")}</div>;
    },
  },
];

export function PatientTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  // const [doctors, setDoctors] = useState<IDoctor[]>([]);

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

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const { data } = await getPatients();
  //       console.log(data);

  //       // setDoctors(data || []);
  //     } catch (error) {
  //       console.error("Failed to fetch doctors:", error);
  //     }
  //   };

  //   fetchDoctors();
  // }, [setDoctors]);

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
