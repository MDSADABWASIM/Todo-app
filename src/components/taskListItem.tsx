import { Text, Pressable, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styles from "./styles";
import { Task, useTask } from "../providers/taskContext";

type TaskListItemType = {
  task: Task;
};

function rightActionComponet(onDeletePressed: () => void) {
  return (
    <View
      style={{
        backgroundColor: "red",
        alignSelf: "center",
      }}
    >
      <MaterialCommunityIcons
        onPress={onDeletePressed}
        name="delete"
        size={24}
        color="white"
      />
    </View>
  );
}
const TaskListItem = ({ task }: TaskListItemType) => {
  const { onItemPressed, onDeletePressed } = useTask();
  return (
    <GestureHandlerRootView>
      <Swipeable
        key={task.title}
        renderRightActions={() =>
          rightActionComponet(() => onDeletePressed(task.id))
        }
      >
        <Pressable
          onPress={() => onItemPressed(task.id)}
          style={styles.taskContainer}
        >
          <MaterialCommunityIcons
            name={
              task.isCompleted
                ? "checkbox-marked-circle"
                : "checkbox-blank-circle-outline"
            }
            size={24}
            color={task.isCompleted ? "grey" : "dimgrey"}
          />
          <Text
            style={[
              styles.taskTitle,
              {
                textDecorationLine: task.isCompleted ? "line-through" : "none",
              },
            ]}
          >
            {task.title}
          </Text>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default TaskListItem;
