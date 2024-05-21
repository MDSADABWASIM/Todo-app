import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  taskTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "dimgrey",
  },
  taskContainer: {
    padding: 8,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  container: {
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
  noteStyle: {
    padding: 16,
    marginTop: 50,
    fontSize: 16,
    alignSelf: "center",
    backgroundColor: "lightyellow",
    borderWidth: 1,
    borderColor: "dimgrey",
    borderRadius: 8,
  },
});

export default styles;
