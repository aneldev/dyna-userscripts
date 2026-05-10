import moment from "moment";
import {Moment} from "moment";

import {round} from "dyna-loops";

export const getDurationString = (
  start: number | Date | Moment | string,
  end: number | Date | Moment | string,
  precision: number = 1,
): string => {
  const duration = moment.duration(moment(end).diff(moment(start)));

  const ms = duration.asMilliseconds();
  if (Math.abs(ms) < 1000) return roundDurationUnit(ms, precision, 'ms');

  const seconds = duration.asSeconds();
  if (Math.abs(seconds) < 60) return roundDurationUnit(seconds, precision, 'sec');

  const minutes = duration.asMinutes();
  if (Math.abs(minutes) < 60) return roundDurationUnit(minutes, precision, 'min');

  const hours = duration.asHours();
  if (Math.abs(hours) < 24) return roundDurationUnit(hours, precision, 'hour');

  const days = duration.asDays();
  if (Math.abs(days) < 7) return roundDurationUnit(days, precision, 'day');

  const weeks = duration.asWeeks();
  if (Math.abs(weeks) < 4.345) return roundDurationUnit(weeks, precision, 'week');

  const months = duration.asMonths();
  if (Math.abs(months) < 12) return roundDurationUnit(months, precision, 'month');

  return roundDurationUnit(duration.asYears(), precision, 'year');
};

const roundDurationUnit = (
  n: number,
  precision: number,
  unit: string,
): string => {
  const roundNumber = round(n, precision).toString();
  const textNumber = roundNumber.endsWith('.0')
    ? roundNumber.slice(0, -precision - 1)
    : roundNumber;
  if (textNumber === "0") return `<${1 / Math.pow(10, precision)}ms`;
  return `${textNumber} ${unit}${textNumber === "1" ? '' : 's'}`.trim();
};
