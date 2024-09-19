import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import minMax from "dayjs/plugin/minMax";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(updateLocale);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(isoWeek);
