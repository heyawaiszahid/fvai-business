import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export const formatRelativeDate = (date) => {
  const _date = new Date(date);
  if (isToday(_date)) return format(_date, "h:mm a");
  if (isYesterday(_date)) return "Yesterday";
  return formatDistanceToNow(_date, { addSuffix: true });
};
