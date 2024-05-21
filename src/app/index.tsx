import { Stack } from "expo-router";
import React from "react";
import { FlatList, KeyboardAvoidingView, View, Text } from "react-native";
import NewTaskInput from "../components/newTaskInput";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskListItem from "../components/taskListItem";
import styles from "../components/styles";
import { useTask } from "../providers/taskContext";

export default function HomeScreen() {
  const { tasks } = useTask();

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Stack.Screen
        options={{
          title: "TODO",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <SafeAreaView edges={["bottom"]}>
        <FlatList
          data={tasks}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => <TaskListItem task={item} />}
          ListFooterComponent={() => (
            <View>
              <NewTaskInput />
              <Text style={styles.noteStyle}>Swipe left to delete a task</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
