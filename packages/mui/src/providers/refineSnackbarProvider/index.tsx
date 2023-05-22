import { styled } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

export const RefineSnackbarProvider = styled(SnackbarProvider)`
    &.SnackbarItem-contentRoot {
        background-color: ${(props) => props.theme.palette.background.default};
        color: ${(props) => props.theme.palette.primary.main};
    }
    &.SnackbarItem-variantSuccess {
        background-color: ${(props) => props.theme.palette.success.main};
        color: ${(props) => props.theme.palette.success.contrastText};
    }
    &.SnackbarItem-variantError {
        background-color: ${(props) => props.theme.palette.error.main};
        color: ${(props) => props.theme.palette.error.contrastText};
    }
    &.SnackbarItem-variantInfo {
        background-color: ${(props) => props.theme.palette.info.main};
        color: ${(props) => props.theme.palette.info.contrastText};
    }
    &.SnackbarItem-variantWarning {
        background-color: ${(props) => props.theme.palette.warning.main};
        color: ${(props) => props.theme.palette.warning.contrastText};
    }
`;
