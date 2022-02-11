import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/lib/date-picker/generatePicker";
// import "antd/es/date-picker/style/index.css";

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
