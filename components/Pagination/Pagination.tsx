import React from "react";
import { Pagination, Button } from "@nextui-org/react";

export default function PaginationTodo({currentPage, totalPages, setCurrentPage}: any) {

	return (
		<div>
			<p className="text-small text-default-500">Selected Page: {currentPage}</p>
			<div className="flex items-center space-x-2">
				<Button
					size="sm"
					variant="flat"
					color="secondary"
					disabled={currentPage === 1}
					onPress={() => setCurrentPage((prev:any) => (prev > 1 ? prev - 1 : prev))}
				>
					Previous
				</Button>
				<div className="">
					<Pagination
						total={totalPages}
						color="secondary"
						page={currentPage}
						onChange={setCurrentPage}
					/>
				</div>

				<Button
					size="sm"
					variant="flat"
					color="secondary"
					disabled={currentPage === totalPages}
					onPress={() => setCurrentPage((prev:any) => (prev < totalPages ? prev + 1 : prev))}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
