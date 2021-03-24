import React, { useCallback, useEffect, useState, useRef } from "react";
import { useInterval, useBoolean } from "react-use";
import { Button, Progress } from "antd";

import { useNotification } from "@hooks";
import { INotificationContext } from "./INotificationContext";

export const NotificationContext = React.createContext<INotificationContext>({
    addNotification: () => {},
});

export const NotificationContextProvider: React.FC<INotificationContext> = ({
    children,
}) => {
    const [seconds, setSeconds] = useState(5);
    const [isRunning, toggleIsRunning] = useBoolean(false);

    const [id, setId] = useState("");
    const [resource, setResource] = useState("");
    const cancelMutationRef = useRef<() => void>();

    const notification = useNotification();

    useInterval(
        () => {
            setSeconds(seconds - 1);
        },
        isRunning ? 1000 : null,
    );

    const cancelNotification = () => {
        if (isRunning) {
            if (seconds === 0) {
                const message = (
                    <span style={{ marginLeft: 20 }}>Successful</span>
                );

                const description = (
                    <span style={{ marginLeft: 20 }}>
                        Id: {`${id} ${resource}`} edited
                    </span>
                );

                notification.open({
                    // key: `${idRef.current}-${resourceRef.current}-undo`,
                    key: "undo",
                    icon: <Progress type="circle" percent={100} width={50} />,
                    message,
                    description,
                });
                toggleIsRunning(false);

                return;
            }

            const message = (
                <span style={{ marginLeft: 20 }}>
                    You have 5 seconds to undo
                </span>
            );

            notification.info({
                key: "undo",
                icon: (
                    <Progress
                        type="circle"
                        percent={seconds * 20}
                        format={(seconds) => seconds && `${seconds / 20}`}
                        width={50}
                        strokeColor="#1890ff"
                        style={{ color: "red" }}
                    />
                ),
                message,
                btn: (
                    <Button
                        onClick={() => {
                            if (cancelMutationRef.current) {
                                cancelMutationRef.current();
                            }
                            toggleIsRunning(false);
                            setSeconds(0);
                            notification.close("undo");
                        }}
                    >
                        Undo
                    </Button>
                ),
                duration: 5,
            });
        }
    };

    const addNotification = (
        cancelMutation: () => void,
        id: string,
        resource: string,
    ) => {
        setSeconds(5);
        toggleIsRunning(true);
        setId(id);
        setResource(resource);
        cancelMutationRef.current = cancelMutation;
    };

    useEffect(() => {
        cancelNotification();
    }, [seconds, isRunning]);

    return (
        <NotificationContext.Provider
            value={{
                addNotification: useCallback(
                    (cancelMutation, id, resource) =>
                        addNotification(cancelMutation, id, resource),
                    [],
                ),
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
