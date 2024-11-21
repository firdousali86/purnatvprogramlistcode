import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getCurrentTimePosition, SLOT_WIDTH } from "../utils";

const CurrentTimeMarker = () => {
  const [currentPosition, setCurrentPosition] = useState(
    getCurrentTimePosition
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition(getCurrentTimePosition());
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View
      style={[
        styles.currentTimeMarker,
        { left: currentPosition, position: "absolute" },
      ]}
    />
  );
};

export default CurrentTimeMarker;

const styles = StyleSheet.create({
  currentTimeMarker: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "red",
  },
});
