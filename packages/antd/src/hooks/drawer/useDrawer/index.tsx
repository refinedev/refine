import type { DrawerProps } from "antd";
import { useModal, type useModalReturnType } from "@refinedev/core";

export type useDrawerReturnType = {
  drawerProps: DrawerProps;
} & Omit<useModalReturnType, "visible">;

export type useDrawerProps = {
  drawerProps?: DrawerProps;
};

export const useDrawer = ({
  drawerProps = {},
}: useDrawerProps = {}): useDrawerReturnType => {
  const { show, close, visible } = useModal({
    defaultVisible: drawerProps.open,
  });

  return {
    drawerProps: {
      ...drawerProps,
      onClose: (e: React.MouseEvent | React.KeyboardEvent) => {
        drawerProps.onClose?.(e);
        close();
      },
      open: visible,
    },
    show,
    close,
  };
};
