import { ITodos } from '../../type/todo';
const priorityOrder: { [key: string]: number } = { high: 1, medium: 2, low: 3 };
function getFilterFunction(filterValue: string): (todos: ITodos[]) => ITodos[] {
    switch (filterValue) {
        case 'all':
            return (todos: ITodos[]) => todos;
        case 'FilterCompleted':
            return (todos: ITodos[]) => todos.filter(todo => todo.status === 'completed');
        case 'sortIncreasingPriority':
            return sortByPriority;
        case 'sortDecresingPriority':
            return (todos: ITodos[]) => sortByPriority(todos).reverse();
        case 'filterCategory':
            return (todos: ITodos[]) => todos.filter(todo => todo.category); // Adjust based on actual category filtering logic
        case 'filterprogress':
            return (todos: ITodos[]) => todos.filter(todo => todo.status === 'in-progress');
        default:
            throw new Error(`Unknown filter value: ${filterValue}`);
    }
}

// Function to filter and sort todos based on the provided filter value
export function filterAndSortTodos(todos: ITodos[], filterValue: string): ITodos[] {
    const filterFn = getFilterFunction(filterValue);
    return filterFn(todos);
}

// Sort by priority (ascending order)
const sortByPriority = (todos: ITodos[]): ITodos[] => {
    return [...todos].sort((a, b) => {
        const priorityA = priorityOrder[a.priority] || priorityOrder['medium'];
        const priorityB = priorityOrder[b.priority] || priorityOrder['medium'];
        return priorityA - priorityB;
    });
};

// Sort by due date (earliest first)
export const sortByDueDate = (todos: ITodos[]): ITodos[] => {
    return [...todos].sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
};

// Filter by status and sort by priority
export const filterAndSort = (todos: ITodos[], status: string): ITodos[] => {
    return todos
        .filter(todo => todo.status === status)
        .sort((a, b) => {
            const priorityA = priorityOrder[a.priority] || priorityOrder['medium'];
            const priorityB = priorityOrder[b.priority] || priorityOrder['medium'];
            return priorityA - priorityB;
        });
};

// Dynamic filter and sort by any key-value pair
export const dynamicSortAndFilter = (
    todos: ITodos[],
    filterBy: keyof ITodos,
    filterValue: string,
    sortBy: keyof ITodos
): ITodos[] => {
    return todos
        .filter(todo => todo[filterBy] === filterValue)
        .sort((a, b) => {
            if (a[sortBy] > b[sortBy]) return 1;
            if (a[sortBy] < b[sortBy]) return -1;
            return 0;
        });
};
