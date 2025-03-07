import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITodos, ITodosSlice, ITodoAdd, ITodoUpdate, ITodoRemove, ITodoAddstring, ITodoStatus, ITodoCategory, ITodoPriority, filterValues } from "./../../type/todo"
import getTodos from '../../helpers/todos/get-todos'
import setTodos from '../../helpers/todos/set-todos'
import { dummytodos } from './../../helpers/dummy-todos'
const todos: ITodos[] = getTodos()
const initialState: ITodosSlice = {
    value: todos
}
export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addDummyTodos: (state,) => {
            const todos: ITodos[] = dummytodos
            state.value = todos
            setTodos(state.value)
        },
        getDataaction: (state,) => {
            const dummytodos: ITodos[] = getTodos()
            state.value = dummytodos
            setTodos(state.value)
        },
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
                const selectedFilters = action.payload;
                const todos: ITodos[] = getTodos()
                const initialTodos = todos;
                if (selectedFilters.length === 0 || selectedFilters.includes('all')) {
                    state.value = initialTodos; // Reset to initial state
                    return;
                }
                state.value = initialTodos.filter((todo) => selectedFilters.includes(todo.status))

            }
        }

    }
})

// Action creators are generated for each case reducer function
export const { getDataaction, addDummyTodos, addTodo, removeTodo, updateTodo, filterTodosReducer } = todoSlice.actions

export default todoSlice.reducer