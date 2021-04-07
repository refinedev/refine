import React from "react";
import { Button, Result } from "antd";

import { useNavigation, useTranslate } from "@hooks";

export const ErrorComponent: React.FC = () => {
    const { push } = useNavigation();
    const translate = useTranslate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button type="primary" onClick={() => push("/")}>
                    {translate("common:backHome", "Back Home")}
                </Button>
            }
        />
    );
};
