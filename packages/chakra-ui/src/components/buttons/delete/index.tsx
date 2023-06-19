import React, { useContext, useState } from "react";
import {
    useDelete,
    useTranslate,
    useMutationMode,
    useCan,
    useResource,
    pickNotDeprecated,
    useWarnAboutChange,
    AccessControlContext,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

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
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName,
    recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    children,
    successNotification,
    errorNotification,
    hideText = false,
    accessControl,
    meta,
    metaData,
    dataProviderName,
    confirmTitle,
    confirmOkText,
    confirmCancelText,
    svgIconProps,
    ...rest
}) => {
    const accessControlContext = useContext(AccessControlContext);

    const accessControlEnabled =
        accessControl?.enabled ??
        accessControlContext.options.buttons.enableAccessControl;

    const hideIfUnauthorized =
        accessControl?.hideIfUnauthorized ??
        accessControlContext.options.buttons.hideIfUnauthorized;

    const translate = useTranslate();

    const { id, resource, identifier } = useResource(
        resourceNameFromProps ?? resourceNameOrRouteName,
    );

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { mutate, isLoading, variables } = useDelete();

    const { data } = useCan({
        resource: resource?.name,
        action: "delete",
        params: { id: recordItemId ?? id, resource },
        queryOptions: {
            enabled: accessControlEnabled,
        },
    });

    const disabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    const [opened, setOpened] = useState(false);

    const onConfirm = () => {
        if (identifier && (recordItemId ?? id)) {
            setWarnWhen(false);
            setOpened(false);
            mutate(
                {
                    id: recordItemId ?? id ?? "",
                    resource: identifier,
                    mutationMode,
                    successNotification,
                    errorNotification,
                    meta: pickNotDeprecated(meta, metaData),
                    metaData: pickNotDeprecated(meta, metaData),
                    dataProviderName,
                },
                {
                    onSuccess: (value) => {
                        onSuccess && onSuccess(value);
                    },
                },
            );
        }
    };

    const { setWarnWhen } = useWarnAboutChange();

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
                        isDisabled={isLoading || data?.can === false}
                        isLoading={
                            (recordItemId ?? id) === variables?.id && isLoading
                        }
                        data-testid={RefineButtonTestIds.DeleteButton}
                        className={RefineButtonClassNames.DeleteButton}
                        {...rest}
                    >
                        <IconTrash size={20} {...svgIconProps} />
                    </IconButton>
                ) : (
                    <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={() => setOpened((o) => !o)}
                        isDisabled={isLoading || data?.can === false}
                        isLoading={id === variables?.id && isLoading}
                        leftIcon={<IconTrash size={20} {...svgIconProps} />}
                        title={disabledTitle()}
                        data-testid={RefineButtonTestIds.DeleteButton}
                        className={RefineButtonClassNames.DeleteButton}
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
