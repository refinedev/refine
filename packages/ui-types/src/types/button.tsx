import type { PropsWithChildren } from "react";
import type {
  BaseKey,
  DeleteOneResponse,
  IQueryKeys,
  MetaQuery,
  MutationMode,
  SuccessErrorNotification,
} from "@refinedev/core";

export type RefineButtonCommonProps = PropsWithChildren<{
  /**
   * Whether should hide the text and show only the icon or not.
   */
  hideText?: boolean;
}>;

export type RefineButtonResourceProps = {
  /**
   * Resource name for API data interactions
   * @default Reads `:resource` from the URL
   * @deprecated Please use `resource` instead.
   */
  resourceNameOrRouteName?: string;
  /**
   * Resource name for API data interactions. `identifier` of the resource can be used instead of the `name` of the resource.
   * @default Inferred resource name from the route
   */
  resource?: string;
  /**
   * Access Control configuration for the button
   * @default `{ enabled: true }`
   */
  accessControl?: {
    enabled?: boolean;
    hideIfUnauthorized?: boolean;
  };
};

export type RefineButtonLinkingProps = {
  /**
   * Sets the handler to handle click event
   */
  onClick?: React.PointerEventHandler<HTMLButtonElement>;
};

export type RefineButtonSingleProps = {
  /**
   * Data item identifier for the actions with the API
   * @default Reads `:id` from the URL
   */
  recordItemId?: BaseKey;
};

export type RefineButtonURLProps = {
  /**
   * `meta` property is used when creating the URL for the related action and path.
   */
  meta?: Record<string, unknown>;
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
  RefineButtonURLProps &
  TComponentProps &
  TExtraProps & {};

export type RefineCreateButtonProps<
  TComponentProps extends {} = Record<string, unknown>,
  TExtraProps extends {} = {},
> = RefineButtonCommonProps &
  RefineButtonResourceProps &
  RefineButtonLinkingProps &
  RefineButtonURLProps &
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
    /**
     * Callback function to be called after the delete action is successful
     */
    onSuccess?: (value: DeleteOneResponse) => void;
    /**
     * Mutation mode for the delete action
     * @default `mutationMode` setting from the `Refine` component
     */
    mutationMode?: MutationMode;
    /**
     * Additional meta data to pass to the delete mutation from the data provider
     */
    meta?: MetaQuery;
    /**
     * Additional meta data to pass to the delete mutation from the data provider
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * Target data provider name for API call to be made
     * @default `"default"`
     */
    dataProviderName?: string;
    /**
     * Text to be displayed in the confirmation popup
     * @default `"Are you sure?"` or `"buttons.confirm"` from the i18n provider
     */
    confirmTitle?: string;
    /**
     * Confirmation button text to be displayed in the confirmation popup
     * @default `"Delete"` or `"buttons.delete"` from the i18n provider
     */
    confirmOkText?: string;
    /**
     * Cancel button text to be displayed in the confirmation popup
     * @default `"Cancel"` or `"buttons.cancel"` from the i18n provider
     */
    confirmCancelText?: string;
    /**
     * Query keys to be invalidated after the delete action is successful
     * @default `["list", "many"]`
     */
    invalidates?: Array<keyof IQueryKeys>;
  };

export type RefineEditButtonProps<
  TComponentProps extends {} = Record<string, unknown>,
  TExtraProps extends {} = {},
> = RefineButtonCommonProps &
  RefineButtonResourceProps &
  RefineButtonLinkingProps &
  RefineButtonSingleProps &
  RefineButtonURLProps &
  TComponentProps &
  TExtraProps & {};

export type RefineExportButtonProps<
  TComponentProps extends {} = Record<string, unknown>,
  TExtraProps extends {} = {},
> = RefineButtonCommonProps &
  RefineButtonLinkingProps &
  TComponentProps &
  TExtraProps & {
    /**
     * Set the loading status of button
     */
    loading?: boolean;
  };

export type RefineImportButtonProps<
  TComponentProps extends {} = Record<string, unknown>,
  TExtraProps extends {} = {},
> = RefineButtonCommonProps &
  TComponentProps &
  TExtraProps & {
    /**
     * Set the loading status of button
     */
    loading?: boolean;
  };

export type RefineListButtonProps<
  TComponentProps extends {} = Record<string, unknown>,
  TExtraProps extends {} = {},
> = RefineButtonCommonProps &
  RefineButtonResourceProps &
  RefineButtonLinkingProps &
  RefineButtonURLProps &
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
    /**
     * `meta` is deprecated with refine@4, <RefreshButton /> will use `useInvalidates` instead of `useOne`.
     * @deprecated `meta` is deprecated with refine@4, <RefreshButton /> will use `useInvalidates` instead of `useOne`.
     */
    meta?: MetaQuery;
    /**
     * `metaData` is deprecated with refine@4, <RefreshButton /> will use `useInvalidates` instead of `useOne`.
     * @deprecated `metaData` is deprecated with refine@4, <RefreshButton /> will use `useInvalidates` instead of `useOne`.
     */
    metaData?: MetaQuery;
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
  RefineButtonURLProps &
  TComponentProps &
  TExtraProps & {};
