import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITodos, ITodoAdd, ITodoUpdate, ITodoRemove } from "./../../type/todo"

const initialState: ITodos = {
    value: [{
        key: "11",
        title: "assigment",
        description: "assigment regarding company",
        status: "todo",
        category: "work",
        createdAt: "",
        dueDate: "4th september  "
    }]
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
        },
        upadteTodo: (state, action: PayloadAction<ITodoUpdate>) => {
            const index = state.value.findIndex(todo => todo.key === action.payload.key)
            const { key, ...updatedFields } = action.payload
            if (index !== -1) {
                state.value[index] = { ...state.value[index], ...updatedFields }
            }
        },
        removeTodo: (state, action: PayloadAction<ITodoRemove>) => {
            if (state.value !== null) {
                state.value = state.value.filter((todo) => todo.key !== action.payload.key)
            }

        },
    },
})

// Action creators are generated for each case reducer function
export const { addTodo, upadteTodo, removeTodo } = todoSlice.actions

export default todoSlice.reducer