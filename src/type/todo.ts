export type ITodoStatus = 'todo' | 'completed';
export type ITodoCategory = 'work' | 'personal' | 'home';
export type ITodoPriority = 'low' | 'medium' | 'high';
export type filterValues = 'all' | 'low' | 'medium' | 'high' | 'work' | 'personal' | 'home' | 'work' | 'personal' | 'home' | 'todo' | 'completed';
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
    key: string; title?: string; dueDate?: string; description?: string; status?: ITodoStatus; priority?: ITodoPriority, category?: ITodoCategory
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

