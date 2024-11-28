import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export type ITodoStatus = 'todo' | 'in progress' | 'completed';
export type ITodoCategory = 'work' | 'personal' | 'other';
export interface ITodos {
    value: Array<{
        key: string;
        title: string;
        description: string;
        status: ITodoStatus;
        category: ITodoCategory;
        createdAt: string;
        dueDate: string;
    }>;
}

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
        addTodo: (state, action: PayloadAction<{
            title: string;
            description: string;
            category: ITodoCategory;
            dueDate: string;
        }>) => {
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
        upadteTodo: (state, action: PayloadAction<{
            key: string; title?: string; dueDate?: string; description?: string; status?: ITodoStatus; category?: ITodoCategory
        }>) => {
            const index = state.value.findIndex(todo => todo.key === action.payload.key)
            const { key, ...updatedFields } = action.payload
            if (index !== -1) {
                state.value[index] = { ...state.value[index], ...updatedFields }
            }
        },
        removeTodo: (state, action: PayloadAction<{ key: string }>) => {
            if (state.value !== null) {
                state.value = state.value.filter((todo) => todo.key !== action.payload.key)
            }

        },
    },
})

// Action creators are generated for each case reducer function
export const { addTodo, upadteTodo, removeTodo } = todoSlice.actions

export default todoSlice.reducer