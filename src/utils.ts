import { Task } from "./store/TaskStore";

export const STORAGE_KEY = "tasks";
export const dummyTasks: Task[] = [
  {
    id: "1",
    title: "Create a todo app",
    isCompleted: true,
  },
];
