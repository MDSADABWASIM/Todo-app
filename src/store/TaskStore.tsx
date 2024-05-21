import AsyncStorage from "@react-native-async-storage/async-storage";
import ShortUniqueId from "short-unique-id";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { STORAGE_KEY, dummyTasks } from "../utils";

type TaskStoreType = {
  tasks: Task[];
  numberOfTasks: () => number;
  numberOfCompletedTasks: () => number;
  onItemPressed: (id: string) => void;
  onDeletePressed: (id: string) => void;
  onAddPressed: (title: string) => void;
};
export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export const useTaskStore = create(
  persist<TaskStoreType>(
    (set, get) => ({
      tasks: dummyTasks,
      numberOfTasks: () => get().tasks.length,
      numberOfCompletedTasks: () =>
        get().tasks.filter((t) => t.isCompleted).length,
      onAddPressed: (title: string) => {
        const uuid = new ShortUniqueId();
        const newTodo: Task = {
          id: uuid.rnd(),
          title: title,
          isCompleted: false,
        };
        set((state) => ({
          tasks: [...state.tasks, newTodo],
        }));
      },

      onItemPressed: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id !== id ? task : { ...task, isCompleted: !task.isCompleted },
          ),
        }));
      },

      onDeletePressed: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
