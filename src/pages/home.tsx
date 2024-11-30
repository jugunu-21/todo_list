import React, { useState } from 'react';
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
import { IoIosAddCircleOutline } from "react-icons/io";
import { TodosListTable } from '../components/todos/todoslist-table';
const Home: React.FC = () => {
    const naviaget = useNavigate()
    const [sheetOpen, setSheetOpen] = useState<boolean>(false)
    return (<main className=" max-h-full overflow-y-hidden border-green-200 m-4">
        <div className="flex w-full  items-center justify-between p-3">
            <Button variant={"outline"} className='px-2 py-1 md:hidden' onClick={() => setSheetOpen(prev => !prev)}>Create Todos<IoIosAddCircleOutline /></Button>
            <div className='text-2xl font-semibold'>
                <div>Todos</div>
                <div className=' border-t-4  border-amber-500'></div>
            </div>
            <Button variant={"destructive"} className='px-2 py-1' onClick={() => naviaget("/signout")}>Logout</Button>
        </div>
        <div className='  md:grid md:grid-cols-3 h-[88vh] gap-1'>
            <div className='md:col-span-1 hidden md:block'>
                <CardWithForm />
            </div>
            <div className='md:col-span-2'>
                <TodosListTable />
            </div>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="left" >

                <div className=" overflow-y-auto w-full  h-full mt-4">

                    <CardWithForm sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />


                </div>
            </SheetContent>
        </Sheet>
    </main>
    )
}
export { Home }