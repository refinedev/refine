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
    {}
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
    {}
>;
