import React, { useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
import { useTodoList } from "@/hooks/useTodoList";

export default function CheckboxTask({id}: {id: number}) {
	
	const [isSelected, setIsSelected] = React.useState(false);
    const { toggleCheck, getTaskById } = useTodoList()

	useEffect(() => {
	  const task = getTaskById(id)
	  if (task) {
		setIsSelected(task.is_completed)
	  }
	}, [id, getTaskById])
	
	const handleToggle = () => {
		toggleCheck(id)
		setIsSelected( prevState => !prevState)
	}

	return (
		<div className="flex flex-col gap-2">
			<Checkbox color="default" isSelected={isSelected} onValueChange={handleToggle}>
				Completado
			</Checkbox>
		</div>
	);
}
