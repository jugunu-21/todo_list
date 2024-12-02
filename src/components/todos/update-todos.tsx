import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../../features/todos/todo-slice";
import { Button } from "../../components/ui/button";
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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { motivationalQuotes } from "../../helpers/quotes"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { DatePicker } from "./data-picker";
import { ITodoAddstring, ITodoCategory, ITodoPriority, ITodos } from "@/type/todo";
import toast from "react-hot-toast";
import { SiComma } from "react-icons/si";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
export function Updatecard({ todos, sheetOpen, setSheetOpen }: { todos: ITodos, sheetOpen?: boolean, setSheetOpen: ((n: boolean) => void) }) {

    const dispatch = useDispatch();
    const [dueDate, setDueDate] = React.useState<Date>(new Date(todos.dueDate));
    const [title, setTitle] = React.useState<string>(todos.title);
    const [description, setDescription] = React.useState<string>(todos.description);
    const [category, setCategory] = React.useState<ITodoCategory>(todos.category);
    const [priority, setPriority] = React.useState<ITodoPriority>(todos.priority);
    const handleSubmituUpdate = () => {
        if (!title) {
            toast.error("Title is required");
            return;
        }

        if (!dueDate) {
            toast.error("Due date is required");
            return;
        }
        if (!description) {
            toast.error("Description is required");
            return;
        }
        if (!category) {
            toast.error("Category is required");
            return;
        }
        if (!priority) {
            toast.error("priority is required");
            return;
        }
        dispatch(updateTodo({
            dueDate: dueDate.toISOString(),
            title,
            description,
            category,
            priority, // Adjust if ITodoCategory has different properties
            key: todos.key,
            status: todos.status
        }));
        setSheetOpen(false)
        setTitle('');
        setDescription('');
        setPriority('low');
        setDueDate(new Date());
    };
    return (
        <Card className=" ">
            <CardHeader>
                <CardTitle>Update Todos</CardTitle>
            </CardHeader>
            <CardContent className=" grid">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmituUpdate();
                }}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                placeholder="Task description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="due_date">Due Date</Label>
                            <DatePicker dueDate={dueDate} setDueDate={setDueDate} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                onValueChange={(value: ITodoCategory) => setCategory(value)}

                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder={category} />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="work">work</SelectItem>
                                    <SelectItem value="personal">personal</SelectItem>
                                    <SelectItem value="home">home</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                                onValueChange={(value: ITodoPriority) => setPriority(value)}

                            >
                                <SelectTrigger id="priority">
                                    <SelectValue placeholder={priority} />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="low">low</SelectItem>
                                    <SelectItem value="medium">medium</SelectItem>
                                    <SelectItem value="high">high</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-1">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={handleSubmituUpdate}>Update task </Button>
            </CardFooter>
        </Card>)
}