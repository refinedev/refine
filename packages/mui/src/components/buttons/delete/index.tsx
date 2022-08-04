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
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogTitle,
    SvgIconProps,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LoadingButton } from "@mui/lab";

export type DeleteButtonProps = RefineDeleteButtonProps<
    ButtonProps,
    {
        svgIconProps?: SvgIconProps;
    }
>;

/**
 * `<DeleteButton>` uses Material UI {@link https://mui.com/material-ui/api/loading-button/#main-content `<LoadingButton>`} and {@link https://mui.com/material-ui/react-dialog/#main-content `<Dialog>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/delete-button} for more details.
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
            <LoadingButton
                color="error"
                onClick={handleClickOpen}
                disabled={data?.can === false}
                loading={id === variables?.id && isLoading}
                startIcon={!hideText && <DeleteOutlineIcon {...svgIconProps} />}
                sx={{ minWidth: 0, ...sx }}
                loadingPosition={hideText ? "center" : "start"}
                data-testid={RefineButtonTestIds.DeleteButton}
                {...restProps}
            >
                {hideText ? (
                    <DeleteOutlineIcon fontSize="small" {...svgIconProps} />
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
