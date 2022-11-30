import {
    CreateButtonProps,
    DeleteButtonProps,
    SaveButtonProps,
} from "@components/buttons";
import {
    BoxProps,
    CardActionsProps,
    CardContentProps,
    CardHeaderProps,
    CardProps,
} from "@mui/material";
import {
    RefineCrudCreateProps,
    RefineCrudEditProps,
    RefineCrudListProps,
    RefineCrudShowProps,
} from "@pankod/refine-ui-types";

export type CreateProps = RefineCrudCreateProps<
    SaveButtonProps,
    BoxProps,
    CardActionsProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {
        /**
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * @deprecated use `wrapperProps` instead.
         */
        cardProps?: CardProps;
        /**
         * @deprecated use `headerProps` instead.
         */
        cardHeaderProps?: CardHeaderProps;
        /**
         * @deprecated use `contentProps` instead.
         */
        cardContentProps?: CardContentProps;
        /**
         * @deprecated use `footerButtonProps` instead.
         */
        cardActionsProps?: CardActionsProps;
    }
>;

export type EditProps = RefineCrudEditProps<
    SaveButtonProps,
    DeleteButtonProps,
    BoxProps,
    CardActionsProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {
        /**
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * @deprecated use `wrapperProps` instead.
         */
        cardProps?: CardProps;
        /**
         * @deprecated use `headerProps` instead.
         */
        cardHeaderProps?: CardHeaderProps;
        /**
         * @deprecated use `contentProps` instead.
         */
        cardContentProps?: CardContentProps;
        /**
         * @deprecated use `footerButtonProps` instead.
         */
        cardActionsProps?: CardActionsProps;
    }
>;

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    BoxProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {
        /**
         * @deprecated use `wrapperProps` instead.
         */
        cardProps?: CardProps;
        /**
         * @deprecated use `headerProps` instead.
         */
        cardHeaderProps?: CardHeaderProps;
        /**
         * @deprecated use `contentProps` instead.
         */
        cardContentProps?: CardContentProps;
    }
>;

export type ShowProps = RefineCrudShowProps<
    BoxProps,
    CardActionsProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {
        /**
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * @deprecated use `wrapperProps` instead.
         */
        cardProps?: CardProps;
        /**
         * @deprecated use `headerProps` instead.
         */
        cardHeaderProps?: CardHeaderProps;
        /**
         * @deprecated use `contentProps` instead.
         */
        cardContentProps?: CardContentProps;
        /**
         * @deprecated use `footerButtonProps` instead.
         */
        cardActionsProps?: CardActionsProps;
    }
>;
