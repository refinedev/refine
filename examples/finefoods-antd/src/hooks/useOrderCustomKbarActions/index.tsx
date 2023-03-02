import { useEffect, useState } from "react";
import { useTranslate, useUpdate } from "@pankod/refine-core";
import {
    Action,
    createAction,
    Priority,
    useRegisterActions,
} from "@pankod/refine-kbar";
import { Icons } from "@pankod/refine-antd";

import { IOrder } from "interfaces";

export const useOrderCustomKbarActions = (order?: IOrder): void => {
    const t = useTranslate();
    const { mutate } = useUpdate();

    const canAcceptOrder = order?.status.text === "Pending";
    const canRejectOrder =
        order?.status.text === "Pending" ||
        order?.status.text === "Ready" ||
        order?.status.text === "On The Way";

    const [actions, setActions] = useState<Action[]>([]);

    const handleMutate = (status: { id: number; text: string }) => {
        if (order) {
            mutate(
                {
                    resource: "orders",
                    id: order.id.toString(),
                    values: {
                        status,
                    },
                },
                {
                    onSuccess: () => setActions([]),
                },
            );
        }
    };

    useEffect(() => {
        const preActions: Action[] = [];
        if (canAcceptOrder) {
            preActions.push(
                createAction({
                    name: t("buttons.accept"),
                    icon: <Icons.CheckCircleOutlined />,
                    section: "actions",
                    perform: () => {
                        handleMutate({
                            id: 2,
                            text: "Ready",
                        });
                    },
                    priority: Priority.HIGH,
                }),
            );
        }
        if (canRejectOrder) {
            preActions.push(
                createAction({
                    name: t("buttons.reject"),
                    icon: <Icons.CloseCircleOutlined />,
                    section: "actions",
                    perform: () => {
                        handleMutate({
                            id: 5,
                            text: "Cancelled",
                        });
                    },
                    priority: Priority.HIGH,
                }),
            );
        }
        setActions(preActions);
    }, [order]);
    useRegisterActions(actions, [actions]);
};
