export type ITodoStatus = 'todo' | 'in-progress' | 'completed';
export type ITodoCategory = 'personal' | 'office' | 'profession';
export type ITodoPriority = 'low' | 'medium' | 'high';
export interface ITodos {
    key: string;
    title: string;
    description: string;
    status: ITodoStatus;
    category: ITodoCategory;
    priority: ITodoPriority,
    createdAt: string;
    dueDate: string;
};

export interface ITodosSlice {
    value: ITodos[]
}
export interface ITodoUpdate {
    key: string; title?: string; dueDate?: Date; description?: string; status?: ITodoStatus; priority?: ITodoPriority, category?: ITodoCategory
}
export interface ITodoRemove {
    key: string
}
export interface ITodoAdd {
    title: string;
    description: string;
    category: ITodoCategory;
    priority: ITodoPriority;
    dueDate: Date;
}
export interface ITodoAddstring {
    title: string;
    description: string;
    category: ITodoCategory;
    priority: ITodoPriority;
    dueDate: string;
}
export interface IuserTodos {
    key: string;
    todos: ITodos;
}

