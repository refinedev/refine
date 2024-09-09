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
  /**
   * This is used when setting the document title, in breadcrumbs and `<Sider />` components.
   * Therefore it will only work if the related components have implemented the `label` property.
   */
  label?: string;
  /**
   * Whether to hide the resource from the sidebar or not.
   * This property is checked by the `<Sider />` components.
   * Therefore it will only work if the `<Sider />` component has implemented the `hide` property.
   */
  hide?: boolean;
  /**
   * Dedicated data provider name for the resource.
   * If not set, the default data provider will be used.
   * You can use this property to pick a data provider for a resource when you have multiple data providers.
   */
  dataProviderName?: string;
  /**
   * To nest a resource under another resource, set the parent property to the name of the parent resource.
   * This will work even if the parent resource is not explicitly defined.
   */
  parent?: string;
  /**
   * To determine if the resource has ability to delete or not.
   */
  canDelete?: boolean;
  /**
   * To permit the audit log for actions on the resource.
   * @default All actions are permitted to be logged.
   */
  audit?: ResourceAuditLogPermissions[];
  /**
   * To pass `icon` to the resource.
   */
  icon?: ReactNode;
}

export interface DeprecatedOptions {
  /**
   * @deprecated Please use `audit` property instead.
   */
  auditLog?: {
    permissions?: ResourceAuditLogPermissions[];
  };
  /**
   * @deprecated Define the route in the resource components instead
   */
  route?: string;
}

export interface ResourceMeta extends KnownResourceMeta {
  [key: string]: any;
}

export interface ResourceProps extends IResourceComponents {
  name: string;
  /**
   * This property can be used to identify a resource. In some cases, `name` of the resource might be repeated in different resources.
   * To avoid conflicts, you pass the `identifier` property to be used as the key of the resource.
   * @default `name` of the resource
   */
  identifier?: string;
  /**
   * @deprecated This property is not used anymore.
   */
  key?: string;
  /**
   * @deprecated Please use the `meta` property instead.
   */
  options?: ResourceMeta & DeprecatedOptions;
  /**
   * To configure the resource, you can set `meta` properties. You can use `meta` to store any data related to the resource.
   * There are some known `meta` properties that are used by the core and extension packages.
   */
  meta?: ResourceMeta & DeprecatedOptions;
  /**
   * @deprecated Please use the `meta.canDelete` property instead.
   */
  canDelete?: boolean;
  /**
   * @deprecated Please use the `meta.icon` property instead
   */
  icon?: ReactNode;
  /**
   * @deprecated Please use the `meta.parent` property instead
   */
  parentName?: string;
}

export interface RouteableProperties {
  /**
   * @deprecated Please use action props instead.
   */
  canCreate?: boolean;
  /**
   * @deprecated Please use action props instead.
   */
  canEdit?: boolean;
  /**
   * @deprecated Please use action props instead.
   */
  canShow?: boolean;
  /**
   * @deprecated Please use the `meta.canDelete` property instead.
   */
  canDelete?: boolean;
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
}

export interface IResourceContext {
  resources: IResourceItem[];
}

export type ResourceBindings = ResourceProps[];

type MetaProps<TExtends = { [key: string]: any }> = ResourceMeta & TExtends;

export interface RouteableProperties {
  canCreate?: boolean;
  canEdit?: boolean;
  canShow?: boolean;
  canDelete?: boolean;
  canList?: boolean;
}

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
