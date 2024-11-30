import React, { useState } from 'react';
import { TodosTable } from '../components/todos/todos-table';
import { Button } from '../components/ui/button';
import { CardWithForm } from '../components/todos/add-todos-form'
import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
    const naviaget = useNavigate()
    return (<main className=" border-2 max-h-full border-green-200 m-4">
        <div className="flex justify-end">
            <Button className='px-2 py-1 m-3' onClick={() => naviaget("/signout")}>Logout</Button>
        </div>
        <div className=' border-2 md:flex h-[88vh]'>
            <div className=' col-span-4 border-2 '>
                <CardWithForm />
            </div>
            <div className=' w-full col-span-8 border-2 border-red-400  '>
                <TodosTable />
            </div>
        </div>
    </main>
    )
}
export { Home }