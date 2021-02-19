import React from "react";
import { Button, Row, Col, Space } from "antd";
import { FilterDropdownProps as AntdFilterDropdownProps } from "antd/lib/table/interface";
import { FilterOutlined } from "@ant-design/icons";

export type FilterDropdownProps = AntdFilterDropdownProps & {};

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
    selectedKeys,
    setSelectedKeys,
    confirm,
    clearFilters,
    children,
}) => {
    const clearFilter = () => {
        if (clearFilters) clearFilters();
    };

    const onFilter = () => {
        if (confirm) confirm();
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedKeys([event.target.value]);
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onChange,
                value: selectedKeys[0],
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
                    <FilterOutlined /> Filter
                </Button>
                <Button danger size="small" onClick={() => clearFilter()}>
                    Clear
                </Button>
            </Space>
        </div>
    );
};
