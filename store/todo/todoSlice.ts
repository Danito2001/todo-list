import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Task {
    id: number;
    title: string;
    is_completed: boolean;
    date: Date | string;
    priority: string;
}
  
interface TodoState {
    tasks: Task[]
}
  
const initialState: TodoState = {
    tasks: []
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodos: (state, action:PayloadAction<{tasks: Task[]}>) => {
            state.tasks = action.payload.tasks
        },
        addTodo: (state, action:PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        },
        activeTodo: (state, action:PayloadAction<[]>) => {
            state.tasks = action.payload
        },
        deleteTodoById: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        changePriority: (state, action:PayloadAction<{id: number, priority: string}>) => {
            const task = state.tasks.find( task => task.id === action.payload.id)
            if (task) {
                task.priority = action.payload.priority
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTodo: (state, action: PayloadAction<{id:number, title: string}>) => {
            const task = state.tasks.find( task => task.id === action.payload.id)
            if (task) {
                task.title = action.payload.title
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteAllTodos: (state) => {
            state.tasks = [];
        },
        toggleCompleted: (state, action: PayloadAction<{id:number}>) => {
            const task = state.tasks.find( task => task.id === action.payload.id)
            if (task) {
                task.is_completed = !task.is_completed
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }   
    },
})

// Action creators are generated for each case reducer function
export const { setTodos, addTodo, deleteTodoById, changePriority, updateTodo, deleteAllTodos, toggleCompleted } = todoSlice.actions

export default todoSlice.reducer