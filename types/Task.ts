export type Priority = 'High' | 'Med' | 'Low';

export interface Tasks {
    id: number;
    title: string;
    is_completed: boolean;
    date: Date | string;
    priority: Priority;
}
