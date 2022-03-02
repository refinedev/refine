import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/es/generate/dayjs.js";
import generatePicker from "antd/es/date-picker/generatePicker/index.js";
// import "antd/es/date-picker/style/index.css";

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
