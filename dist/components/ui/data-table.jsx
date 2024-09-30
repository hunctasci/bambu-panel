"use client";
import * as React from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
export function DataTable(_a) {
    var _b, _c, _d;
    var columns = _a.columns, data = _a.data;
    var _e = React.useState([]), sorting = _e[0], setSorting = _e[1];
    var _f = React.useState([]), columnFilters = _f[0], setColumnFilters = _f[1];
    var _g = React.useState({}), columnVisibility = _g[0], setColumnVisibility = _g[1];
    var table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting: sorting,
            columnFilters: columnFilters,
            columnVisibility: columnVisibility
        }
    });
    return (<div>
      <div className="flex items-center justify-center">
        <div className="flex items-center py-4">
          <Input placeholder="Filter names..." value={(_c = (_b = table.getColumn("name")) === null || _b === void 0 ? void 0 : _b.getFilterValue()) !== null && _c !== void 0 ? _c : ""} onChange={function (event) { var _a; return (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }} className="max-w-sm"/>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
            .getAllColumns()
            .filter(function (column) { return column.getCanHide(); })
            .map(function (column) {
            return (<DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={function (value) {
                    return column.toggleVisibility(!!value);
                }}>
                    {column.id}
                  </DropdownMenuCheckboxItem>);
        })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(function (headerGroup) { return (<TableRow key={headerGroup.id}>
                {headerGroup.headers.map(function (header) {
                return (<TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>);
            })}
              </TableRow>); })}
          </TableHeader>
          <TableBody>
            {((_d = table.getRowModel().rows) === null || _d === void 0 ? void 0 : _d.length) ? (table.getRowModel().rows.map(function (row) { return (<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(function (cell) { return (<TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>); })}
                </TableRow>); })) : (<TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={function () { return table.previousPage(); }} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={function () { return table.nextPage(); }} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>);
}
