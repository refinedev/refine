import type { ButtonProps, ButtonVariant } from "@mantine/core";
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

export type MantineButtonProps = Omit<ButtonProps, "classNames"> & {
  size?: string;
  variant?: ButtonVariant;
};

export type ShowButtonProps = RefineShowButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type SaveButtonProps = RefineSaveButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type ListButtonProps = RefineListButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type ImportButtonProps = RefineImportButtonProps<
  MantineButtonProps,
  {
    inputProps: UseImportInputPropsType;
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type ExportButtonProps = RefineExportButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type EditButtonProps = RefineEditButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type DeleteButtonProps = RefineDeleteButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type CreateButtonProps = RefineCreateButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type CloneButtonProps = RefineCloneButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;
