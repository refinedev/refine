import { ButtonProps, ClassNames } from "@mantine/core";
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

export type MantiteButtonProps = Omit<ButtonProps, "classNames"> & {
  size?: string
}

export type ShowButtonProps = RefineShowButtonProps<
    MantiteButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type SaveButtonProps = RefineSaveButtonProps<
    MantiteButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
    MantiteButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type ListButtonProps = RefineListButtonProps<
    MantiteButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type ImportButtonProps = RefineImportButtonProps<
    MantiteButtonProps,
    {
        inputProps: UseImportInputPropsType;
        svgIconProps?: TablerIconProps;
    }
>;

export type ExportButtonProps = RefineExportButtonProps<
    MantiteButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type EditButtonProps = RefineEditButtonProps<
    MantiteButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type DeleteButtonProps = RefineDeleteButtonProps<
    MantiteButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type CreateButtonProps = RefineCreateButtonProps<
    MantiteButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export type CloneButtonProps = RefineCloneButtonProps<
    MantiteButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;
