
import * as React from "react"
import { HeaderButton } from './header-chip'
import { RootState } from "../../redux/store"

import { formatDate, formatDateTime } from "../../helpers/date-formator"
import { useEffect, useMemo, useRef } from 'react'
import { Label } from "../ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"


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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { useDispatch, useSelector, UseSelector } from "react-redux"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { filterValues, ITodoCategory, ITodos, ITodoStatus } from '../../type/todo'
import { addTodo, removeTodo, updateTodo, filterTodosReducer } from "../../features/todos/todo-slice"
import { UseDispatch } from 'react-redux'
import { Input } from "../../components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { useState } from "react"
import { filterAndSortTodos } from "../../helpers/todos/todos-filters-arrangement"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import { Updatecard } from "./update-todos"
import { Badge } from "../ui/badge"
interface FilterType {
    value: string;
    label: string;
}
const filters: FilterType[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'completed', label: 'Completed Tasks' },
    { value: 'todo', label: 'Pending Tasks' },

];

export function TodosListTable() {
    const [shouldRerender, setShouldRerender] = useState(false)
    const data = useSelector((state: RootState) => state.todo.value)

    // useEffect(() => {
    //     if (!data || data.length === 0) {
    //         if (!hasReloaded.current) {
    //             hasReloaded.current = true
    //             window.location.reload()
    //         }
    //     } else {
    //         hasReloaded.current = false // Reset the flag if data becomes available
    //     }
    // }, [data])


    const [checkedFilters, setCheckedFilters] = useState<string[]>(["all"]);
    function formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    }
    function createDateFromISO(isoString: string): string {
        try {
            const date = new Date(isoString);
            return formatDate(date);
        } catch (error) {
            console.error('Invalid ISO string:', isoString);
            throw error;
        }
    }
    const [toDo, setTodo] = useState<ITodos>()
    const updatetodosReducer = useDispatch()

    console.log("filteredData ", data)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [updateOpen, setUpdateOpen] = useState<boolean>(false)
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const columns: ColumnDef<ITodos>[] = [
        {
            id: "select",
            // header: ({ table }) => (
            //     <Checkbox
            //         checked={
            //             table.getIsAllPageRowsSelected() ||
            //             (table.getIsSomePageRowsSelected() && "indeterminate")
            //         }
            //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            //         aria-label="Select all"
            //     />
            // ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getValue("status") === "completed"}
                    onCheckedChange={(value) => {
                        console.log("valllluee", value)
                        if (value) {
                            updatetodosReducer(updateTodo({
                                key: row.original.key,
                                status: 'completed'

                            }));
                        } else {
                            updatetodosReducer(updateTodo({
                                key: row.original.key,
                                status: 'todo'
                            }));
                        }

                    }}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },

        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        status
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <Badge className="lowercase ml-4" variant="secondary">{row.getValue("status")}</Badge>
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("title")}</div>
            ),
        },
        {
            accessorKey: "priority",
            header: ({ column }) => {
                return (
                    <Button
                        className="align-left ml-0 pl-0"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        priority
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <Badge variant="secondary">{row.getValue("priority")}</Badge>,
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="align-left ml-0 pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        createdAt
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{createDateFromISO(row.getValue("createdAt"))}</div>,
        },
        {
            accessorKey: "dueDate",
            header: ({ column }) => {
                return (
                    <Button
                        className="align-left ml-0 pl-0"
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        dueDate
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">
                {createDateFromISO(row.getValue("dueDate"))}</div>,
        },
        {
            accessorKey: "category",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="align-left ml-0 pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        category
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) =>
                <Badge className="lowercase" variant="secondary">{row.getValue("category")}</Badge>

        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => updatetodosReducer(removeTodo({ key: payment.key }))}
                            >
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                setUpdateOpen(true); setTodo(payment)

                            }}>
                                Update
                            </DropdownMenuItem>

















                        </DropdownMenuContent>
                    </DropdownMenu >
                )
            },
        },
    ]
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
    })
    const toggleFilter = (filterValue: string) => {
        const newFilters = [...checkedFilters]; // Create a copy of the current filters

        if (newFilters.includes(filterValue)) {
            // Remove the filter if it already exists
            newFilters.splice(newFilters.indexOf(filterValue), 1);
        } else {
            // Add the filter if it doesn't exist
            newFilters.push(filterValue);
        }

        setCheckedFilters(newFilters);
        console.log("Updated filters:", newFilters);
        return newFilters
    };
    return (
        <Card className="h-full">
            <CardContent>
                <div className="w-full h-full">
                    <div className="flex items-center py-4 justify-between ">
                        <Input
                            placeholder="Search for title..."
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        <div className="flex gap-2">
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild className=" ">
                                    <Button variant="outline" className="justify-end ">
                                        Filters
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {filters.map((filter, index) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={filter.value}

                                                checked={checkedFilters.includes(filter.value)}
                                                onCheckedChange={(value) => {

                                                    toggleFilter(filter.value);

                                                }
                                                }
                                                onClick={() => {
                                                    updatetodosReducer(filterTodosReducer(toggleFilter(filter.value)))
                                                }}


                                            >
                                                {filter.label}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="ml-auto">
                                        Columns <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {table
                                        .getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) =>
                                                        column.toggleVisibility(!!value)
                                                    }
                                                >
                                                    {column.id}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </div>
                    {data != null ? (<>
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
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
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
                                                            cell.getContext()
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
                        <div className="flex items-center justify-end space-x-2 pt-2 pb-0">
                            {/* <div className="flex-1 text-sm text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div> */}
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
                        </div></>
                    ) : (
                        <>There is no  tasks available ... </>
                    )}
                </div>
            </CardContent>


            <AlertDialog open={updateOpen} onOpenChange={setUpdateOpen}>

                <AlertDialogContent >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {toDo !== undefined &&
                                <Updatecard
                                    todos={toDo}
                                    sheetOpen={updateOpen}
                                    setSheetOpen={setUpdateOpen}
                                />}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {/* <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter> */}
                </AlertDialogContent>
            </AlertDialog>



        </Card >

    )
}
