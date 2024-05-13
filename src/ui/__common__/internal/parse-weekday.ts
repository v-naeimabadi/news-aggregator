import { Weekday } from "../typings/weekday";

export function parseWeekday(value: Weekday): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
  switch (value) {
    case "SU":
      return 0;
    case "MO":
      return 1;
    case "TU":
      return 2;
    case "WE":
      return 3;
    case "TH":
      return 4;
    case "FR":
      return 5;
    case "SA":
      return 6;
  }
}
