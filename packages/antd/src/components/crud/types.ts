import { CardProps, PageHeaderProps, SpaceProps } from "@components/antd";
import {
    CreateButtonProps,
    DeleteButtonProps,
    SaveButtonProps,
} from "@components/buttons";
import {
    RefineCrudCreateProps,
    RefineCrudEditProps,
    RefineCrudListProps,
    RefineCrudShowProps,
} from "@pankod/refine-ui-types";

export type CreateProps = RefineCrudCreateProps<
    SaveButtonProps,
    SpaceProps,
    SpaceProps,
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps,
    CardProps,
    {
        /**
         * Action buttons node at the top of the view
         * @default `<SaveButton />`
         *
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * Additional props to be passed to the `PageHeader` component
         *
         * @deprecated use `headerProps`, `wrapperProps` and `contentProps` instead.
         */
        pageHeaderProps?: PageHeaderProps;
    }
>;

export type EditProps = RefineCrudEditProps<
    SaveButtonProps,
    DeleteButtonProps,
    SpaceProps,
    SpaceProps,
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps,
    CardProps,
    {
        /**
         * Action buttons node at the bottom of the view
         * @default `<DeleteButton />` and `<SaveButton />`
         *
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * Additional props to be passed to the `PageHeader` component
         *
         * @deprecated use `headerProps`, `wrapperProps` and `contentProps` instead.
         */
        pageHeaderProps?: PageHeaderProps;
    }
>;

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    SpaceProps,
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps,
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    {
        /**
         * @deprecated use `headerProps`, `wrapperProps` and `contentProps` instead.
         */
        pageHeaderProps?: PageHeaderProps;
    }
>;

export type ShowProps = RefineCrudShowProps<
    SpaceProps,
    SpaceProps,
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps,
    CardProps,
    {
        /**
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * @deprecated use `headerProps`, `wrapperProps` and `contentProps` instead.
         */
        pageHeaderProps?: PageHeaderProps;
    }
>;
