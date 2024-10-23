import { useTodoList } from "@/hooks/useTodoList"

export default function Navbar() {

    const { deleteAllTodo, tasks } = useTodoList()

    return (
        <div className="bg-[#1E293B] p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-gray-100 font-bold text-xl">Lista de tareas</h1>
                <button 
                    className="bg-red-500 rounded-lg p-2"
                    disabled={tasks.length === 0}
                    onClick={deleteAllTodo}
                >
                    Eliminar todo
                </button>
            </div>
        </div>
    )
}