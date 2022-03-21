import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    ButtonProps,
    Icons,
    ModalProps,
    useModal,
} from "@pankod/refine-antd";
import {
    useRouterContext,
    useTranslate,
    useResourceWithRoute,
    ResourceRouterParams,
    BaseKey,
} from "@pankod/refine-core";
import ReactDiffViewer, { ReactDiffViewerProps } from "react-diff-viewer";

import { ModalDiffViewer } from "../modalDiffViewer";

export type LogButtonProps = ButtonProps & {
    recordItemId?: BaseKey;
    resourceName?: string;
    hideText?: boolean;
    reactDiffViewerProps?: ReactDiffViewerProps;
    modalProps?: ModalProps;
};

export const LogButton: React.FC<LogButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    hideText = false,
    onClick,
    reactDiffViewerProps,
    modalProps: propModalProps,
    children,
    ...rest
}) => {
    const diffViewerRef = useRef<ReactDiffViewer>(null);
    const [selectedLog, setSelectedLog] = useState<BaseKey | undefined>();

    const { modalProps, show } = useModal({
        modalProps: {
            onCancel: () => {
                diffViewerRef.current?.resetCodeBlocks();
            },
        },
    });

    useEffect(() => {
        diffViewerRef.current?.resetCodeBlocks();
    }, [selectedLog]);

    const translate = useTranslate();

    const { useParams } = useRouterContext();
    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(routeResourceName);

    const resourceName = propResourceName ?? resource.name;
    const id = recordItemId ?? idFromRoute;

    return (
        <>
            <Button
                onClick={(e): void => (onClick ? onClick(e) : show())}
                icon={<Icons.HistoryOutlined />}
                {...rest}
            >
                {!hideText &&
                    (children ?? translate("buttons.logs", "Audit Logs"))}
            </Button>
            <ModalDiffViewer
                ref={diffViewerRef}
                modalProps={{ ...modalProps, ...propModalProps }}
                showModal={show}
                selectedLog={selectedLog}
                setSelectedLog={setSelectedLog}
                resource={resourceName}
                id={id}
                reactDiffViewerProps={reactDiffViewerProps}
            />
        </>
    );
};
