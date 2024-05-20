import { View, TextInput } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Task } from "../app";
import styles from "./styles";

type newTask = {
  onAdd: (newTask: Task) => void;
};
export default function newTaskInput({ onAdd }: newTask) {
  const [newTask, setNewTask] = useState<string>("");

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
          onAdd({ title: newTask, isCompleted: false });
          setNewTask("");
        }}
      />
    </View>
  );
}

