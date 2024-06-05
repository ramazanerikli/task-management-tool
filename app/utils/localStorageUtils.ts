import Task from "@/types/Task";

export const saveToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};