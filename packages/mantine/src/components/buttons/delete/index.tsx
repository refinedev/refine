import React from "react";
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
import { Group, Modal, Button, ButtonProps } from "@mantine/core";
import { Trash, IconProps } from "tabler-icons-react";

export type DeleteButtonProps = RefineDeleteButtonProps<
    ButtonProps,
    {
        svgIconProps?: IconProps;
    }
>;

/**
 * `<DeleteButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button>`} and {@link https://mantine.dev/core/modal/ `<Modal>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
    resourceNameOrRouteName,
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
    svgIconProps,
    ...rest
}) => {
    const { resourceName, id, resource } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const translate = useTranslate();

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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseOnConfirm = () => {
        setOpen(false);
        mutate(
            {
                id: id ?? "",
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
    };

    const { sx, ...restProps } = rest;

    return (
        <div>
            <Button
                variant="subtle"
                color="red"
                onClick={handleClickOpen}
                disabled={isLoading || data?.can === false}
                loading={id === variables?.id && isLoading}
                leftIcon={!hideText && <Trash {...svgIconProps} />}
                sx={{ minWidth: 0, ...sx }}
                data-testid={RefineButtonTestIds.DeleteButton}
                {...restProps}
            >
                {hideText ? (
                    <Trash fontSize="small" {...svgIconProps} />
                ) : (
                    children ?? translate("buttons.delete", "Delete")
                )}
            </Button>
            <Modal
                withCloseButton={false}
                opened={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                title={
                    confirmTitle ??
                    translate("buttons.confirm", "Are you sure?")
                }
            >
                <Group position="center">
                    <Button onClick={handleClose} variant="subtle">
                        {confirmCancelText ??
                            translate("buttons.cancel", "Cancel")}
                    </Button>
                    <Button
                        variant="subtle"
                        color="red"
                        onClick={handleCloseOnConfirm}
                        autoFocus
                    >
                        {confirmOkText ?? translate("buttons.delete", "Delete")}
                    </Button>
                </Group>
            </Modal>
        </div>
    );
};
