import type { ButtonProps } from "@mantine/core";
import type { UseImportInputPropsType } from "@refinedev/core";
import type {
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
import type { IconProps } from "@tabler/icons-react";

export type ShowButtonProps = RefineShowButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type SaveButtonProps = RefineSaveButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type ListButtonProps = RefineListButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type ImportButtonProps = RefineImportButtonProps<
  ButtonProps,
  {
    inputProps: UseImportInputPropsType;
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type ExportButtonProps = RefineExportButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type EditButtonProps = RefineEditButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type DeleteButtonProps = RefineDeleteButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type CreateButtonProps = RefineCreateButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type CloneButtonProps = RefineCloneButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;
