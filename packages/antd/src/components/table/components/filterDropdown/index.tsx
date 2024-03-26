import React, { type ReactNode, useState } from "react";
import { Button, Space } from "antd";
import type { FilterDropdownProps as AntdFilterDropdownProps } from "antd/lib/table/interface";
import dayjs from "dayjs";
import { FilterOutlined } from "@ant-design/icons";
import { useTranslate } from "@refinedev/core";

export type FilterDropdownProps = AntdFilterDropdownProps & {
  mapValue?: (selectedKeys: React.Key[]) => any;
  children: ReactNode;
};

/**
 * `<FilterDropdown>` is a helper component for {@link https://ant.design/components/table/#components-table-demo-custom-filter-panel filter dropdowns in Ant Design `<Table>` components.}
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/filter-dropdown} for more details.
 */
export const FilterDropdown: React.FC<FilterDropdownProps> = (props) => {
  const {
    setSelectedKeys,
    confirm,
    clearFilters,
    mapValue,
    selectedKeys,
    children,
  } = props;

  const [value, setValue] = useState<any[] | undefined>(selectedKeys);
  const translate = useTranslate();

  const clearFilter = () => {
    if (clearFilters) {
      setValue([]);
      clearFilters();
    }
  };

  const onFilter = () => {
    const _mappedValue = mappedValue(value);

    let keys;
    if (typeof _mappedValue === "number") {
      keys = `${_mappedValue}`;
    } else if (dayjs.isDayjs(_mappedValue)) {
      keys = [_mappedValue.toISOString()];
    } else {
      keys = _mappedValue;
    }

    setSelectedKeys(keys);

    confirm?.();
  };

  const mappedValue = (value: any) => (mapValue ? mapValue(value) : value);

  const onChange = (e: any) => {
    if (typeof e === "object") {
      if (Array.isArray(e)) {
        const _mappedValue = mappedValue(e);

        setValue(_mappedValue);
        return setSelectedKeys(_mappedValue);
      }

      const changeEvent =
        !e || !e.target || dayjs.isDayjs(e) ? { target: { value: e } } : e;

      const { target }: React.ChangeEvent<HTMLInputElement> = changeEvent;
      const _mappedValue = mappedValue(target.value);
      setValue(_mappedValue);
      return;
    }

    const _mappedValue = mappedValue(e);

    setValue(_mappedValue);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        onChange,
        value: mappedValue(value),
      });
    }
    return child;
  });
  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div style={{ marginBottom: 15 }}>{childrenWithProps}</div>
      <Space>
        <Button type="primary" size="small" onClick={() => onFilter()}>
          <FilterOutlined /> {translate("buttons.filter", "Filter")}
        </Button>
        <Button danger size="small" onClick={() => clearFilter()}>
          {translate("buttons.clear", "Clear")}
        </Button>
      </Space>
    </div>
  );
};
