import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/es/generate/dayjs.js";
import generateCalendar from "antd/es/calendar/generateCalendar.js";
// import "antd/es/calendar/style/index.css";

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export default Calendar;
