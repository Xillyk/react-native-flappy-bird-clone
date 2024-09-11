import { useEffect, useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import { Physics } from "./physic";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          margin: 30,
        }}
      >
        {" "}
        {points}
      </Text>
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(event) => {
          switch (event.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
              // setPoints(0);
              break;
            case "new_point":
              setPoints(points + 1);
              console.log(points);
              break;
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></GameEngine>
      {!running ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => {
              setRunning(true);
              gameEngine.swap(entities());
              setPoints(0);
            }}
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 30 }}>
              Start Game
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

// <StatusBar style="auto" hidden />
