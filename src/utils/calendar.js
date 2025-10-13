export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function buildMonth(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const start = new Date(first);
  const day = first.getDay() || 7; // Sunday -> 7
  start.setDate(first.getDate() - (day - 1));
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const inMonth = d.getMonth() === date.getMonth();
    return { date: d, inMonth };
  });
  return cells;
}

