import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    handleDeleteTodo, 
    handleNewTodo, 
    handlePriority, 
    handleUpdateTodo, 
    deleteAllTasks, 
    toggleTaskCheck,
    setAllTaks
} from "@/store/actions/todoActions";
import { getPagination } from "@/utils/pagination";
import { RootState } from "@/store/store";

export const useTodoList = () => {
    const tasks = useSelector((state: RootState) => state.todo.tasks);

    const [ newTask, setNewTask ] = useState<string>('');
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ priority, setPriority ] = useState<string>('All');
    const [ completes, setCompletes ] = useState<string>('all'); 
    const [ selectedSort, setSelectedSort ] = useState<string>('');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ tasksPerPage ] = useState<number>(6);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks') || '[]';
        setAllTaks(JSON.parse(storedTasks), dispatch);
    }, []);

    
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchedTerm = task.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPriority = priority === 'All' || task.priority === priority;
    
            const matchesCompletes = completes === 'all'
                ? true
                : completes === 'completed'
                ? task.is_completed
                : !task.is_completed;
    
            return matchedTerm && matchesPriority && matchesCompletes;
        });
    }, [tasks, priority, searchTerm, completes]);


    const sortedTasks = useMemo(() => {
        return filteredTasks.sort((a, b) => {
            const priorityOrder: Record<string, number> = {
                'High': 1,
                'Med': 2,
                'Low': 3,
            };
    
            if (selectedSort === '') return 0;
            
            if (selectedSort === 'Low') {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
    
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }, [filteredTasks, selectedSort]);
    

    const paginatedItems = getPagination(sortedTasks, currentPage, tasksPerPage);
    
    useEffect(() => {
        const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

        if (currentPage > totalPages && sortedTasks.length !== 0) {
            setCurrentPage(totalPages);
        }

    }, [sortedTasks, currentPage, tasksPerPage]);


    const addTodo = useCallback(() => {
        handleNewTodo(tasks, newTask, setNewTask, dispatch);
    }, [tasks, newTask, dispatch]);

    const deleteTodo = useCallback((id: number) => {
        handleDeleteTodo(id, dispatch);
    }, [tasks]);

    const selectPriority = useCallback((id: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        handlePriority(id, e, dispatch);
    }, [dispatch]);

    const updateTodo = useCallback((id: number, title: string) => {
        handleUpdateTodo(id, title, dispatch);
    }, [dispatch]);

    const deleteAllTodo = useCallback(() => {
        deleteAllTasks(dispatch);
    }, [dispatch]);

    const handleSortTask = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSort(e.target.value);
    }, []);
    
    const toggleCheck = useCallback((id:number) => {
        toggleTaskCheck(id, dispatch)
    }, []);

    const getTaskById = (id:number) => {
        return sortedTasks.find(task => task.id === id)
    }

    return {
        addTodo,
        deleteTodo,
        selectPriority,
        updateTodo,
        deleteAllTodo,
        getTaskById,
        setNewTask,
        newTask,
        toggleCheck,
        tasks,
        searchTerm,
        setSearchTerm,
        priority,
        setPriority,
        completes,
        setCompletes,
        selectedSort,
        setSelectedSort,
        filteredTasks: paginatedItems,
        currentPage,
        setCurrentPage,
        totalPages: Math.ceil(sortedTasks.length / tasksPerPage),
        handleSortTask
    };
}