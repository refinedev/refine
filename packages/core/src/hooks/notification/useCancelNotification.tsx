import React from "react";
import { useNotification } from "@hooks";
import { Button } from "antd";

export const useCancelNotification = () => {
    const notification = useNotification();

    return (cancelMutation: () => void) => {
        notification.info({
            message: "You have 5 seconds to undo",
            btn: (
                <Button
                    onClick={() => {
                        cancelMutation();
                        notification.close("undo");
                    }}
                >
                    Undo
                </Button>
            ),
            key: "undo",
        });
    };
};
