/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: this.backgroundColors,
    };
  }
  render() {
    // Set the screen title to the user name entered in the start screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    let bgColor = this.props.route.params.bgColor;
    return (
      <View style={[{ backgroundColor: bgColor }, styles.container]}>
        <Text style={styles.text}>Hello Chat!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#ffffff",
  },
});
