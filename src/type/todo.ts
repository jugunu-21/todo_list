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
export interface ITodoUpdate {
    key: string; title?: string; dueDate?: string; description?: string; status?: ITodoStatus; category?: ITodoCategory
}
export interface ITodoRemove {
    key: string
}
export interface ITodoAdd {
    title: string;
    description: string;
    category: ITodoCategory;
    dueDate: string;
}
export interface IuserTodos {
    key: string;
    todos: ITodos;
}

