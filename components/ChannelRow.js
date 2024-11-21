import {View,Text, ScrollView, StyleSheet} from "react-native"

const ChannelRow = ({ channel, scrollRef }) => {
  const fullDaySlots = Array(48).fill({ name: "", time: "" });

  // Map programs to their corresponding 30-minute slots
  channel.programs.forEach((program) => {
  // Parse time from "HH:mm AM/PM" format
  const [time, modifier] = program.time.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Calculate the slot index
  const slotIndex = hours * 2 + (minutes >= 30 ? 1 : 0);
  fullDaySlots[slotIndex] = program;
});


  return (
    <View style={styles.channelRow}>
      <Text style={styles.channelName}>{channel.name}</Text>
      <ScrollView
        horizontal
        style={styles.programList}
        ref={scrollRef}
        scrollEnabled={false} // Disable direct horizontal scrolling
      >
        {fullDaySlots.map((program, index) => (
          <View key={index} style={styles.programBlock}>
            <Text style={styles.programName}>{program.name || ""}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChannelRow;

const styles = StyleSheet.create({
  channelRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  channelName: { width: 100, fontWeight: 'bold', textAlign: 'center' },
  programList: { flex: 1 },
  programBlock: { width: 100, padding: 5, marginHorizontal: 2, backgroundColor: '#eaeaea' },
  programName: { fontSize: 12, textAlign: 'center' },
})