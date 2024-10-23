
export const getPagination = <T>(item: T[], currentPage: number, tasksPerPage: number): T[] => {

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return item.slice(indexOfFirstTask, indexOfLastTask);

};
