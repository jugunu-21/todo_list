import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITodos, ITodosSlice, ITodoAdd, ITodoUpdate, ITodoRemove } from "./../../type/todo"
import getTodos from '../../helpers/todos.ts/get-todos'
import setTodos from '../../helpers/todos.ts/set-todos'
const todos: ITodos[] = getTodos()
const initialState: ITodosSlice = {
    value: todos
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodoAdd>) => {
            state.value.push({
                key: Date.now().toString(),
                title: action.payload.title,
                description: action.payload.description,
                status: "todo",
                category: action.payload.category,
                createdAt: new Date().toISOString(),
                dueDate: action.payload.dueDate
            })
            setTodos(state.value)
        },
        upadteTodo: (state, action: PayloadAction<ITodoUpdate>) => {
            const index = state.value.findIndex(todo => todo.key === action.payload.key)
            const { key, ...updatedFields } = action.payload
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
    },
})

// Action creators are generated for each case reducer function
export const { addTodo, upadteTodo, removeTodo } = todoSlice.actions

export default todoSlice.reducer