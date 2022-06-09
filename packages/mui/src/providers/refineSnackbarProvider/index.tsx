import { styled } from "@mui/material";
import { SnackbarProvider } from "notistack";

export const RefineSnackbarProvider = styled(SnackbarProvider)`
    &.SnackbarItem-contentRoot {
        background-color: ${(props) => props.theme.palette.background.default};
        color: ${(props) => props.theme.palette.primary.main};
    }
    &.SnackbarItem-variantSuccess {
        background-color: ${(props) => props.theme.palette.primary.main};
        color: ${(props) => props.theme.palette.primary.contrastText};
    }
    &.SnackbarItem-variantError {
        background-color: ${(props) => props.theme.palette.error.main};
        color: ${(props) => props.theme.palette.common.white};
    }
`;
