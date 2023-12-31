export default function timeFormatter(seconds) {
  if (!seconds) return "00:00:00";
  seconds = Math.floor(seconds);
  let minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  let hours = Math.floor(minutes / 60);
  minutes = Math.floor(minutes % 60);
  //console.log(transform(hours),transform(minutes),transform(seconds));
  return `${transform(hours)}:${transform(minutes)}:${transform(seconds)}`;
}

function transform(number) {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

// console.log(timeFormatter());
