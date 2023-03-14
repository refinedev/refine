import { ButtonProps } from "@chakra-ui/react";
import { UseImportInputPropsType } from "@refinedev/core";
import {
    RefineCloneButtonProps,
    RefineCreateButtonProps,
    RefineDeleteButtonProps,
    RefineEditButtonProps,
    RefineExportButtonProps,
    RefineImportButtonProps,
    RefineListButtonProps,
    RefineRefreshButtonProps,
    RefineSaveButtonProps,
    RefineShowButtonProps,
} from "@refinedev/ui-types";
import { TablerIconProps } from "@tabler/icons";

export type ShowButtonProps = Omit<
    RefineShowButtonProps<
        ButtonProps,
        {
            svgIconProps?: TablerIconProps;
        }
    >,
    "ignoreAccessControlProvider"
>;

export type SaveButtonProps = RefineSaveButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type ListButtonProps = Omit<
    RefineListButtonProps<
        ButtonProps,
        {
            svgIconProps?: TablerIconProps;
        }
    >,
    "ignoreAccessControlProvider"
>;

export type ImportButtonProps = RefineImportButtonProps<
    ButtonProps,
    {
        inputProps: UseImportInputPropsType;
        svgIconProps?: TablerIconProps;
    }
>;

export type ExportButtonProps = RefineExportButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type EditButtonProps = Omit<
    RefineEditButtonProps<
        ButtonProps,
        {
            svgIconProps?: TablerIconProps;
        }
    >,
    "ignoreAccessControlProvider"
>;

export type DeleteButtonProps = Omit<
    RefineDeleteButtonProps<
        ButtonProps,
        {
            svgIconProps?: TablerIconProps;
        }
    >,
    "ignoreAccessControlProvider"
>;

export type CloneButtonProps = Omit<
    RefineCloneButtonProps<
        ButtonProps,
        {
            svgIconProps?: TablerIconProps;
        }
    >,
    "ignoreAccessControlProvider"
>;

export type CreateButtonProps = Omit<
    RefineCreateButtonProps<
        ButtonProps,
        {
            svgIconProps?: TablerIconProps;
        }
    >,
    "ignoreAccessControlProvider"
>;
