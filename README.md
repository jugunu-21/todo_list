# Todo-Blink

A modern, feature-rich todo list application built with React and TypeScript, featuring a beautiful UI powered by Shadcn/UI and Tailwind CSS.

![Todo-Blink](public/logo192.png)

## 🌟 Features

- ✨ Modern and responsive UI with Shadcn/UI components
- 📱 Mobile-friendly design with slide-out forms
- 🎯 Task categorization (Work, Personal, Home)
- 🚦 Priority levels (High, Medium, Low)
- 📅 Due date scheduling with date picker
- 🔄 Task status management (Todo, In Progress, Completed)
- 👤 User authentication system
- 🎨 Beautiful animations with Framer Motion
- 📊 Task filtering and organization
- 🔔 Toast notifications for actions
- 📱 Responsive design for all screen sizes

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: 
  - Tailwind CSS
  - Shadcn/UI Components
  - Framer Motion for animations
- **Routing**: React Router DOM v7
- **UI Components**:
  - Radix UI primitives
  - React Hot Toast for notifications
  - React Day Picker for date selection
- **State Management**: 
  - Redux Toolkit for global state
  - Zustand for local state

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/jugunu-21/todo_list.git
cd todo_list
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication related components
│   ├── todos/         # Todo-specific components
│   └── ui/            # Shadcn UI components
├── features/          # Redux features/slices
├── helpers/          # Helper functions and utilities
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── redux/            # Redux store configuration
├── routes/           # Route definitions
└── types/            # TypeScript type definitions
```

## 🌐 Deployment

The application is deployed on Vercel and can be accessed at: [https://todo-list-smoky-two.vercel.app/](https://todo-list-smoky-two.vercel.app/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🔗 Links

- [Live Demo](https://todo-list-smoky-two.vercel.app/)
- [GitHub Repository](https://github.com/jugunu-21/todo_list)
