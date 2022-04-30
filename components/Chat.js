/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Platform, KeyboardAvoidingView } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    };
    //information for the database
    const firebaseConfig = {
      apiKey: "AIzaSyDi7zv3zTjYwrEyzT_hyIOYKOWUrggymwg",
      authDomain: "chat-app-8ad7c.firebaseapp.com",
      projectId: "chat-app-8ad7c",
      storageBucket: "chat-app-8ad7c.appspot.com",
      messagingSenderId: "639960482069",
      appId: "1:639960482069:web:2cea5680b98972d40e291c",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //refernces the database
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    //  takes the entered username from start.js assigned to a variable "name"
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    // user authentication
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        },
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.locaiton || null,
      });
    });
    this.setState({
      messages: messages,
    });
  };
  //adding messages to the database
  addMessages() {
    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
      }
    );
  }

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribe();
  }
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  }
  render() {
    // Set the screen title to the user name entered in the start screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    let bgColor = this.props.route.params.bgColor;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bgColor,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.name,
            avatar: this.state.user.avatar,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
