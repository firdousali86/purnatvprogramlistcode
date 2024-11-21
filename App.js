import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { useRef } from "react";
import TimeMarkers from "./components/TimeMarkers";
import ChannelRow from "./components/ChannelRow";
import CurrentTimeMarker from "./components/CurrentTimeMarker";
import { channels } from "./data";

export default function App() {
  const timeScrollRef = useRef(null);
  const contentScrollRef = useRef([]);

  const syncScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    // Scroll all channel lists to match the time marker
    contentScrollRef.current.forEach((ref) => {
      if (ref && ref.scrollTo) {
        ref.scrollTo({ x: offsetX, animated: false });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        style={styles.timeMarkersContainer}
        contentContainerStyle={styles.timeMarkersContent}
        onScroll={syncScroll}
        scrollEventThrottle={16}
        ref={timeScrollRef}
      >
        <TimeMarkers />
      </ScrollView>
      {/* Channels List (Vertical scrollable) */}
      <ScrollView
        style={styles.channelList}
        contentContainerStyle={styles.channelListContent}
      >
        {channels.map((channel, index) => (
          <ChannelRow
            key={index}
            channel={channel}
            scrollRef={(el) => (contentScrollRef.current[index] = el)}
          />
        ))}
      </ScrollView>

      {/* Current Time Marker */}
      <CurrentTimeMarker />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  timeMarkersContainer: { height: 40, backgroundColor: "#f0f0f0" },
  timeMarkersContent: { flexDirection: "row" },
});
