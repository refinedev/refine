import type { ComponentType, ReactNode } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ILogData } from "../auditLog/types";

/**
 * Resource route components
 */
export type ResourceRouteComponent = ComponentType<
  IResourceComponentsProps<any, any>
>;

export type ResourceRoutePath = string;

export type ResourceRouteDefinition = {
  path: ResourceRoutePath;
  component: ResourceRouteComponent;
};

export type ResourceRouteComposition =
  | ResourceRouteDefinition
  | ResourceRoutePath
  | ResourceRouteComponent;

export interface IResourceComponents {
  list?: ResourceRouteComposition;
  create?: ResourceRouteComposition;
  clone?: ResourceRouteComposition;
  edit?: ResourceRouteComposition;
  show?: ResourceRouteComposition;
}

export type AnyString = string & { __ignore?: never };

export type ResourceAuditLogPermissions =
  | "create"
  | "update"
  | "delete"
  | AnyString;

/** Resource `meta` */
export interface KnownResourceMeta {
  label?: string;
  hide?: boolean;
  dataProviderName?: string;
  parent?: string;
  canDelete?: boolean;
  audit?: ResourceAuditLogPermissions[];
  icon?: ReactNode;
}

export interface DeprecatedOptions {
  auditLog?: {
    permissions?: ResourceAuditLogPermissions[];
  };
  route?: string;
}

export interface ResourceMeta extends KnownResourceMeta {
  [key: string]: any;
}

export interface ResourceProps extends IResourceComponents {
  name: string;
  identifier?: string;
  key?: string;
  options?: ResourceMeta & DeprecatedOptions;
  meta?: ResourceMeta & DeprecatedOptions;
  canDelete?: boolean;
  icon?: ReactNode;
  parentName?: string;

  /**
   * ✅ New: Allows defining additional custom routes for this resource.
   * Example:
   * custom: [
   *   { path: "dashboard", component: DashboardPage },
   *   { path: "stats", component: StatsPage }
   * ]
   */
  custom?: Array<{ path: string; component: ComponentType<any> }>;
}

export interface RouteableProperties {
  canCreate?: boolean;
  canEdit?: boolean;
  canShow?: boolean;
  canDelete?: boolean;
  canList?: boolean;
}

export interface IResourceComponentsProps<
  TCrudData = any,
  TLogQueryResult = ILogData,
> extends RouteableProperties {
  name?: string;
  initialData?: TCrudData;
  options?: ResourceMeta & DeprecatedOptions;
  logQueryResult?: UseQueryResult<TLogQueryResult>;
}

export interface IResourceItem
  extends IResourceComponents,
    RouteableProperties,
    ResourceProps {
  /**
   * @deprecated Please use the `meta.label` property instead.
   */
  label?: string;
  /**
   * @deprecated Please use action components and `getDefaultActionPath` helper instead.
   */
  route?: string;

  /**
   * ✅ Custom non-CRUD routes for this resource.
   */
  custom?: Array<{ path: string; component: ComponentType<any> }>;
}

export interface IResourceContext {
  resources: IResourceItem[];
}

export type ResourceBindings = ResourceProps[];

type MetaProps<TExtends = { [key: string]: any }> = ResourceMeta & TExtends;

export interface IResourceContext {
  resources: IResourceItem[];
}

/* Backward compatible version of 'TreeMenuItem' */
export type ITreeMenu = IResourceItem & {
  key?: string;
  children: ITreeMenu[];
};

export type IMenuItem = IResourceItem & {
  key: string;
  route: string;
};
