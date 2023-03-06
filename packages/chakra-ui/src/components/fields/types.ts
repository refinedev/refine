import { ReactChild, ReactNode } from "react";
import { LinkProps, TagProps, TextProps, TooltipProps } from "@chakra-ui/react";
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
import { TablerIconProps } from "@tabler/icons";
import { ConfigType } from "dayjs";

export type BooleanFieldProps = RefineFieldBooleanProps<
    unknown,
    Omit<TooltipProps, "label" | "children">,
    { svgIconProps?: TablerIconProps }
>;

export type DateFieldProps = RefineFieldDateProps<ConfigType, TextProps>;

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, LinkProps>;

export type FileFieldProps = RefineFieldFileProps<LinkProps>;

export type MarkdownFieldProps = RefineFieldMarkdownProps<string | undefined>;

export type NumberFieldProps = RefineFieldNumberProps<ReactChild, TextProps>;

export type TagFieldProps = RefineFieldTagProps<ReactNode, TagProps>;

export type TextFieldProps = RefineFieldTextProps<ReactNode, TextProps>;

export type UrlFieldProps = RefineFieldUrlProps<
    string | undefined,
    LinkProps,
    {
        title?: string;
    }
>;
