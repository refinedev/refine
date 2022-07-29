import { PropsWithChildren } from "react";
import {
    BaseKey,
    DeleteOneResponse,
    IQueryKeys,
    MetaDataQuery,
    MutationMode,
    SuccessErrorNotification,
} from "@pankod/refine-core";

export type RefineButtonCommonProps = PropsWithChildren<{
    hideText?: boolean;
}>;

export type RefineButtonResourceProps = {
    resourceNameOrRouteName?: string;
    ignoreAccessControlProvider?: boolean;
};

export type RefineButtonLinkingProps = {
    onClick?: React.PointerEventHandler<HTMLButtonElement>;
};

export type RefineButtonSingleProps = {
    recordItemId?: BaseKey;
};

export type RefineButtonDataProps = {
    dataProviderName?: string;
};

export type RefineCloneButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonLinkingProps &
    RefineButtonSingleProps &
    TComponentProps &
    TExtraProps & {};

export type RefineCreateButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonLinkingProps &
    TComponentProps &
    TExtraProps & {};

export type RefineDeleteButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonSingleProps &
    SuccessErrorNotification &
    TComponentProps &
    TExtraProps & {
        onSuccess?: (value: DeleteOneResponse) => void;
        mutationMode?: MutationMode;
        hideText?: boolean;
        metaData?: MetaDataQuery;
        dataProviderName?: string;
        confirmTitle?: string;
        confirmOkText?: string;
        confirmCancelText?: string;
        invalidates?: Array<keyof IQueryKeys>;
    };

export type RefineEditButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonLinkingProps &
    RefineButtonSingleProps &
    TComponentProps &
    TExtraProps & {};

export type RefineExportButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    RefineButtonLinkingProps &
    TComponentProps &
    TExtraProps & {
        loading?: boolean;
    };

export type RefineImportButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    TComponentProps &
    TExtraProps & {
        loading?: boolean;
    };

export type RefineListButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonLinkingProps &
    TComponentProps &
    TExtraProps & {};

export type RefineRefreshButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonSingleProps &
    RefineButtonDataProps &
    RefineButtonLinkingProps &
    TComponentProps &
    TExtraProps & {
        metaData?: MetaDataQuery;
    };

export type RefineSaveButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    RefineButtonLinkingProps &
    TComponentProps &
    TExtraProps & {};

export type RefineShowButtonProps<
    TComponentProps extends {} = Record<string, unknown>,
    TExtraProps extends {} = {},
> = RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps &
    TComponentProps &
    TExtraProps & {};
