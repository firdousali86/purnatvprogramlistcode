import { ScrollView, Text, StyleSheet, View } from "react-native";
import { SLOT_WIDTH } from "../utils/index.js";
import CurrentTimeMarker from "./CurrentTimeMarker.js";

const TimeMarkers = () => {
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2)
      .toString()
      .padStart(2, "0");
    const minutes = (i % 2 === 0 ? "00" : "30").padStart(2, "0");
    return `${hours}:${minutes}`;
  });

  return (
    <View style={styles.timeMarkers}>
      {timeSlots.map((time, index) => (
        <View style={styles.timeMarkerView}>
          <Text key={index} style={styles.timeMarkerText}>
            {time}
          </Text>
        </View>
      ))}
      <CurrentTimeMarker />
    </View>
  );
};

export default TimeMarkers;

const styles = StyleSheet.create({
  timeMarkers: { flexDirection: "row" },
  timeMarkerView: {
    width: SLOT_WIDTH,
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  timeMarkerText: {
    textAlign: "center",
    fontSize: 12,
  },
});
