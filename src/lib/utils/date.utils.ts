import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";

export const today = (dateFormate = "YYYY-MM-DD", localeLang: "en" | "fa" = "en", calender: "en" | "fa" = "en") =>
  new DateObject({
    calendar: calender === "fa" ? persian : gregorian,
    locale: localeLang === "fa" ? persian_fa : persian_en,
  }).format(dateFormate);

export function formateDateObjectToString({
  date,
  type = "date",
  dateFormate = "YYYY/MM/DD",
  timeFormate = "HH:mm",
  localeLang = "fa",
  calender = "fa",
  options,
}: {
  date: Date;
  type?: "date" | "time";
  dateFormate?: string;
  timeFormate?: string;
  localeLang?: "en" | "fa";
  calender?: "en" | "fa";
  options?: any;
}) {
  const _date = new Date(date);
  return new DateObject({
    date: _date,
    calendar: calender === "fa" ? persian : gregorian,
    locale: localeLang === "fa" ? persian_fa : persian_en,
    format: type === "time" ? timeFormate : dateFormate,
    ...options,
  }).format();
}
