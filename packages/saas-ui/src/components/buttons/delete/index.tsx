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
import {
    HStack,
    Button,
    ButtonProps,
    Popover,
    PopoverAnchor,
    PopoverContent,
    IconButton,
    useDisclosure,
    Portal,
    PopoverHeader,
    PopoverBody,
} from "@chakra-ui/react";
import { IconTrash, TablerIconProps } from "@tabler/icons";

export type DeleteButtonProps = RefineDeleteButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
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
    accessControl,
    ignoreAccessControlProvider = false,
    metaData,
    dataProviderName,
    confirmTitle,
    confirmOkText,
    confirmCancelText,
    svgIconProps,
    ...rest
}) => {
    const accessControlEnabled =
        accessControl?.enabled ?? !ignoreAccessControlProvider;
    const hideIfUnauthorized = accessControl?.hideIfUnauthorized ?? false;
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
            enabled: accessControlEnabled,
        },
    });

    const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

    const onConfirm = () => {
        onClose();
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

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverAnchor>
                {hideText ? (
                    <IconButton
                        color="red"
                        icon={<IconTrash size={18} {...svgIconProps} />}
                        onClick={() => onToggle()}
                        aria-label={translate("buttons.delete", "Delete")}
                        isDisabled={isLoading || data?.can === false}
                        isLoading={id === variables?.id && isLoading}
                        data-testid={RefineButtonTestIds.DeleteButton}
                        {...rest}
                    />
                ) : (
                    <Button
                        color="red"
                        variant="outline"
                        onClick={() => onToggle()}
                        isDisabled={isLoading || data?.can === false}
                        isLoading={id === variables?.id && isLoading}
                        leftIcon={<IconTrash size={18} {...svgIconProps} />}
                        data-testid={RefineButtonTestIds.DeleteButton}
                        {...rest}
                    >
                        {children ?? translate("buttons.delete", "Delete")}
                    </Button>
                )}
            </PopoverAnchor>
            <Portal>
                <PopoverContent py="xs">
                    <PopoverHeader>
                        {confirmTitle ??
                            translate("buttons.confirm", "Are you sure?")}
                    </PopoverHeader>
                    <PopoverBody>
                        <HStack spacing="xs" mt="xs">
                            <Button
                                onClick={() => onClose()}
                                variant="default"
                                size="xs"
                            >
                                {confirmCancelText ??
                                    translate("buttons.cancel", "Cancel")}
                            </Button>
                            <Button
                                color="red"
                                onClick={onConfirm}
                                autoFocus
                                size="xs"
                            >
                                {confirmOkText ??
                                    translate("buttons.delete", "Delete")}
                            </Button>
                        </HStack>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};
