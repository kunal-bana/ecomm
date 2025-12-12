export function scheduleNotification(message: string, time: string) {
  const list = JSON.parse(localStorage.getItem("scheduledNotifs") || "[]");

  list.push({
    id: Date.now(),
    message,
    time,
    delivered: false,
  });

  localStorage.setItem("scheduledNotifs", JSON.stringify(list));
}
