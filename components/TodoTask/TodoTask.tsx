import { useTodoList } from "@/hooks/useTodoList";
import { Tasks } from "@/types/Task";
import classNames from 'classnames';
import { formattedTitle } from "@/utils/formattedTitle";
import { ModalTodo } from "../Modal";
import CheckboxTask from "../Checkbox/Checkbox";

export default function TodoTask({ id, title, is_completed, date, priority }: Tasks) {

    const { deleteTodo, selectPriority } = useTodoList()

    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="bg-gray-100 shadow-lg rounded-lg border border-black">
            <div className="flex flex-col p-4">
                <div className="flex justify-between">
                    <div>
                        <h2 className={classNames('font-semibold', {'line-through': is_completed === true})}>{formattedTitle(title, 50)}</h2>
                        <span className="text-black/60 ">Fecha: {formattedDate}</span>
                    </div>
                    <CheckboxTask id={id}/>
                </div>
                <div className="flex justify-between pt-2">
                    <select
                        className={classNames(
                            'p-1 rounded-lg text-white',
                            {
                                'bg-red-500': priority === 'High',
                                'bg-orange-500': priority === 'Med',
                                'bg-green-500': priority === 'Low'
                            }
                        )}
						onChange={ (e) => selectPriority(id, e)}
                        value={priority}

                    >
                        {priority}
                        <option className="bg-red-500" value="High">Alto</option>
                        <option className="bg-orange-500" value="Med">Medio</option>
                        <option className="bg-green-500" value="Low">Bajo</option>
                    </select>
                    <div className="space-x-2">
                        <ModalTodo id={id} title={title}/>
                        <button 
                            className="bg-red-500 border border-black rounded-lg p-1"
                            onClick={ () => deleteTodo(id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
