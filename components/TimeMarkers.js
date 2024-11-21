import {ScrollView, Text, StyleSheet,View} from "react-native"

const TimeMarkers = () => {
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2).toString().padStart(2, "0");
    const minutes = (i % 2 === 0 ? "00" : "30").padStart(2, "0");
    return `${hours}:${minutes}`;
  });

  return (
    <View style={styles.timeMarkers}>
      {timeSlots.map((time, index) => (
        <Text key={index} style={styles.timeMarkerText}>{time}</Text>
      ))}
    </View>
  );
};

export default TimeMarkers;

const styles = StyleSheet.create({
  timeMarkers: { flexDirection: 'row' },
  timeMarkerText: { width: 100, textAlign: 'center', fontSize: 12 },
})