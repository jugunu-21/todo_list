import React, { useEffect, useState } from 'react';
import { CardWithForm } from '../components/todos/add-todos-form'
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet"
import { MdOutlineNoteAdd } from "react-icons/md";
import { getDataaction, addDummyTodos } from "./../features/todos/todo-slice"
import { IoIosAddCircleOutline } from "react-icons/io";
import { TodosListTable } from '../components/todos/todoslist-table';
import { UserIcon } from '../components/auth/user-icon';
import { useDispatch } from 'react-redux';
import getTodos from '../helpers/todos/get-todos';
import { TODOS_KEY, SESSION_USERS_KEY } from "./../helpers/storage-keys";
import { IUser } from '@/type/auth';
import { useCurrentUser } from '../helpers/zustand';
const Home: React.FC = () => {


    const dispatch = useDispatch();
    const { setCurrentUserwithoutprops } = useCurrentUser()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const timer = setTimeout(() => {
            }, 2000);
            setCurrentUserwithoutprops()
            dispatch(getDataaction());
            console.log("render")
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    const naviaget = useNavigate()
    const [sheetOpen, setSheetOpen] = useState<boolean>(false)
    return (<main className="grid container max-w-full min-h-[60vh] p-2">
        <div className="flex w-full  items-center justify-between p-3">
            <Button className='px-2 py-1 md:hidden' onClick={() => setSheetOpen(prev => !prev)}>Create Todos<IoIosAddCircleOutline /></Button>
            <div className='sm:text-2xl font-semibold'>
                <div>Todo-Blink</div>
                <div className=' border-t-4  border-amber-500'></div>
            </div>
            <div className='flex justify-end gap-1 '>
                <div>
                    <Button
                        onClick={() => dispatch(addDummyTodos())}
                        variant={"secondary"}
                        className="flex  items-centerpx-2.5  hover:text-foreground rounded-lg"
                    >
                        <span className=" ">
                            Add  dummy toods
                        </span>

                        <MdOutlineNoteAdd className="h-5 w-5 text-foreground" />



                    </Button>

                </div>
                <div>
                    <UserIcon />
                </div>
            </div>
        </div>
        <div className=' grid container max-w-full md:grid md:grid-cols-3  gap-1'>
            <div className='md:col-span-1 hidden md:block'>
                <CardWithForm />
            </div>
            <div className='md:col-span-2  '>
                <TodosListTable />
            </div>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="left" >

                <div className=" overflow-y-auto w-full  mt-4">

                    <CardWithForm sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />


                </div>
            </SheetContent>
        </Sheet>

    </main>
    )
}
export { Home }
