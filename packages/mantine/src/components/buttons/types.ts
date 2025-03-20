import type { ActionIconProps, ButtonProps } from "@mantine/core";
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

type CommonButtonProps = {
  hidden?: boolean;
  svgIconProps?: Omit<IconProps, "ref">;
  size?: ButtonProps["size"] & ActionIconProps["size"];
  classNames?: ButtonProps["classNames"] & ActionIconProps["classNames"];
  vars?: ButtonProps["vars"] & ActionIconProps["vars"];
  styles?: ButtonProps["styles"] & ActionIconProps["styles"];
};

type MantineButtonProps = Omit<
  ButtonProps | ActionIconProps,
  "size" | "classNames" | "vars" | "styles"
>;

export type ShowButtonProps = RefineShowButtonProps<
  MantineButtonProps,
  CommonButtonProps
>;

export type SaveButtonProps = RefineSaveButtonProps<
  MantineButtonProps,
  CommonButtonProps
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
  MantineButtonProps,
  CommonButtonProps
>;

export type ListButtonProps = RefineListButtonProps<
  MantineButtonProps,
  CommonButtonProps
>;

export type ImportButtonProps = RefineImportButtonProps<
  MantineButtonProps,
  CommonButtonProps & {
    inputProps: UseImportInputPropsType;
  }
>;

export type ExportButtonProps = RefineExportButtonProps<
  MantineButtonProps,
  CommonButtonProps
>;

export type EditButtonProps = RefineEditButtonProps<
  MantineButtonProps,
  CommonButtonProps
>;

export type DeleteButtonProps = RefineDeleteButtonProps<
  MantineButtonProps,
  CommonButtonProps
>;

export type CreateButtonProps = RefineCreateButtonProps<
  MantineButtonProps,
  CommonButtonProps
>;

export type CloneButtonProps = RefineCloneButtonProps<
  MantineButtonProps,
  CommonButtonProps
>;
