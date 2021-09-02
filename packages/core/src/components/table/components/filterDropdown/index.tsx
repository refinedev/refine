import React, { useState } from "react";
import { Button, Space } from "antd";
import { FilterDropdownProps as AntdFilterDropdownProps } from "antd/lib/table/interface";
import { FilterOutlined } from "@ant-design/icons";
import { useTranslate } from "@hooks";

export type FilterDropdownProps = AntdFilterDropdownProps & {
    mapValue?: (selectedKeys: React.Key[]) => any;
};

/**
 * `<FilterDropdown>` is a helper component for {@link https://ant.design/components/table/#components-table-demo-custom-filter-panel filter dropdowns in Ant Design `<Table>` components.}
 *
 * @see {@link https://refine.dev/docs/api-references/components/filter-dropdown} for more details.
 */
export const FilterDropdown: React.FC<FilterDropdownProps> = ({
    setSelectedKeys,
    confirm,
    clearFilters,
    mapValue,
    children,
}) => {
    const [value, setValue] = useState<any[] | undefined>(undefined);

    const clearFilter = () => {
        if (clearFilters) {
            setValue([]);
            clearFilters();
        }
    };

    const onFilter = () => {
        if (confirm) confirm();
    };

    const mappedValue = (value: any) => (mapValue ? mapValue(value) : value);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (e: any) => {
        if (typeof e === "object") {
            if (Array.isArray(e)) {
                setValue(mappedValue(e));
                return setSelectedKeys(e);
            }

            const { target }: React.ChangeEvent<HTMLInputElement> = e;
            setValue(mappedValue([target.value]));

            return setSelectedKeys([target.value]);
        }

        setValue(mappedValue([e]));
        return setSelectedKeys([e]);
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onChange,
                value: value,
            });
        }
        return child;
    });
    const translate = useTranslate();
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
