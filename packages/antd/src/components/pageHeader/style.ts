import type { CSSObject } from "@ant-design/cssinjs";
import { type FullToken, genStyleUtils } from "@ant-design/cssinjs-utils";
import { ConfigProvider, theme, type GlobalToken } from "antd";
import { useContext } from "react";

// No component tokens; optional like antd's own `ComponentTokenMap` entries.
type ComponentTokenMap = { RefinePageHeader?: object };
type PageHeaderToken = FullToken<
  ComponentTokenMap,
  GlobalToken,
  "RefinePageHeader"
>;

/**
 * Style hook factory configured like antd's own
 * (`antd/es/theme/util/genStyleUtils`), so the styles are registered the way
 * antd registers its components':
 * - with the antd `hashId` (`:where(.css-…)`, user CSS keeps winning),
 * - in the `antd` layer when `<StyleProvider layer>` is used,
 * - reading the theme through CSS variables (`var(--ant-color-text)`). The
 *   variables are declared on the `cssVar.key` class of the closest
 *   `<ConfigProvider theme>`, so one registered style serves every theme,
 *   including nested ones, as long as the root carries that class.
 */
const { genStyleHooks } = genStyleUtils<
  ComponentTokenMap,
  GlobalToken,
  GlobalToken
>({
  usePrefix: () => {
    const { getPrefixCls, iconPrefixCls } = useContext(
      ConfigProvider.ConfigContext,
    );
    return {
      rootPrefixCls: getPrefixCls(),
      iconPrefixCls: iconPrefixCls ?? "",
    };
  },
  useToken: () => {
    const { getPrefixCls, theme: themeConfig } = useContext(
      ConfigProvider.ConfigContext,
    );
    // `cssVar` of `theme.useToken()` is the token made of `var(--ant-*)`
    // references, the one antd's style hooks receive as `token`.
    const {
      theme: antdTheme,
      token: realToken,
      hashId,
      cssVar: cssVarToken,
    } = theme.useToken();
    // Same defaults as `antd/es/theme/useToken`.
    const cssVar = {
      prefix: themeConfig?.cssVar?.prefix ?? getPrefixCls(),
      key: themeConfig?.cssVar?.key ?? "css-var-root",
    };
    return { theme: antdTheme, realToken, hashId, token: cssVarToken, cssVar };
  },
  useCSP: () => useContext(ConfigProvider.ConfigContext).csp ?? {},
});

const textOverflowEllipsis: CSSObject = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

/**
 * Same rules as the `PageHeader` style of `@ant-design/pro-layout` (7.x),
 * which `<PageHeader>` was built on before the move to Ant Design v6.
 *
 * Styles are class based (not inline) so that users' CSS targeting the
 * `ant-page-header*` classes keeps overriding them.
 */
const genPageHeaderStyle = (token: PageHeaderToken): CSSObject => ({
  [token.componentCls]: {
    // `resetComponent`
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    color: token.colorText,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    listStyle: "none",

    position: "relative",
    // pro-layout used `colorWhite`, which ignores the dark algorithm.
    backgroundColor: token.colorBgContainer,
    paddingBlock: 4 + 2,
    paddingInline: 16,

    "&&-ghost": {
      backgroundColor: "transparent",
    },
    "&&-has-breadcrumb": {
      paddingBlockStart: token.paddingSM,
    },
    "&&-has-footer": {
      paddingBlockEnd: 0,
    },
    "& &-back": {
      marginInlineEnd: token.margin,
      fontSize: 16,
      lineHeight: 1,
      "&-button": {
        fontSize: 16,
        // `operationUnit`
        color: token.colorTextHeading,
        outline: "none",
        cursor: "pointer",
        transition: `color ${token.motionDurationSlow}`,
        "&:focus, &:hover": {
          color: token.colorLinkHover,
        },
        "&:active": {
          color: token.colorLinkActive,
        },
      },
    },
    [`& ${token.antCls}-divider-vertical`]: {
      height: 14,
      marginBlock: 0,
      marginInline: token.marginSM,
      verticalAlign: "middle",
    },
    "& &-breadcrumb + &-heading": {
      marginBlockStart: token.marginXS,
    },
    "& &-heading": {
      display: "flex",
      justifyContent: "space-between",
      "&-left": {
        display: "flex",
        alignItems: "center",
        marginBlock: token.calc(token.marginXS).div(2).equal(),
        marginInlineEnd: 0,
        marginInlineStart: 0,
        overflow: "hidden",
      },
      "&-title": {
        marginInlineEnd: token.marginSM,
        marginBlockEnd: 0,
        color: token.colorTextHeading,
        fontWeight: 600,
        fontSize: token.fontSizeHeading4,
        lineHeight: token.controlHeight,
        ...textOverflowEllipsis,
      },
      "&-avatar": {
        marginInlineEnd: token.marginSM,
      },
      "&-sub-title": {
        marginInlineEnd: token.marginSM,
        color: token.colorTextSecondary,
        fontSize: 14,
        lineHeight: token.lineHeight,
        ...textOverflowEllipsis,
      },
      "&-extra": {
        marginBlock: token.calc(token.marginXS).div(2).equal(),
        marginInlineEnd: 0,
        marginInlineStart: 0,
        whiteSpace: "nowrap",
        "> *": {
          whiteSpace: "unset",
        },
      },
    },
    "&-content": {
      paddingBlockStart: token.paddingSM,
    },
    "&-footer": {
      marginBlockStart: token.margin,
    },
    "&-compact &-heading": {
      flexWrap: "wrap",
    },
    "&-wide": {
      maxWidth: 1152,
      margin: "0 auto",
    },
    "&-rtl": {
      direction: "rtl",
    },
  },
});

/**
 * Registers the `<PageHeader>` styles and returns `[hashId, cssVarCls]`, like
 * antd's component style hooks: `hashId` goes on every styled element,
 * `cssVarCls` on the root so the CSS variables of the current theme resolve.
 */
export const usePageHeaderStyle = genStyleHooks(
  "RefinePageHeader",
  genPageHeaderStyle,
);
