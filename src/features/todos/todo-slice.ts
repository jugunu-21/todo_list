import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITodos, ITodosSlice, ITodoAdd, ITodoUpdate, ITodoRemove, ITodoAddstring, ITodoStatus, ITodoCategory, ITodoPriority, filterValues } from "./../../type/todo"
import getTodos from '../../helpers/todos/get-todos'
import setTodos from '../../helpers/todos/set-todos'
const todos: ITodos[] = getTodos()
const initialState: ITodosSlice = {
    value: todos
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodoAddstring>) => {
            const newTodo: ITodos = {
                key: Date.now().toString(),
                title: action.payload.title,
                description: action.payload.description,
                status: 'todo',
                category: action.payload.category,
                priority: action.payload.priority,
                createdAt: new Date().toISOString(),
                dueDate: action.payload.dueDate, // Should be a string in the correct format
            };

            if (state.value) {
                state.value.push(newTodo);
            } else {
                state.value = [newTodo];
            }

            setTodos(state.value)
            console.log("value", ...state.value);
        },
        updateTodo: (state, action: PayloadAction<ITodoUpdate>) => {
            const index = state.value.findIndex(todo => todo.key === action.payload.key)
            const updatedFields = {
                ...action.payload,

            };
            if (index !== -1) {
                state.value[index] = { ...state.value[index], ...updatedFields }
            }
            setTodos(state.value)
        },
        removeTodo: (state, action: PayloadAction<ITodoRemove>) => {
            if (state.value !== null) {
                state.value = state.value.filter((todo) => todo.key !== action.payload.key)
            }
            setTodos(state.value)
        },
        filterTodosReducer: (state, action: PayloadAction<string[]>) => {
            if (state.value) {
                const filterArray = action.payload;

                // Map filters to their corresponding properties

                const statusFilter = filterArray.includes('todo') ? 'status' : null;
                const priorityFilter = filterArray.includes('low') || filterArray.includes('medium') || filterArray.includes('high') ? 'priority' : null;
                const categoryFilter = filterArray.includes('work') || filterArray.includes('personal') || filterArray.includes('home') ? 'category' : null;

                // Apply filters based on the mapped properties
                state.value = state.value.filter(todo => {
                    let matchesAllCriteria = true;

                    if (statusFilter) {
                        matchesAllCriteria = matchesAllCriteria && todo[statusFilter] === filterArray.find(f => f === 'todo');
                    }


                    if (priorityFilter) {
                        matchesAllCriteria = matchesAllCriteria && todo[priorityFilter] === filterArray.find(f => ['low', 'medium', 'high'].includes(f));
                    }

                    if (categoryFilter) {
                        matchesAllCriteria = matchesAllCriteria && todo[categoryFilter] === filterArray.find(f => ['work', 'personal', 'home'].includes(f));
                    }

                    return matchesAllCriteria;
                });
            }

        },
    }
})

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, updateTodo, filterTodosReducer } = todoSlice.actions

export default todoSlice.reducer