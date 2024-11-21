import {View, StyleSheet} from "react-native"
import {useState, useEffect} from "react"

const CurrentTimeMarker = () => {
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const position = ((now.getHours() * 60 + now.getMinutes()) / 30) * 100; // Assuming each slot is 100px wide
      setCurrentTimePosition(position);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.currentTimeMarker, { left: currentTimePosition }]} />
  );
};

export default CurrentTimeMarker;

const styles = StyleSheet.create({
  currentTimeMarker: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: 'red' },
})