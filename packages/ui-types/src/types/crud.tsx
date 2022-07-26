import { BaseKey, MutationMode } from "@pankod/refine-core";

export type RefineCrudCommonProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    THeaderProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = {
    title?: string;
    resource?: string;
    wrapperProps?: TWrapperProps;
    headerProps?: THeaderProps;
    contentProps?: TContentProps;
    breadcrumb?: React.ReactNode;
} & TExtraProps;

export type RefineCrudDataProps = {
    dataProviderName?: string;
};

export type RefineCrudHeaderButtonProps<
    THeaderButtonProps extends {} = Record<keyof any, unknown>,
> = {
    headerButtons?: React.ReactNode;
    headerButtonProps?: THeaderButtonProps;
};

export type RefineCrudFooterButtonProps<
    TFooterButtonProps extends {} = Record<keyof any, unknown>,
> = {
    footerButtons?: React.ReactNode;
    footerButtonProps?: TFooterButtonProps;
};

/**
 * This should be the base type for `List` crud component implementations in UI integrations.
 */
export type RefineCrudListProps<
    TCreateButtonProps extends {} = Record<keyof any, unknown>,
    THeaderButtonProps extends {} = Record<keyof any, unknown>,
    TWrapperProps extends {} = Record<keyof any, unknown>,
    THeaderProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = RefineCrudCommonProps<
    TWrapperProps,
    THeaderProps,
    TContentProps,
    TExtraProps
> &
    RefineCrudHeaderButtonProps<THeaderButtonProps> & {
        canCreate?: boolean;
        createButtonProps?: TCreateButtonProps;
    };

/**
 * This should be the base type for `Create` crud component implementations in UI integrations.
 */
export type RefineCrudCreateProps<
    TSaveButtonProps extends {} = Record<keyof any, unknown>,
    THeaderButtonProps extends {} = Record<keyof any, unknown>,
    TFooterButtonProps extends {} = Record<keyof any, unknown>,
    TWrapperProps extends {} = Record<keyof any, unknown>,
    THeaderProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = RefineCrudCommonProps<
    TWrapperProps,
    THeaderProps,
    TContentProps,
    TExtraProps
> &
    RefineCrudHeaderButtonProps<THeaderButtonProps> &
    RefineCrudFooterButtonProps<TFooterButtonProps> & {
        isLoading?: boolean;
        saveButtonProps?: TSaveButtonProps;
    };

/**
 * This should be the base type for `Edit` crud component implementations in UI integrations.
 */
export type RefineCrudEditProps<
    TSaveButtonProps extends {} = Record<keyof any, unknown>,
    TDeleteButtonProps extends {} = Record<keyof any, unknown>,
    THeaderButtonProps extends {} = Record<keyof any, unknown>,
    TFooterButtonProps extends {} = Record<keyof any, unknown>,
    TWrapperProps extends {} = Record<keyof any, unknown>,
    THeaderProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = RefineCrudCommonProps<
    TWrapperProps,
    THeaderProps,
    TContentProps,
    TExtraProps
> &
    RefineCrudHeaderButtonProps<THeaderButtonProps> &
    RefineCrudFooterButtonProps<TFooterButtonProps> &
    RefineCrudDataProps & {
        isLoading?: boolean;
        canDelete?: boolean;
        saveButtonProps?: TSaveButtonProps;
        deleteButtonProps?: TDeleteButtonProps;
        mutationMode?: MutationMode;
        recordItemId?: BaseKey;
    };

/**
 * This should be the base type for `Show` crud component implementations in UI integrations.
 */
export type RefineCrudShowProps<
    THeaderButtonProps extends {} = Record<keyof any, unknown>,
    TFooterButtonProps extends {} = Record<keyof any, unknown>,
    TWrapperProps extends {} = Record<keyof any, unknown>,
    THeaderProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = RefineCrudCommonProps<
    TWrapperProps,
    THeaderProps,
    TContentProps,
    TExtraProps
> &
    RefineCrudHeaderButtonProps<THeaderButtonProps> &
    RefineCrudFooterButtonProps<TFooterButtonProps> &
    RefineCrudDataProps & {
        isLoading?: boolean;
        canDelete?: boolean;
        canEdit?: boolean;
        recordItemId?: BaseKey;
    };
