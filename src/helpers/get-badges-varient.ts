import { ITodoCategory, ITodos, ITodoStatus, ITodoPriority } from '../type/todo'
export const getBadgeVariant = (value: ITodoStatus | ITodoCategory | ITodoPriority): string => {
    switch (value) {
        case 'todo':
            return 'bg-orange-500 hover:bg-orange-500'; // Tailwind class for blue text
        case 'completed':
            return '    bg-green-500   hover:bg-green-500 '; // Tailwind class for green text
        case 'work':
            return '    bg-purple-500  hover:bg-purple-500    '; // Tailwind class for purple text
        case 'personal':
            return '    bg-pink-500  hover:bg-pink-500    '; // Tailwind class for pink text
        case 'home':
            return '    bg-teal-500  hover:bg-teal-500    '; // Tailwind class for teal text
        case 'low':
            return '    bg-gray-500 hover:bg-gray-500     '; // Tailwind class for gray text
        case 'medium':
            return '    bg-yellow-500  hover:bg-yellow-500     '; // Tailwind class for yellow text
        case 'high':
            return '    bg-red-500  hover:bg--red-500    '; // Tailwind class for red text
        default:
            return '    bg-gray-700  hover:bg-gray-700    '; // Default text color
    }
};