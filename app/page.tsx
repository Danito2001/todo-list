'use client';

import { NonTask } from "@/components/NonTask";
import { PaginationTodo } from "@/components/Pagination";
import { TodoTask } from "@/components/TodoTask";
import { useTodoList } from "@/hooks/useTodoList";
import { Priority } from "@/types/Task";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";

export default function Main() {
	
	const {
		addTodo,
		newTask,
		setNewTask,
		completes,
		setCompletes,
		priority,
		setPriority,
		searchTerm,
		setSearchTerm,
		filteredTasks,
		currentPage,
		selectedSort,
        setCurrentPage,
        totalPages,
		handleSortTask,
	} = useTodoList();
	

	const handleSubmit = (e:React.FormEvent) => {
		e.preventDefault();
		addTodo()
	}	

	const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCompletes(event.target.value)
    };

	return (
		<div className="flex flex-col p-2 space-y-4 min-h-svh">
			<form onSubmit={handleSubmit} className="flex flex-col items-center w-full space-y-4">
				<Input
					type="text"
					placeholder="Buscar tarea"
					value={searchTerm}
					className="border border-black rounded-lg w-1/2"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
				/>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
					<Input
						type="text"
						placeholder="Agrega la tarea"
						value={newTask}
						className="border border-black rounded-lg"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
					/>
					<Button
						type="submit"
						className="border border-black rounded-lg bg-[#A5F3FC]">
						Añadir tarea
					</Button>
					<Select
						placeholder="Filtra por prioridad"
						value={priority}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value)}
					>
						<SelectItem key={"All"} value="All">Todos</SelectItem>
						<SelectItem key={"High"} value="High">Alto</SelectItem>
						<SelectItem key={"Med"} value="Med">Medio</SelectItem>
						<SelectItem key={"Low"} value="Low">Bajo</SelectItem>
					</Select>
					<Select
						placeholder="Filtra por completados"
						value={completes}
						onChange={handleFilterChange}
					>
						<SelectItem key={"all"} value="all">Todos</SelectItem>
						<SelectItem key={"completed"} value="completed">Completados</SelectItem>
						<SelectItem key={"notCompleted"} value="notCompleted">No completados</SelectItem>
					</Select>
				</div>
			</form>
			<Select
				placeholder="Ordenar por prioridad"
				value={selectedSort}
				onChange={handleSortTask}
			>
				<SelectItem key={"High"} value={"High"}>Mayor a menor</SelectItem>
				<SelectItem key={"Low"} value={"Low"}>Menor a mayor</SelectItem>
			</Select>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
				{
					(filteredTasks.length !== 0)
					? (filteredTasks.map(task => (
							<TodoTask
								key={task.id}
								id={task.id}
								title={task.title}
								is_completed={task.is_completed}
								date={task.date}
								priority={task.priority as Priority}
							/>
						)))
					: <NonTask/>
				}
			</div>
			<div className="flex items-center justify-center">
				<PaginationTodo 
					currentPage={currentPage} 
					setCurrentPage={setCurrentPage} 
					totalPages={totalPages}
				/>
			</div>
		</div>
	);
}
