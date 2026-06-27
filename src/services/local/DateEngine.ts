export function generateDates(startDate: Date, durationDays: number): string[] {
  const dates = [];
  let current = new Date(startDate);

  for (let i = 0; i < durationDays; i++) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
