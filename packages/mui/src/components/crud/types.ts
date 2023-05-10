import {
    CreateButtonProps,
    DeleteButtonProps,
    EditButtonProps,
    RefreshButtonProps,
    ListButtonProps,
    SaveButtonProps,
} from "../buttons/types";
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
} from "@refinedev/ui-types";

export type CreateProps = RefineCrudCreateProps<
    SaveButtonProps,
    BoxProps,
    CardActionsProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {}
>;

export type EditProps = RefineCrudEditProps<
    SaveButtonProps,
    DeleteButtonProps,
    BoxProps,
    CardActionsProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {},
    RefreshButtonProps,
    ListButtonProps
>;

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    BoxProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {}
>;

export type ShowProps = RefineCrudShowProps<
    BoxProps,
    CardActionsProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {},
    EditButtonProps,
    DeleteButtonProps,
    RefreshButtonProps,
    ListButtonProps
>;
