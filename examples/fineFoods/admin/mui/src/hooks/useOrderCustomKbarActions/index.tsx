import { useEffect, useState } from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    Action,
    createAction,
    Priority,
    useRegisterActions,
} from "@pankod/refine-kbar";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";

import { IOrder } from "interfaces";

export const useOrderCustomKbarActions = (
    canAcceptOrder: boolean,
    canRejectOrder: boolean,
    mutateReady: (onSuccess?: () => void) => void,
    mutateReject: (onSuccess?: () => void) => void,
    order?: IOrder,
): void => {
    const t = useTranslate();

    const [actions, setActions] = useState<Action[]>([]);
    useEffect(() => {
        if (canAcceptOrder) {
            setActions((prev) => [
                ...prev,
                createAction({
                    name: t("buttons.accept"),
                    icon: <CheckOutlined />,
                    section: "actions",
                    perform: () => {
                        mutateReady(() => setActions([]));
                    },
                    priority: Priority.HIGH,
                }),
            ]);
        }
        if (canRejectOrder) {
            setActions((prev) => [
                ...prev,
                createAction({
                    name: t("buttons.reject"),
                    icon: <CloseOutlined />,
                    section: "actions",
                    perform: () => {
                        mutateReject(() => setActions([]));
                    },
                    priority: Priority.HIGH,
                }),
            ]);
        }
    }, [order]);
    useRegisterActions(actions, [actions]);
};
