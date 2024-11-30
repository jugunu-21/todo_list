import React, { useState } from 'react';
import { TodosTable } from '../components/todos/todos-table';
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
const Home: React.FC = () => {
    const naviaget = useNavigate()
    const [sheetOpen, setSheetOpen] = useState<boolean>(false)
    return (<main className=" max-h-full border-green-200 m-4">
        <div className="flex w-full  items-center justify-between p-3">
            <Button variant={"outline"} className='px-2 py-1 md:hidden' onClick={() => setSheetOpen(prev => !prev)}>Create Todos<IoIosAddCircleOutline /></Button>
            <div className='text-2xl font-semibold'>
                <div>Todos</div>
                <div className=' border-t-4  border-amber-500'></div>
            </div>
            <Button variant={"destructive"} className='px-2 py-1' onClick={() => naviaget("/signout")}>Logout</Button>
        </div>
        <div className='  md:flex h-[88vh] gap-1'>
            <div className=' col-span-4 hidden md:block'>
                <CardWithForm />
            </div>
            <div className=' w-full col-span-8 border-2 rounded-lg border-slate-200  '>
                <TodosTable />
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