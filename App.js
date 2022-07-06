import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import * as Font from "expo-font";
import { Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
//두개의 Utility functions을 만들었음
// 한 배열을 넣어서 다른배열을 받고있음
const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));//font들을 한번에 불러오고 싶을때 font는 Promise의 배열들이 될꺼임 

const loadImages = (images) =>//string을 가져온다면 prefatch를 사용하고 그게아니라면 assets API 사용함
//init db, get user avat, count notification같은 미리 받아오고 싶은것들이 있다면 함수를 만드는것이 사용자입장에서 좋다
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });
export default function App() {
  const [assets] = useAssets([require("./high.jpg")]);//이렇게하면 코드가 짧아지지만 원격 이미지를 불러올때 prefatch가 안됌
  const [loaded] = Font.useFonts(Ionicons.font);
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./my-face.jpeg"),
      "https://reactnative.dev/img/oss_logo.png",
    ]);
    await Promise.all([...fonts, ...images]);
  };
  if (!ready) {
    return (

      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}