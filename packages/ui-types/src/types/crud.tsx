import { PropsWithChildren } from "react";
import { BaseKey, MutationMode } from "@pankod/refine-core";

export type ActionButtonRenderer =
    | ((context: { defaultButtons: React.ReactNode }) => React.ReactNode)
    | React.ReactNode;

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
> = PropsWithChildren<{
    // Common Props
    title?: React.ReactNode;
    resource?: string;
    wrapperProps?: TWrapperProps;
    headerProps?: THeaderProps;
    contentProps?: TContentProps;
    breadcrumb?: React.ReactNode;
    // Header Action Buttons Props
    headerButtons?: ActionButtonRenderer;
    headerButtonProps?: THeaderButtonProps;
    // Crud List Props
    canCreate?: boolean;
    createButtonProps?: TCreateButtonProps;
}> &
    TExtraProps;

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
> = PropsWithChildren<{
    // Common Props
    title?: React.ReactNode;
    resource?: string;
    wrapperProps?: TWrapperProps;
    headerProps?: THeaderProps;
    contentProps?: TContentProps;
    breadcrumb?: React.ReactNode;
    // Back Props
    goBack?: React.ReactNode;
    // Header Action Buttons Props
    headerButtons?: ActionButtonRenderer;
    headerButtonProps?: THeaderButtonProps;
    // Footer Action Buttons Props
    footerButtons?: ActionButtonRenderer;
    footerButtonProps?: TFooterButtonProps;
    // Crud Create Props
    isLoading?: boolean;
    saveButtonProps?: TSaveButtonProps;
}> &
    TExtraProps;

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
> = PropsWithChildren<{
    // Common Props
    title?: React.ReactNode;
    resource?: string;
    wrapperProps?: TWrapperProps;
    headerProps?: THeaderProps;
    contentProps?: TContentProps;
    breadcrumb?: React.ReactNode;
    // Back Props
    goBack?: React.ReactNode;
    // Header Action Buttons Props
    headerButtons?: ActionButtonRenderer;
    headerButtonProps?: THeaderButtonProps;
    // Footer Action Buttons Props
    footerButtons?: ActionButtonRenderer;
    footerButtonProps?: TFooterButtonProps;
    // Data Provider Props
    dataProviderName?: string;
    // Crud Edit Props
    isLoading?: boolean;
    canDelete?: boolean;
    saveButtonProps?: TSaveButtonProps;
    deleteButtonProps?: TDeleteButtonProps;
    mutationMode?: MutationMode;
    recordItemId?: BaseKey;
}> &
    TExtraProps;

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
> = PropsWithChildren<{
    // Common Props
    title?: React.ReactNode;
    resource?: string;
    wrapperProps?: TWrapperProps;
    headerProps?: THeaderProps;
    contentProps?: TContentProps;
    breadcrumb?: React.ReactNode;
    // Back Props
    goBack?: React.ReactNode;
    // Header Action Buttons Props
    headerButtons?: ActionButtonRenderer;
    headerButtonProps?: THeaderButtonProps;
    // Footer Action Buttons Props
    footerButtons?: ActionButtonRenderer;
    footerButtonProps?: TFooterButtonProps;
    // Data Provider Props
    dataProviderName?: string;
    // Crud Show Props
    isLoading?: boolean;
    canDelete?: boolean;
    canEdit?: boolean;
    recordItemId?: BaseKey;
}> &
    TExtraProps;
