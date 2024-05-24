import type {
  RefineThemedLayoutV2SiderProps as BaseRefineThemedLayoutV2SiderProps,
  RefineThemedLayoutV2HeaderProps,
  RefineThemedLayoutV2Props,
  RefineLayoutThemedTitleProps,
} from "@refinedev/ui-types";

type RefineThemedLayoutV2SiderProps = BaseRefineThemedLayoutV2SiderProps & {
  fixed?: boolean;
  buttonOrientation?: "right" | "left";
};

export type {
  RefineLayoutThemedTitleProps,
  RefineThemedLayoutV2SiderProps,
  RefineThemedLayoutV2HeaderProps,
  RefineThemedLayoutV2Props,
};
