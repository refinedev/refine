import React from "react";
import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
    useDelete,
    useResourceWithRoute,
    useTranslate,
    useMutationMode,
    useRouterContext,
    useCan,
    ResourceRouterParams,
    MutationMode,
    SuccessErrorNotification,
    MetaDataQuery,
    BaseKey,
    DeleteOneResponse,
} from "@pankod/refine-core";

export type DeleteButtonProps = ButtonProps & {
    /**
     * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/pankod/refine/issues/1618
     */
    resourceName?: string;
    resourceNameOrRouteName?: string;
    recordItemId?: BaseKey;
    onSuccess?: (value: DeleteOneResponse) => void;
    mutationMode?: MutationMode;
    hideText?: boolean;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    ignoreAccessControlProvider?: boolean;
    confirmTitle?: string;
    confirmOkText?: string;
    confirmCancelText?: string;
} & SuccessErrorNotification;

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
    ...rest
}) => {
    const resourceWithRoute = useResourceWithRoute();

    const translate = useTranslate();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(
        propResourceNameOrRouteName ?? routeResourceName,
    );
    const resourceName = propResourceName ?? resource.name;

    const { mutate, isLoading, variables } = useDelete();

    const id = recordItemId ?? idFromRoute;

    const { data } = useCan({
        resource: resourceName,
        action: "delete",
        params: { id },
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
                        id: id!,
                        resource: resourceName,
                        mutationMode,
                        successNotification,
                        errorNotification,
                        metaData,
                        dataProviderName,
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
                {...rest}
            >
                {!hideText &&
                    (children ?? translate("buttons.delete", "Delete"))}
            </Button>
        </Popconfirm>
    );
};
