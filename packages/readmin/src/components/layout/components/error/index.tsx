import React from "react";
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

export const ErrorComponent: React.FC = () => {
    const history = useHistory();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button type="primary" onClick={() => history.push("/")}>
                    Back Home
                </Button>
            }
        />
    );
};
