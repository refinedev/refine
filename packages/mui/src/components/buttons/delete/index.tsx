import React from "react";
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
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DeleteOutline } from "@mui/icons-material";

import { DeleteButtonProps } from "../types";

/**
 * `<DeleteButton>` uses Material UI {@link https://mui.com/material-ui/api/loading-button/#main-content `<LoadingButton>`} and {@link https://mui.com/material-ui/react-dialog/#main-content `<Dialog>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/delete-button} for more details.
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
    invalidates,
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseOnConfirm = () => {
        if ((recordItemId ?? id) && resource?.name) {
            setWarnWhen(false);
            setOpen(false);
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
                    invalidates,
                },
                {
                    onSuccess: (value) => {
                        onSuccess && onSuccess(value);
                    },
                },
            );
        }
    };

    const { sx, ...restProps } = rest;

    const { setWarnWhen } = useWarnAboutChange();

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <div>
            <LoadingButton
                color="error"
                onClick={handleClickOpen}
                disabled={data?.can === false}
                loading={(recordItemId ?? id) === variables?.id && isLoading}
                startIcon={!hideText && <DeleteOutline {...svgIconProps} />}
                sx={{ minWidth: 0, ...sx }}
                loadingPosition={hideText ? "center" : "start"}
                data-testid={RefineButtonTestIds.DeleteButton}
                className={RefineButtonClassNames.DeleteButton}
                {...restProps}
            >
                {hideText ? (
                    <DeleteOutline fontSize="small" {...svgIconProps} />
                ) : (
                    children ?? translate("buttons.delete", "Delete")
                )}
            </LoadingButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {confirmTitle ??
                        translate("buttons.confirm", "Are you sure?")}
                </DialogTitle>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleClose}>
                        {confirmCancelText ??
                            translate("buttons.cancel", "Cancel")}
                    </Button>
                    <Button
                        color="error"
                        onClick={handleCloseOnConfirm}
                        autoFocus
                    >
                        {confirmOkText ?? translate("buttons.delete", "Delete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
