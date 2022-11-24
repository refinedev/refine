import { ButtonProps, UploadProps } from "antd";
import {
    RefineCloneButtonProps,
    RefineCreateButtonProps,
    RefineDeleteButtonProps,
    RefineEditButtonProps,
    RefineExportButtonProps,
    RefineImportButtonProps,
    RefineListButtonProps,
    RefineRefreshButtonProps,
    RefineSaveButtonProps,
    RefineShowButtonProps,
} from "@pankod/refine-ui-types";

export type ShowButtonProps = RefineShowButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
         */
        resourceName?: string;
    }
>;

export type CloneButtonProps = RefineCloneButtonProps<
    ButtonProps,
    {
        /**
         * Resource name for API data interactions
         * @deprecated `resourceName` deprecated. Use `resourceNameOrRouteName` instead [Github Issue #1618](https://github.com/refinedev/refine/issues/1618)
         */
        resourceName?: string;
    }
>;

export type CreateButtonProps = RefineCreateButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
         */
        resourceName?: string;
    }
>;

export type DeleteButtonProps = RefineDeleteButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
         */
        resourceName?: string;
    }
>;

export type EditButtonProps = RefineEditButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
         */
        resourceName?: string;
    }
>;

export type ExportButtonProps = RefineExportButtonProps<ButtonProps>;

export type ImportButtonProps = RefineImportButtonProps & {
    /**
     * Sets the button type
     * @type [UploadProps](https://ant.design/components/upload/#API)
     */
    uploadProps: UploadProps;
    /**
     * Sets props of the button
     * @type [ButtonProps](https://ant.design/components/button/#API)
     */
    buttonProps: ButtonProps;
};

export type ListButtonProps = RefineListButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
         */
        resourceName?: string;
    }
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
         */
        resourceName?: string;
    }
>;

export type SaveButtonProps = RefineSaveButtonProps<ButtonProps>;
