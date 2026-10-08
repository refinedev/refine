import React, {
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type FC,
  type ReactNode,
} from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  ConfigProvider,
  Space,
  Typography,
  type AvatarProps,
  type BreadcrumbProps,
  type TagType,
} from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import { usePageHeaderStyle } from "./style";

/**
 * Props of the `<PageHeader>` component.
 *
 * Same shape as the `PageHeaderProps` of `@ant-design/pro-layout`, which
 * `<PageHeader>` was built on before the move to Ant Design v6.
 */
export interface PageHeaderProps {
  backIcon?: ReactNode;
  prefixCls?: string;
  title?: ReactNode;
  subTitle?: ReactNode;
  style?: CSSProperties;
  childrenContentStyle?: CSSProperties;
  breadcrumb?: Partial<BreadcrumbProps> | React.ReactElement<typeof Breadcrumb>;
  breadcrumbRender?: (
    props: PageHeaderProps,
    defaultDom: ReactNode,
  ) => ReactNode;
  tags?: React.ReactElement<TagType> | React.ReactElement<TagType>[];
  footer?: ReactNode;
  extra?: ReactNode;
  avatar?: AvatarProps;
  onBack?: (e?: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  contentWidth?: "Fluid" | "Fixed";
  layout?: string;
  ghost?: boolean;
  children?: ReactNode;
}

type BreadcrumbRoute = NonNullable<BreadcrumbProps["routes"]>[number];
type BreadcrumbItem = NonNullable<BreadcrumbProps["items"]>[number];

/** Header width (not viewport width) below which the heading may wrap. */
const COMPACT_WIDTH = 768;

const cx = (...classNames: (string | false | null | undefined)[]) =>
  classNames.filter(Boolean).join(" ");

const isBreadcrumbElement = (
  breadcrumb: PageHeaderProps["breadcrumb"],
): breadcrumb is React.ReactElement<typeof Breadcrumb> =>
  !!breadcrumb && typeof breadcrumb === "object" && "props" in breadcrumb;

/**
 * Converts the deprecated `routes` of `<Breadcrumb>` to `items`, the same way
 * `@ant-design/pro-layout` did: `breadcrumbName` becomes `title` and nested
 * `children` become a dropdown `menu`.
 */
const transformBreadcrumbRoutesToItems = (
  routes?: BreadcrumbRoute[],
): BreadcrumbItem[] | undefined =>
  routes?.map(({ breadcrumbName, children, ...route }) => ({
    ...route,
    title: route.title || breadcrumbName,
    ...(children?.length
      ? { menu: { items: transformBreadcrumbRoutesToItems(children) } }
      : {}),
  }));

/**
 * Layout part of `<PageHeader>`. Keeps the DOM structure and the
 * `ant-page-header-*` class names of `@ant-design/pro-layout`'s `PageHeader`.
 */
const BasePageHeader: FC<PageHeaderProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    style,
    childrenContentStyle,
    footer,
    children,
    breadcrumb,
    breadcrumbRender,
    className: customizeClassName,
    contentWidth,
    layout,
    ghost = true,
    title,
    subTitle,
    tags,
    extra,
    avatar,
    backIcon,
    onBack,
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls("page-header", customizePrefixCls);
  const headingPrefixCls = `${prefixCls}-heading`;
  const [hashId, cssVarCls] = usePageHeaderStyle(prefixCls);

