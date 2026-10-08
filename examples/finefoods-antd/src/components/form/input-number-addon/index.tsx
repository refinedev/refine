import type { ReactNode } from "react";
import { InputNumber, Space } from "antd";
import type { InputNumberProps } from "antd";

type InputNumberAddonProps = InputNumberProps & {
  addonBefore: ReactNode;
};

/**
 * `InputNumber` with a leading addon, built on `Space.Compact`.
 * Props such as `value` and `onChange` (injected by `FilterDropdown` / `Form.Item`)
 * are forwarded to the inner `InputNumber`.
 */
export const InputNumberAddon = ({
  addonBefore,
  ...props
}: InputNumberAddonProps) => {
  return (
    <Space.Compact style={{ width: "100%" }}>
      <Space.Addon>{addonBefore}</Space.Addon>
      <InputNumber {...props} />
    </Space.Compact>
  );
};
