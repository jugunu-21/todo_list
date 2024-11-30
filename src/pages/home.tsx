import React, { useState } from 'react';
// import { useDispatch, UseDispatch, useSelector } from 'react-redux';
// import { addTodo, upadteTodo, removeTodo } from '../features/todos/todo-slice';
// import { RootState } from '../redux/store';

import { Button } from '../components/ui/button';
import TodosForm from '../component/todos/todos-form';
const Home: React.FC = () => {
    return (<main className=" border-2 h-[100vh] m-4">
        <div className="flex justify-end">
            <a className="px-2 py-1 m-3 bg-slate-300 rounded-md hover:bg-slate-400 focus:bg-slate-500" href="/signout">Logout</a>
        </div>
        <Button className='border-amber-700 border-2'>ghbut</Button>
        <div className=' border-2 md:grid grid-cols-12'>
            <div className=' col-span-4 border-2 m-4'>



                <TodosForm />

            </div>
            <div className=' col-span-8 border-2'>bjhk</div>
        </div>
    </main>
    )
}
export { Home }