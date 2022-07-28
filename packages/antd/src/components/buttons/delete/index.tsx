import React from "react";
import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
    useDelete,
    useTranslate,
    useMutationMode,
    useCan,
    useResource,
} from "@pankod/refine-core";
import {
    RefineDeleteButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

export type DeleteButtonProps = RefineDeleteButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/pankod/refine/issues/1618
         */
        resourceName?: string;
    }
>;

/**
 * `<DeleteButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} and {@link https://ant.design/components/button/ `<Popconfirm>`} components.
 * When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
    resourceName: propResourceName,
    resourceNameOrRouteName: propResourceNameOrRouteName,
    recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    children,
    successNotification,
    errorNotification,
    hideText = false,
    ignoreAccessControlProvider = false,
    metaData,
    dataProviderName,
    confirmTitle,
    confirmOkText,
    confirmCancelText,
    invalidates,
    ...rest
}) => {
    const translate = useTranslate();

    const { resourceName, id, resource } = useResource({
        resourceNameOrRouteName: propResourceNameOrRouteName,
        resourceName: propResourceName,
        recordItemId,
    });

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { mutate, isLoading, variables } = useDelete();

    const { data } = useCan({
        resource: resourceName,
        action: "delete",
        params: { id, resource },
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
        },
    });

    return (
        <Popconfirm
            key="delete"
            okText={confirmOkText ?? translate("buttons.delete", "Delete")}
            cancelText={
                confirmCancelText ?? translate("buttons.cancel", "Cancel")
            }
            okType="danger"
            title={
                confirmTitle ?? translate("buttons.confirm", "Are you sure?")
            }
            okButtonProps={{ disabled: isLoading }}
            onConfirm={(): void => {
                mutate(
                    {
                        id: id || "",
                        resource: resourceName,
                        mutationMode,
                        successNotification,
                        errorNotification,
                        metaData,
                        dataProviderName,
                        invalidates,
                    },
                    {
                        onSuccess: (value) => {
                            onSuccess && onSuccess(value);
                        },
                    },
                );
            }}
            disabled={data?.can === false}
        >
            <Button
                danger
                loading={id === variables?.id && isLoading}
                icon={<DeleteOutlined />}
                disabled={data?.can === false}
                data-testid={RefineButtonTestIds.DeleteButton}
                {...rest}
            >
                {!hideText &&
                    (children ?? translate("buttons.delete", "Delete"))}
            </Button>
        </Popconfirm>
    );
};
