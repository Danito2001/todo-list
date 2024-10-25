import { Tasks } from "@/types/Task";
import { 
    addTodo, 
    deleteTodoById, 
    updateTodo, 
    changePriority, 
    deleteAllTodos, 
    toggleCompleted,
    setTodos
} from "../todo/todoSlice";
import { AppDispatch } from "../store";

export const handleNewTodo = (
    tasks: Tasks[],
    setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>, 
    newTask: string,
    setNewTask: React.Dispatch<React.SetStateAction<string>>, 
    dispatch: AppDispatch

) => {

    const task:Tasks = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: newTask,
        is_completed: false,
        date: new Date().toISOString(),
        priority: 'Med'
    }

    if (newTask.length <= 1 ) return;

    const updatedTasks = [...tasks, task];

    setTasks(updatedTasks);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks) || '[]');

    dispatch(addTodo(task))

    setNewTask('');
}

export const handleDeleteTodo = (id:number, dispatch: AppDispatch) => {
    dispatch(deleteTodoById(id))
}

export const handlePriority = (id:number, e: React.ChangeEvent<HTMLSelectElement>, dispatch: AppDispatch) => {
    dispatch(changePriority({id, priority: e.target.value}))
}

export const handleUpdateTodo = (id:number, title: string, dispatch: AppDispatch) => {
    dispatch(updateTodo({id, title}))
}

export const deleteAllTasks = (dispatch: AppDispatch) => {
    localStorage.removeItem('tasks')
    dispatch(deleteAllTodos())
}

export const toggleTaskCheck = (id:number, dispatch: AppDispatch) => {
    dispatch(toggleCompleted({id}))
}

export const setAllTaks = (tasks:any, dispatch: AppDispatch) => {
    dispatch(setTodos({tasks: tasks}))
}
