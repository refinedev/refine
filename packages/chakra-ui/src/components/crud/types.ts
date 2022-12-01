import { BoxProps, StackProps } from "@chakra-ui/react";
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
    BoxProps,
    BoxProps,
    StackProps,
    BoxProps,
    BoxProps
>;

export type EditProps = RefineCrudEditProps<
    SaveButtonProps,
    DeleteButtonProps,
    BoxProps,
    BoxProps,
    BoxProps,
    BoxProps,
    BoxProps
>;

export type ListProps = RefineCrudListProps<
    CreateButtonProps,
    BoxProps,
    BoxProps,
    BoxProps,
    BoxProps
>;

export type ShowProps = RefineCrudShowProps<
    BoxProps,
    BoxProps,
    BoxProps,
    BoxProps,
    BoxProps
>;
