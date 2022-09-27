import { ReactNode } from "react";
import { ConfigType } from "dayjs";

export type RefineFieldCommonProps<T = unknown> = {
    value: T;
};

export type RefineFieldTooltipProps = {
    children?: React.ReactElement;
    title?: NonNullable<React.ReactNode>;
};

export type RefineFieldBooleanProps<
    TValueType = boolean,
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> &
    RefineFieldTooltipProps &
    TComponentProps &
    TExtraProps & {
        valueLabelTrue?: string;
        valueLabelFalse?: string;
        trueIcon?: ReactNode;
        falseIcon?: ReactNode;
    };

export type RefineFieldDateProps<
    TValueType = ConfigType,
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> &
    TComponentProps &
    TExtraProps & {
        locales?: string;
        format?: string;
    };

export type RefineFieldEmailProps<
    TValueType = React.ReactNode,
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldFileProps<
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = TComponentProps &
    TExtraProps & {
        title?: string;
        src: string;
    };

export type RefineFieldImageProps<
    TValueType = string | undefined,
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldMarkdownProps<
    TValueType = string | undefined,
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldNumberProps<
    TValueType = React.ReactNode,
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> &
    TComponentProps &
    TExtraProps & {
        locale?: string | string[];
        options?: Intl.NumberFormatOptions;
    };

export type RefineFieldTagProps<
    TValueType = React.ReactNode,
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldTextProps<
    TValueType = React.ReactNode,
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldUrlProps<
    TValueType = string | undefined,
    TComponentProps extends {} = {},
    TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};