  // `-compact` follows the width of the header itself, not the viewport, so a
  // header next to a sider wraps its heading as soon as it gets narrow.
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    if (!rootElement || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      setCompact(rootElement.getBoundingClientRect().width < COMPACT_WIDTH);
    });
    observer.observe(rootElement);
    return () => observer.disconnect();
  }, [rootElement]);

  let defaultBreadcrumbDom: ReactNode = null;
  if (breadcrumb && !isBreadcrumbElement(breadcrumb)) {
    // `routes` is not forwarded: `<Breadcrumb>` warns about it even next to `items`.
    const { routes, ...breadcrumbProps } = breadcrumb;
    const items =
      breadcrumbProps.items ?? transformBreadcrumbRoutesToItems(routes);
    if (items?.length) {
      defaultBreadcrumbDom = (
        <Breadcrumb
          {...breadcrumbProps}
          items={items}
          className={cx(`${prefixCls}-breadcrumb`, breadcrumbProps.className)}
        />
      );
    }
  }

  const breadcrumbDom: ReactNode = isBreadcrumbElement(breadcrumb)
    ? breadcrumb
    : breadcrumbRender?.({ ...props, prefixCls }, defaultBreadcrumbDom) ??
      defaultBreadcrumbDom;

  const backDom =
    backIcon && onBack ? (
      <div className={cx(`${prefixCls}-back`, hashId)}>
        <div
          role="button"
          aria-label="back"
          className={cx(`${prefixCls}-back-button`, hashId)}
          onClick={(e) => onBack(e)}
        >
          {backIcon}
        </div>
      </div>
    ) : null;

  const hasHeading = title || subTitle || tags || extra;
  const headingDom = hasHeading ? (
    <div className={cx(headingPrefixCls, hashId)}>
      <div className={cx(`${headingPrefixCls}-left`, hashId)}>
        {backDom}
        {avatar && (
          <Avatar
            {...avatar}
            className={cx(
              `${headingPrefixCls}-avatar`,
              hashId,
              avatar.className,
            )}
          />
        )}
        {title && (
          <span
            className={cx(`${headingPrefixCls}-title`, hashId)}
            title={typeof title === "string" ? title : undefined}
          >
            {title}
          </span>
        )}
        {subTitle && (
          <span
            className={cx(`${headingPrefixCls}-sub-title`, hashId)}
            title={typeof subTitle === "string" ? subTitle : undefined}
          >
            {subTitle}
          </span>
        )}
        {tags && (
          <span className={cx(`${headingPrefixCls}-tags`, hashId)}>{tags}</span>
        )}
      </div>
      {extra && (
        <span className={cx(`${headingPrefixCls}-extra`, hashId)}>
          <Space>{extra}</Space>
        </span>
      )}
    </div>
  ) : null;

  const childrenDom = children ? (
    <div
      className={cx(`${prefixCls}-content`, hashId)}
      style={childrenContentStyle}
    >
      {children}
    </div>
  ) : null;

  const footerDom = footer ? (
    <div className={cx(`${prefixCls}-footer`, hashId)}>{footer}</div>
  ) : null;

  if (!breadcrumbDom && !headingDom && !footerDom && !childrenDom) {
    return <div className={cx(hashId, `${prefixCls}-no-children`)} />;
  }

  return (
    <div
      ref={setRootElement}
      className={cx(
        prefixCls,
        hashId,
        cssVarCls,
        customizeClassName,
        !!breadcrumbDom && `${prefixCls}-has-breadcrumb`,
        !!footerDom && `${prefixCls}-has-footer`,
        direction === "rtl" && `${prefixCls}-rtl`,
        compact && `${prefixCls}-compact`,
        contentWidth === "Fixed" && layout === "top" && `${prefixCls}-wide`,
        ghost && `${prefixCls}-ghost`,
      )}
      style={style}
    >
      {breadcrumbDom}
      {headingDom}
      {childrenDom}
      {footerDom}
    </div>
  );
};

export const PageHeader: FC<PageHeaderProps> = ({ children, ...props }) => {
  const direction = useContext(ConfigProvider.ConfigContext)?.direction;
  const renderBackButton = () => {
    const BackIcon =
      direction === "rtl" ? ArrowRightOutlined : ArrowLeftOutlined;

    return <Button type="text" icon={<BackIcon />} />;
  };
  const backIcon =
    typeof props.backIcon === "undefined" ? renderBackButton() : props.backIcon;

  const title =
    typeof props.title === "string" ? (
      <Typography.Title
        className={RefinePageHeaderClassNames.Title}
        level={4}
        style={{ marginBottom: 0 }}
      >
        {props.title}
      </Typography.Title>
    ) : (
      props.title
    );

  const subtitle =
    typeof props.title === "string" ? (
      <Typography.Title
        className={RefinePageHeaderClassNames.SubTitle}
        level={5}
        type="secondary"
        style={{ marginBottom: 0 }}
      >
        {props.subTitle}
      </Typography.Title>
    ) : (
      props.subTitle
    );

  return (
    <BasePageHeader
      {...props}
      backIcon={backIcon}
      title={title}
      subTitle={subtitle}
      style={{ padding: 0, ...props.style }}
    >
      {children}
    </BasePageHeader>
  );
};
