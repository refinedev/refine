import { ReactChild, ReactNode } from "react";
import {
    ChipProps,
    LinkProps,
    SvgIconProps,
    TooltipProps,
    TypographyProps,
} from "@mui/material";
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
import { ConfigType } from "dayjs";

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
