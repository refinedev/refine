import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import dayjs from "dayjs";
import "i18n";

import WeekDay from "dayjs/plugin/weekday";
import LocaleData from "dayjs/plugin/localeData";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(WeekDay);
dayjs.extend(LocaleData);
dayjs.extend(LocalizedFormat);

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback="loading">
            <App />
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById("root"),
);
