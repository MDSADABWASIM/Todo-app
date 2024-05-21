import React from "react";
import { Stack } from "expo-router";
import TaskContextProvider from "../providers/taskContext";

export default function TodoLayout() {
  return (
    <TaskContextProvider>
      <Stack />
    </TaskContextProvider>
  );
}
