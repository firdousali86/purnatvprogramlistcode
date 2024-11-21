const SLOT_WIDTH = 100;

const getCurrentTimePosition = () => {
  const now = new Date();
  const hours = now.getHours(); // 24-hour format
  const minutes = now.getMinutes();

  const position = (hours * 2 + Math.floor(minutes / 30)) * SLOT_WIDTH;

  return position;
};

export { getCurrentTimePosition, SLOT_WIDTH };
