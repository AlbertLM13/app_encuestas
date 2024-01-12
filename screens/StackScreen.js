import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StackScreen = () => {
  return (
    <View style={{flex:1}}>       

        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            marginTop: "20%",
          }}
        >
          Stack Screen 3
        </Text>

    </View>
  );
};

export default StackScreen;
