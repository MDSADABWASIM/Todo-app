import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import ShortUniqueId from "short-unique-id";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "tasks";

export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onItemPressed: (id: string) => void;
  onDeletePressed: (id: string) => void;
  onAddPressed: (title: string) => Task | undefined;
};

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => { },
  onItemPressed: () => { },
  onDeletePressed: () => { },
  onAddPressed: () => undefined,
});

const dummyTasks: Task[] = [
  {
    id: "1",
    title: "Create a todo app",
    isCompleted: true,
  },
];

const TaskContextProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [isLoaded, setisLoaded] = useState<Boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [tasks]);

  async function saveData() {
    if (!isLoaded) {
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      Alert.alert("Error while saving data!");
    }
  }

  async function loadData() {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue) {
        const loadedTasks = JSON.parse(jsonValue);
        setTasks(loadedTasks);
      }
    } catch (error) {
      Alert.alert("Error while loading data!");
    } finally {
      setisLoaded(true);
    }
  }

  function onItemPressed(id: string) {
    setTasks((currentTasks) => {
      return currentTasks.map((task) =>
        task.id !== id ? task : { ...task, isCompleted: !task.isCompleted },
      );
    });
  }

  function onDeletePressed(id: string) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== id);
    });
  }

  function onAddPressed(title: string) {
    const uuid = new ShortUniqueId();
    const newTodo: Task = {
      id: uuid.rnd(),
      title: title,
      isCompleted: false,
    };
    setTasks((currentTasks) => [...currentTasks, newTodo]);
    return newTodo;
  }

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, onItemPressed, onDeletePressed, onAddPressed }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);

export default TaskContextProvider;
