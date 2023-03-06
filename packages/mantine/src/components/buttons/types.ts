import { ButtonProps } from "@mantine/core";
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

export type ShowButtonProps = RefineShowButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
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

export type ListButtonProps = RefineListButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
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

export type EditButtonProps = RefineEditButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type DeleteButtonProps = RefineDeleteButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type CreateButtonProps = RefineCreateButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type CloneButtonProps = RefineCloneButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;
