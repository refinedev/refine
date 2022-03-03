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
    resourceName?: string;
    recordItemId?: BaseKey;
    onSuccess?: (value: DeleteOneResponse) => void;
    mutationMode?: MutationMode;
    hideText?: boolean;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    ignoreAccessControlProvider?: boolean;
} & SuccessErrorNotification;

/**
 * `<DeleteButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} and {@link https://ant.design/components/button/ `<Popconfirm>`} components.
 * When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
    resourceName: propResourceName,
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
    ...rest
}) => {
    const resourceWithRoute = useResourceWithRoute();

    const translate = useTranslate();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    const resource = resourceWithRoute(resourceName);

    const { mutate, isLoading, variables } = useDelete();

    const id = recordItemId ?? idFromRoute;

    const { data } = useCan({
        resource: resource.name,
        action: "delete",
        params: { id },
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
        },
    });

    return (
        <Popconfirm
            key="delete"
            okText={translate("buttons.delete", "Delete")}
            cancelText={translate("buttons.cancel", "Cancel")}
            okType="danger"
            title={translate("buttons.confirm", "Are you sure?")}
            okButtonProps={{ disabled: isLoading }}
            onConfirm={(): void => {
                mutate(
                    {
                        id: id!,
                        resource: resource.name,
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
