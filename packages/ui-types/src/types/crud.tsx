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
    /**
     * Title of the create view
     * @default `"Create {resource.name}"`
     */
    title?: React.ReactNode;
    /**
     * Resource name for API data interactions
     * @default Reads `:resource` from the URL
     */
    resource?: string;
    /**
     * Props for the wrapper component of the view
     */
    wrapperProps?: TWrapperProps;
    /**
     * Props for the header component
     */
    headerProps?: THeaderProps;
    /**
     * Props for the content wrapper component
     */
    contentProps?: TContentProps;
    /**
     * Breadcrumb to be displayed in the header
     * @default `<Breadcrumb />`
     */
    breadcrumb?: React.ReactNode;
    /**
     * Back button element at the top left of the page
     */
    goBack?: React.ReactNode;
    /**
     * Header action buttons to be displayed in the header
     * @default `null`
     */
    headerButtons?: ActionButtonRenderer;
    /**
     * Additional props to be passed to the wrapper of the header buttons
     */
    headerButtonProps?: THeaderButtonProps;
    /**
     * Footer action buttons to be displayed in the footer
     * @default `<SaveButton />`
     */
    footerButtons?: ActionButtonRenderer;
    /**
     * Additional props to be passed to the wrapper of the footer buttons
     */
    footerButtonProps?: TFooterButtonProps;
    /**
     * Loading state of the component
     */
    isLoading?: boolean;
    /**
     * Additional props for the `<SaveButton />` component
     */
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
    /**
     * Title of the edit view
     * @default `"Edit {resource.name}"`
     */
    title?: React.ReactNode;
    /**
     * Resource name for API data interactions
     * @default Reads `:resource` from the URL
     */
    resource?: string;
    /**
     * Props for the wrapper component of the view
     */
    wrapperProps?: TWrapperProps;
    /**
     * Props for the header component
     */
    headerProps?: THeaderProps;
    /**
     * Props for the content wrapper component
     */
    contentProps?: TContentProps;
    /**
     * Breadcrumb to be displayed in the header
     * @default `<Breadcrumb />`
     */
    breadcrumb?: React.ReactNode;
    /**
     * Back button element at the top left of the page
     */
    goBack?: React.ReactNode;
    /**
     * Header action buttons to be displayed in the header
     * @default If `recordItemId` is present `<RefreshButton />` otherwise `<RefreshButton /> <ListButton />`
     */
    headerButtons?: ActionButtonRenderer;
    /**
     * Additional props to be passed to the wrapper of the header buttons
     */
    headerButtonProps?: THeaderButtonProps;
    /**
     * Footer action buttons to be displayed in the footer
     * @default If `canDelete` is present `<SaveButton /> <ListButton />` otherwise `<SaveButton />`
     */
    footerButtons?: ActionButtonRenderer;
    /**
     * Additional props to be passed to the wrapper of the footer buttons
     */
    footerButtonProps?: TFooterButtonProps;
    /**
     * To specify a data provider other than default use this property
     */
    dataProviderName?: string;
    /**
     * Loading state of the component
     * @default `false`
     */
    isLoading?: boolean;
    /**
     * Adds a `<DeleteButton />`
     */
    canDelete?: boolean;
    /**
     * Additional props for the `<SaveButton />` component
     */
    saveButtonProps?: TSaveButtonProps;
    /**
     * Adds properties for `<DeleteButton />`
     */
    deleteButtonProps?: TDeleteButtonProps;
    /**
     * [Determines when mutations are executed](/advanced-tutorials/mutation-mode.md)
     * @default pessimistic
     */
    mutationMode?: MutationMode;
    /**
     * The record id for `<RefreshButton />`
     */
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
