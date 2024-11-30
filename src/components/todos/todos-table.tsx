import React, { useState } from 'react'
import { HeaderButton } from './header-chip'
import { RootState } from "@/redux/store"
import { filterAndSortTodos } from "../../helpers/todos/todos-filters-arrangement"
import { formatDate, formatDateTime } from "../../helpers/date-formator"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { useDispatch, useSelector, UseSelector } from "react-redux"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { ITodoCategory, ITodoStatus } from '@/type/todo'
import { addTodo, removeTodo, upadteTodo } from "../../features/todos/todo-slice"
import { UseDispatch } from 'react-redux'
interface FilterType {
    value: string;
    label: string;
}
const filters: FilterType[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'FilterCompleted', label: 'Completed Tasks' },
    { value: 'sortIncreasingPriority', label: 'Priority Low to High' },
    { value: 'sortDecresingPriority', label: 'Priority High to Low' },
    { value: 'filterCategory', label: 'Filter Category' },
    { value: 'filterprogress', label: 'Task In Progress' }
];
export function TodosTable() {
    const updatetodosReducer = useDispatch()
    const [selectedFilter, setSelectedFilter] = useState<FilterType>(filters[0]);
    const tododata = useSelector((state: RootState) => state.todo.value)
    const filteredTodos = filterAndSortTodos(tododata, selectedFilter.value);
    return (
        <div>
            <div className="px-4 py-7 flex items-center flex-wrap gap-1">
                {filters.map((filter) => (
                    <HeaderButton
                        key={filter.value}
                        text={filter.label}
                        selected={selectedFilter.value === filter.value}
                        setSelected={() => setSelectedFilter(filter)}
                    />
                ))}
            </div>
            {filteredTodos === null ?
                <div className='m-4'>
                    There is no task available
                </div>
                :
                <Table className='m-4'>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead >Due Date</TableHead>
                            <TableHead >Status</TableHead>
                            <TableHead >Priority</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filteredTodos.map((todo, index) => (
                                <TableRow key={index} >

                                    <TableCell >{todo.title}</TableCell>
                                    <TableCell>{todo.description}</TableCell>
                                    <TableCell>{formatDateTime(todo.createdAt)}</TableCell>
                                    <TableCell>{formatDate(todo.dueDate)}</TableCell>
                                    <TableCell >
                                        <Select

                                            onValueChange={(value: ITodoStatus) => updatetodosReducer(upadteTodo({
                                                key: todo.key,
                                                status: value
                                            }))}
                                        >
                                            <SelectTrigger className="w-[180px]">

                                                <SelectValue placeholder={todo.status} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>status</SelectLabel>
                                                    <SelectItem value="todo">todo</SelectItem>
                                                    <SelectItem value="in-progress">in-progress</SelectItem>
                                                    <SelectItem value="completed">completed</SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>



                                    </TableCell>
                                    <TableCell >{todo.priority}</TableCell>
                                </TableRow>
                            )
                            )
                        }

                    </TableBody>
                </Table>}
        </div>
    )
}



