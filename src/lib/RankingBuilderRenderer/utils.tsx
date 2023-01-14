export function getPosition(number: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = number % 100;

  return (
    number + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0])
  );
}

export function getDate(timestamp: number): string {
  const date = new Date(timestamp);

  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function convertToTimeFormat(seconds: number) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}
