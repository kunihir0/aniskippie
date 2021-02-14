// Helper function to capitalize the first letter
export const capitalizeFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export const timeStringToSeconds = (timeString: string) => {
  const [minutes, seconds] = timeString.split(':');
  return parseInt(minutes, 10) * 60 + parseFloat(seconds);
};

export const secondsToTimeString = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(1, '0');
  const remainder = (seconds % 60).toFixed(3).padStart(6, '0');
  return `${minutes}:${remainder}`;
};

export const formatTimeString = (timeString: string) => {
  const timeStringNumber = Number(timeString);
  const isNumber = Number.isFinite(timeStringNumber);
  const seconds = isNumber ? timeStringNumber : timeStringToSeconds(timeString);
  return secondsToTimeString(seconds);
};