/** @format */

import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import BackgroundImage from "../img/Background_Image.png";

export default class Start extends React.Component {
  //setting state for name and backgroundcolor
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: this.backgroundColors,
    };
  }
  // background colors the user can select
  backgroundColors = {
    black: "#090C08",
    lightGray: "#474056",
    lightBlue: "#8A95A5",
    lightGreen: "#B9C6AE",
  };
  // function to setState to change the backgroundcolor on user select of background
  changeColor = (selectedColor) => {
    this.setState({ bgColor: selectedColor });
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.title}>Chat app</Text>

          <View style={styles.box}>
            {/* Input box to set user name passed to chat screen */}
            <TextInput
              onChangeText={(text) => this.setState({ name: text })}
              value={this.state.name}
              style={styles.input}
              placeholder="Your name..."
            />
            {Platform.OS === "android" ? (
              <KeyboardAvoidingView behavior="height" />
            ) : null}
            {/* Allow user to choose a background color for the chat screen */}
            <View style={styles.colorSelection}>
              <Text style={styles.text}>Choose a Background Color</Text>

              <View style={styles.colorAvatars}>
                <TouchableOpacity
                  style={styles.black}
                  onPress={() => this.changeColor(this.backgroundColors.black)}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={styles.lightGray}
                  onPress={() =>
                    this.changeColor(this.backgroundColors.lightGray)
                  }
                ></TouchableOpacity>
                <TouchableOpacity
                  style={styles.lightBlue}
                  onPress={() =>
                    this.changeColor(this.backgroundColors.lightBlue)
                  }
                ></TouchableOpacity>
                <TouchableOpacity
                  style={styles.lightGreen}
                  onPress={() =>
                    this.changeColor(this.backgroundColors.lightGreen)
                  }
                ></TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              title="Go to Chat"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#ffffff",
  },

  box: {
    width: "88%",
    backgroundColor: "white",
    alignItems: "center",
    height: "60%",
    justifyContent: "space-evenly",
  },

  input: {
    height: 50,
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  text: {
    color: "#757083",
    fontSize: 16,
    fontWeight: "300",
  },

  colorAvatars: {
    width: "88%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  button: {
    height: 50,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttontext: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Colors

  black: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  lightGray: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  lightBlue: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  lightGreen: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
