import { ReactChild, ReactNode } from "react";

import type { ChipProps } from "@mui/material/Chip/index.js";
import type { LinkProps } from "@mui/material/Link/index.js";
import type { SvgIconProps } from "@mui/material/SvgIcon/index.js";
import type { TooltipProps } from "@mui/material/Tooltip/index.js";
import type { TypographyProps } from "@mui/material/Typography/index.js";

import {
  RefineFieldBooleanProps,
  RefineFieldDateProps,
  RefineFieldEmailProps,
  RefineFieldFileProps,
  RefineFieldMarkdownProps,
  RefineFieldNumberProps,
  RefineFieldTagProps,
  RefineFieldTextProps,
  RefineFieldUrlProps,
} from "@refinedev/ui-types";

import type { ConfigType } from "dayjs";

export type BooleanFieldProps = RefineFieldBooleanProps<
  unknown,
  Omit<TooltipProps, "title" | "children">,
  { svgIconProps?: SvgIconProps }
>;

export type DateFieldProps = RefineFieldDateProps<ConfigType, TypographyProps>;

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, LinkProps>;

export type FileFieldProps = RefineFieldFileProps<LinkProps>;

export type MarkdownFieldProps = RefineFieldMarkdownProps<string | undefined>;

export type NumberFieldProps = RefineFieldNumberProps<
  ReactChild,
  TypographyProps
>;

export type TagFieldProps = RefineFieldTagProps<ReactNode, ChipProps>;

export type TextFieldProps = RefineFieldTextProps<ReactNode, TypographyProps>;

export type UrlFieldProps = RefineFieldUrlProps<
  string | undefined,
  LinkProps & TypographyProps
>;
