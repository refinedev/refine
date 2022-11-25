import React, { useState } from "react";
import {
    useDelete,
    useTranslate,
    useMutationMode,
    useCan,
    useResource,
} from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";

import {
    Button,
    HStack,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "@chakra-ui/react";
import { IconTrash } from "@tabler/icons";

import { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button>`} and {@link https://chakra-ui.com/docs/components/popover `<Popover>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/buttons/delete-button} for more details.
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
    metaData,
    dataProviderName,
    confirmTitle,
    confirmOkText,
    confirmCancelText,
    svgIconProps,
    ...rest
}) => {
    const accessControlEnabled = accessControl?.enabled;
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

    const [opened, setOpened] = useState(false);

    const onConfirm = () => {
        setOpened(false);
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
        <Popover isOpen={opened} isLazy>
            <PopoverTrigger>
                {hideText ? (
                    <IconButton
                        colorScheme="red"
                        variant="outline"
                        aria-label={translate("buttons.edit", "Edit")}
                        onClick={() => setOpened((o) => !o)}
                        disabled={isLoading || data?.can === false}
                        isLoading={id === variables?.id && isLoading}
                        data-testid={RefineButtonTestIds.DeleteButton}
                        {...rest}
                    >
                        <IconTrash size={20} {...svgIconProps} />
                    </IconButton>
                ) : (
                    <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={() => setOpened((o) => !o)}
                        disabled={isLoading || data?.can === false}
                        isLoading={id === variables?.id && isLoading}
                        leftIcon={<IconTrash size={20} {...svgIconProps} />}
                        data-testid={RefineButtonTestIds.DeleteButton}
                        {...rest}
                    >
                        {children ?? translate("buttons.delete", "Delete")}
                    </Button>
                )}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader textAlign="center">
                    {confirmTitle ??
                        translate("buttons.confirm", "Are you sure?")}
                </PopoverHeader>
                <PopoverBody display="flex" justifyContent="center">
                    <HStack>
                        <Button onClick={() => setOpened(false)} size="sm">
                            {confirmCancelText ??
                                translate("buttons.cancel", "Cancel")}
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={onConfirm}
                            autoFocus
                            size="sm"
                        >
                            {confirmOkText ??
                                translate("buttons.delete", "Delete")}
                        </Button>
                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
