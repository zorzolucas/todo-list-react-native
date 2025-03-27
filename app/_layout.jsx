import {
  Alert,
  Text,
  Image,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  FlatList,
} from "react-native";
import logo from "../assets/images/check.png";
import { colors } from "../constants/colors";
import Task from "../components/task";
import { useState } from "react";

const initialTasks = [
  { id: 1, completed: true, text: "fazer café" },
  { id: 2, completed: false, text: "lavar roupa" },
  { id: 3, completed: false, text: "academia" },
];

export default function RootLayout() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState("");

  const addTask = () => {
    const newTask = { id: tasks.length + 1, completed: false, text };
    setTasks([...tasks, newTask]);
    setText("");
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.rowContainer}>
        <Image style={style.image} source={logo} />
        <Text style={style.title}> To do List</Text>
      </View>
      <View style={style.rowContainer}>
        <TextInput style={style.input} onChangeText={setText} value={text} />
        <Pressable
          onPress={addTask}
          style={({ pressed }) => [
            style.button,
            { backgroundColor: pressed ? "blue" : colors.primary },
          ]}
        >
          <Text style={style.buttonText}> + </Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task text={item.text} initialCompleted={item.completed} />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 30,
    fontFamily: "Calibri",
    fontWeight: "600",
    color: colors.primary,
  },
  input: {
    height: 40,
    paddingHorizontal: 16,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    flexGrow: 1,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
  },
  mainContainer: {
    margin: 20,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
});
