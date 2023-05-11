import React, { useState } from "react";
import {
    useDelete,
    useTranslate,
    useMutationMode,
    useCan,
    useResource,
    pickNotDeprecated,
    useWarnAboutChange,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { Group, Text, Button, Popover, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button>`} and {@link https://mantine.dev/core/modal/ `<Modal>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/delete-button} for more details.
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
    const accessControlEnabled = accessControl?.enabled ?? true;
    const hideIfUnauthorized = accessControl?.hideIfUnauthorized ?? false;
    const translate = useTranslate();

    const { id, resource } = useResource(
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

    const [opened, setOpened] = useState(false);

    const onConfirm = () => {
        if ((recordItemId ?? id) && resource?.name) {
            setWarnWhen(false);
            setOpened(false);
            mutate(
                {
                    id: recordItemId ?? id ?? "",
                    resource: resource?.name,
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

    const { variant, styles, ...commonProps } = rest;

    const { setWarnWhen } = useWarnAboutChange();

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Popover
            opened={opened}
            onChange={setOpened}
            withArrow
            withinPortal
            disabled={
                typeof rest?.disabled !== "undefined"
                    ? rest.disabled
                    : data?.can === false
            }
        >
            <Popover.Target>
                {hideText ? (
                    <ActionIcon
                        color="red"
                        onClick={() => setOpened((o) => !o)}
                        disabled={isLoading || data?.can === false}
                        loading={
                            (recordItemId ?? id) === variables?.id && isLoading
                        }
                        data-testid={RefineButtonTestIds.DeleteButton}
                        className={RefineButtonClassNames.DeleteButton}
                        {...(variant
                            ? {
                                  variant:
                                      mapButtonVariantToActionIconVariant(
                                          variant,
                                      ),
                              }
                            : { variant: "outline" })}
                        {...commonProps}
                    >
                        <IconTrash size={18} {...svgIconProps} />
                    </ActionIcon>
                ) : (
                    <Button
                        color="red"
                        variant="outline"
                        onClick={() => setOpened((o) => !o)}
                        disabled={isLoading || data?.can === false}
                        loading={
                            (recordItemId ?? id) === variables?.id && isLoading
                        }
                        leftIcon={<IconTrash size={18} {...svgIconProps} />}
                        data-testid={RefineButtonTestIds.DeleteButton}
                        className={RefineButtonClassNames.DeleteButton}
                        {...rest}
                    >
                        {children ?? translate("buttons.delete", "Delete")}
                    </Button>
                )}
            </Popover.Target>
            <Popover.Dropdown py="xs">
                <Text size="sm" weight="bold">
                    {confirmTitle ??
                        translate("buttons.confirm", "Are you sure?")}
                </Text>
                <Group position="center" noWrap spacing="xs" mt="xs">
                    <Button
                        onClick={() => setOpened(false)}
                        variant="default"
                        size="xs"
                    >
                        {confirmCancelText ??
                            translate("buttons.cancel", "Cancel")}
                    </Button>
                    <Button color="red" onClick={onConfirm} autoFocus size="xs">
                        {confirmOkText ?? translate("buttons.delete", "Delete")}
                    </Button>
                </Group>
            </Popover.Dropdown>
        </Popover>
    );
};
