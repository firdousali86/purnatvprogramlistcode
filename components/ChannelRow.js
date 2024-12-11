import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import CurrentTimeMarker from "./CurrentTimeMarker";
import { SLOT_WIDTH } from "../utils";

const calculateProgramPosition = (startTime, duration) => {
  // Parse start time
  const [time, modifier] = startTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Calculate left position and width
  const startSlot = hours * 2 + (minutes >= 30 ? 1 : 0); // Slot index
  const left = startSlot * SLOT_WIDTH;
  const width = (duration / 30) * SLOT_WIDTH;

  return { left, width };
};

const ChannelRow = ({ channel, scrollRef, onChannelScroll }) => {
  return (
    <View style={styles.channelRow}>
      <Text style={styles.channelName}>{channel.name}</Text>
      <ScrollView
        horizontal
        style={styles.programContainer}
        ref={scrollRef}
        scrollEnabled={Platform.OS == "ios"} // Disable direct horizontal scrolling
        onScroll={onChannelScroll}
        showsHorizontalScrollIndicator={false}
      >
        {/* Background placeholder view */}
        <View style={styles.placeholder}>
          {Array.from({ length: 48 }).map((_, index) => (
            <View key={index} style={styles.placeholderSlot} />
          ))}
        </View>

        {/* Absolute positioned program blocks */}
        {channel.programs.map((program, index) => {
          const { left, width } = calculateProgramPosition(
            program.startTime,
            program.duration
          );

          return (
            <View
              key={index}
              style={[
                styles.programBlock,
                { left, width, position: "absolute" },
              ]}
            >
              <Text style={styles.programName}>{program.name}</Text>
              <Text style={styles.programTime}>
                {program.startTime} ({program.duration} mins)
              </Text>
            </View>
          );
        })}

        <CurrentTimeMarker />
      </ScrollView>
    </View>
  );
};

export default ChannelRow;

const styles = StyleSheet.create({
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  channelName: {
    width: SLOT_WIDTH,
    fontWeight: "bold",
    textAlign: "center",
  },
  programContainer: {
    flex: 1,
    height: 50,
    position: "relative", // Enables absolute positioning for children
  },
  placeholder: {
    flexDirection: "row",
    width: SLOT_WIDTH * 48, // Total width for 24 hours
    height: "100%",
    // position: "absolute", // Stays below program blocks
  },
  placeholderSlot: {
    width: SLOT_WIDTH,
    height: "100%",
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  programBlock: {
    height: 50,
    backgroundColor: "#eaeaea",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  programName: {
    fontSize: 12,
    textAlign: "center",
  },
  programTime: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
});
