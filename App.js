import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRef } from "react";
import TimeMarkers from "./components/TimeMarkers";
import ChannelRow from "./components/ChannelRow";
import { getCurrentTimePosition, SLOT_WIDTH } from "./utils";

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

  const onChannelScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    timeScrollRef.current?.scrollTo({ x: offsetX, animated: false });

    // Scroll all channel lists to match the time marker
    contentScrollRef.current.forEach((ref) => {
      if (ref && ref.scrollTo) {
        ref.scrollTo({ x: offsetX, animated: false });
      }
    });
  };

  const NowButton = () => {
    return (
      <View style={styles.nowButtonContainer}>
        <TouchableOpacity
          style={styles.nowButton}
          onPress={() => scrollToCurrentTime()}
        >
          <Text style={styles.nowButtonText}>Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const scrollToCurrentTime = () => {
    const currentTimePosition = getCurrentTimePosition();

    // Scroll the time markers
    timeScrollRef.current?.scrollTo({
      x: currentTimePosition,
      animated: false,
    });

    // Scroll all channel program lists
    contentScrollRef.current.forEach((ref) => {
      ref?.scrollTo({ x: getCurrentTimePosition(), animated: false });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <NowButton />
        <ScrollView
          horizontal
          style={styles.timeMarkersContainer}
          contentContainerStyle={styles.timeMarkersContent}
          onScroll={syncScroll}
          scrollEventThrottle={16}
          ref={timeScrollRef}
          showsHorizontalScrollIndicator={false}
        >
          <TimeMarkers />
        </ScrollView>
      </View>

      {/* Channels List (Vertical scrollable) */}

      <FlatList
        data={channels}
        keyExtractor={(item, index) => `channel-${index}`}
        renderItem={({ item, index }) => (
          <ChannelRow
            key={index}
            channel={item}
            scrollRef={(el) => (contentScrollRef.current[index] = el)}
            onChannelScroll={onChannelScroll}
          />
        )}
        contentContainerStyle={styles.channelListContent}
        style={styles.channelList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  timeMarkersContainer: { height: 40, backgroundColor: "#f0f0f0" },
  timeMarkersContent: { flexDirection: "row" },
  channelListContent: { paddingBottom: 20 },
  nowButtonContainer: {
    width: SLOT_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  nowButton: {
    backgroundColor: "#ff4757",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  nowButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
