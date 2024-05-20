import { Stack } from "expo-router";
import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, View, Text } from "react-native";
import NewTaskInput from "../components/newTaskInput";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskListItem from "../components/taskListItem";
import styles from "../components/styles";

export type Task = {
  title: string;
  isCompleted: boolean;
};

const dummyTasks: Task[] = [
  {
    title: "Create a todo app",
    isCompleted: true,
  },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);

  function onItemPressed(index: number) {
    setTasks((currentTasks) => {
      const updateTasks = [...currentTasks];
      updateTasks[index].isCompleted = !updateTasks[index].isCompleted;
      return updateTasks;
    });
  }

  function onDeletePressed(index: number) {
    setTasks((currentTasks) => {
      const updateTasks = [...currentTasks];
      updateTasks.splice(index, 1);
      return updateTasks;
    });
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Stack.Screen
        options={{
          title: "TODO",
          headerSearchBarOptions: {
            hideWhenScrolling: true,
          },
        }}
      />

      <SafeAreaView edges={["bottom"]}>
        <FlatList
          data={tasks}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item, index }) => (
            <TaskListItem
              task={item}
              onItemPressed={() => onItemPressed(index)}
              onDeletePressed={() => onDeletePressed(index)}
            />
          )}
          ListFooterComponent={() => (
            <View>
              <NewTaskInput
                onAdd={(newTodo: Task) =>
                  setTasks((currentTasks) => [...currentTasks, newTodo])
                }
              />
              <Text style={styles.noteStyle}>Swipe left to delete a task</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
