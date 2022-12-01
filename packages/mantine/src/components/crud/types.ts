import {
    CreateButtonProps,
    DeleteButtonProps,
    SaveButtonProps,
} from "@components/buttons";
import { BoxProps, CardProps, GroupProps } from "@mantine/core";
import {
    RefineCrudCreateProps,
    RefineCrudEditProps,
    RefineCrudListProps,
    RefineCrudShowProps,
} from "@pankod/refine-ui-types";

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    GroupProps,
    CardProps,
    GroupProps,
    BoxProps
>;

export type ShowProps = RefineCrudShowProps<
    GroupProps,
    GroupProps,
    CardProps,
    GroupProps,
    BoxProps
>;

export type CreateProps = RefineCrudCreateProps<
    SaveButtonProps,
    GroupProps,
    GroupProps,
    CardProps,
    GroupProps,
    BoxProps
>;

export type EditProps = RefineCrudEditProps<
    SaveButtonProps,
    DeleteButtonProps,
    GroupProps,
    GroupProps,
    CardProps,
    GroupProps,
    BoxProps
>;
