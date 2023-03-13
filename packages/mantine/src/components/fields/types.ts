import { ReactChild, ReactNode } from "react";
import { AnchorProps, ChipProps, TextProps, TooltipProps } from "@mantine/core";
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
import { ReactMarkdownOptions } from "react-markdown";

export type BooleanFieldProps = RefineFieldBooleanProps<
    unknown,
    Omit<TooltipProps, "label" | "children">,
    { svgIconProps?: TablerIconProps }
>;

export type DateFieldProps = RefineFieldDateProps<ConfigType, TextProps>;

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, AnchorProps>;

export type FileFieldProps = RefineFieldFileProps<TextProps>;

export type MarkdownFieldProps = RefineFieldMarkdownProps<
    string | undefined,
    Partial<ReactMarkdownOptions>
>;

export type NumberFieldProps = RefineFieldNumberProps<ReactChild, TextProps>;

export type TagFieldProps = RefineFieldTagProps<
    ReactNode,
    Omit<ChipProps, "children">
>;

export type TextFieldProps = RefineFieldTextProps<ReactNode, TextProps>;

export type UrlFieldProps = RefineFieldUrlProps<
    string | undefined,
    AnchorProps & TextProps,
    {
        title?: string;
    }
>;
