import {
  CreateButtonProps,
  DeleteButtonProps,
  EditButtonProps,
  RefreshButtonProps,
  ListButtonProps,
  SaveButtonProps,
} from "../buttons/types";

import type { BoxProps } from "@mui/material/Box/index.js";
import type { CardActionsProps } from "@mui/material/CardActions/index.js";
import type { CardContentProps } from "@mui/material/CardContent/index.js";
import type { CardHeaderProps } from "@mui/material/CardHeader/index.js";
import type { CardProps } from "@mui/material/Card/index.js";

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
