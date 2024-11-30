import * as React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todos/todo-slice";
import { Button } from "../../components/ui/button";
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
import { ITodoAddstring, ITodoCategory, ITodoPriority } from "@/type/todo";
import toast from "react-hot-toast";
import { SiComma } from "react-icons/si";
import { useEffect, useState } from "react";

export function CardWithForm({ sheetOpen, setSheetOpen }: { sheetOpen?: boolean, setSheetOpen?: ((n: boolean) => void) }) {


    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const quotes = motivationalQuotes;
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) =>
                (prevIndex + 1) % quotes.length
            );
        }, 60000); // Change quote every 60 seconds (1 minute)

        return () => clearInterval(intervalId);
    }, [quotes]);

    const currentQuote = quotes[currentQuoteIndex];


    const dispatch = useDispatch();
    const [dueDate, setDueDate] = React.useState<Date>();
    const [title, setTitle] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [category, setCategory] = React.useState<ITodoCategory>();
    const [priority, setPriority] = React.useState<ITodoPriority>('low');
    const handleSubmit = () => {


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
        const formData: ITodoAddstring = {
            dueDate: dueDate.toISOString(),
            title,
            description,
            category,
            priority// Adjust if ITodoCategory has different properties
        };
        if (setSheetOpen !== undefined) {
            setSheetOpen(!sheetOpen);
        }
        console.log("FormData:", formData);
        dispatch(addTodo(formData));
        setTitle('');
        setDescription('');
        setPriority('low');
        setDueDate(new Date());
        setCategory(undefined);


    };

    return (<>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create Todos</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
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
                                    <SelectValue placeholder="Select a category" />
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
                                    <SelectValue placeholder="Select a priority" />
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
            <CardFooter className="flex justify-end">
                <Button onClick={handleSubmit}>Add Task</Button>
            </CardFooter>
        </Card>

        <div className=" m-2">
            <div className=" flex justify-start">
                <SiComma className=" transform scale-x-[-1] text-xl text-amber-600 " />
                <SiComma className=" text-xl transform scale-x-[-1]  text-amber-600" /></div>

            <div className="whitespace-pre-wrap font-medium text-lg pl-2">{" "}{" "}{" "}{" "}{" "}{currentQuote}</div>
            <div className="flex justify-end gap-0  text-amber-600">
                <SiComma className=" text-xl text-end" />
                <SiComma className=" text-xl text-end  text-amber-600" /></div>

        </div >


    </>
    );
}
