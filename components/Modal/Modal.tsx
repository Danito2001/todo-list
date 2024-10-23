import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useTodoList } from "@/hooks/useTodoList";
import { formattedTitle } from "@/utils/formattedTitle";

interface ModalProps {
	id: number;
	title: string;
}

export default function App({ id, title }: ModalProps) {

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [newTitle, setNewTitle] = useState(title);
	const { updateTodo } = useTodoList()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (newTitle.length <= 1) return;
		updateTodo(id, newTitle)
	}

	return (
		<>
			<Button 
				className="bg-[#A5F3FC] border border-black rounded-lg" 
				onPress={onOpen}
			>
				Editar
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">{`Tarea a modificar: ${formattedTitle(title, 14)}`}</ModalHeader>
							<form onSubmit={handleSubmit}>
								<ModalBody>
									<Input
										type="text"
										label="Editar texto"
										value={newTitle}
										onChange={(e) => setNewTitle(e.target.value)}
									/>
								</ModalBody>
								<ModalFooter>
									<Button
										color="danger" 
										variant="light" 
										onPress={onClose}
									>
										Cerrar
									</Button>
									<Button 
										color="primary" 
										type="submit" 
										onPress={onClose} 
										disabled={newTitle.length <= 1}
									>
										Guardar
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
