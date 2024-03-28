import { ButtonProps, ButtonVariant } from "@mantine/core";
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

export type MantineButtonProps = Omit<ButtonProps, "classNames"> & {
  size?: string;
  variant?: ButtonVariant;
};

export type ShowButtonProps = RefineShowButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: TablerIconProps;
  }
>;

export type SaveButtonProps = RefineSaveButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: TablerIconProps;
  }
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: TablerIconProps;
  }
>;

export type ListButtonProps = RefineListButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: TablerIconProps;
  }
>;

export type ImportButtonProps = RefineImportButtonProps<
  MantineButtonProps,
  {
    inputProps: UseImportInputPropsType;
    svgIconProps?: TablerIconProps;
  }
>;

export type ExportButtonProps = RefineExportButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: TablerIconProps;
  }
>;

export type EditButtonProps = RefineEditButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: TablerIconProps;
  }
>;

export type DeleteButtonProps = RefineDeleteButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: TablerIconProps;
  }
>;

export type CreateButtonProps = RefineCreateButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: TablerIconProps;
  }
>;

export type CloneButtonProps = RefineCloneButtonProps<
  MantineButtonProps,
  {
    svgIconProps?: TablerIconProps;
  }
>;
