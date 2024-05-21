import { View, TextInput } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { useTaskStore } from "../store/TaskStore";

export default function newTaskInput() {
  const [newTask, setNewTask] = useState<string>("");
  const onAddPressed = useTaskStore((state) => state.onAddPressed);

  return (
    <View style={styles.taskContainer}>
      <MaterialCommunityIcons
        name="checkbox-blank-circle-outline"
        size={24}
        color="black"
      />
      <TextInput
        style={styles.taskTitle}
        value={newTask}
        onChangeText={setNewTask}
        placeholder="Tap here to add new task"
        onSubmitEditing={() => {
          if (!newTask) {
            return;
          }
          onAddPressed(newTask);
          setNewTask("");
        }}
      />
    </View>
  );
}
