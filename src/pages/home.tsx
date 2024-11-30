import React, { useState } from 'react';
import { TodosTable } from '../components/todos/todos-table';
import { Button } from '../components/ui/button';
import { CardWithForm } from '../components/todos/add-todos-form'
import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
    const naviaget = useNavigate()
    return (<main className=" max-h-full border-green-200 m-4">
        <div className="flex w-full  items-center justify-between p-3">
            <div className='text-2xl font-semibold mx-auto'>
                <div>Todos</div>
                <div className=' border-t-4  border-amber-500'></div>
            </div>
            <Button className='px-2 py-1' onClick={() => naviaget("/signout")}>Logout</Button>
        </div>
        <div className='  md:flex h-[88vh] gap-1'>
            <div className=' col-span-4 '>
                <CardWithForm />
            </div>
            <div className=' w-full col-span-8 border-2 rounded-lg border-slate-200  '>
                <TodosTable />
            </div>
        </div>
    </main>
    )
}
export { Home }