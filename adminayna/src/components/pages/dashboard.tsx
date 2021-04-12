import * as React from "react";

import { useTranslate } from "readmin";

export const DashboardPage: React.FC = () => {
    const translate = useTranslate();

    return <div>{translate("common:resources.dashboard.title")}</div>;
};
