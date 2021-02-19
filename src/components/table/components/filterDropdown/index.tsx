import React from "react";
import { Button } from "antd";
import { FilterDropdownProps as AntdFilterDropdownProps } from "antd/lib/table/interface";

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
        <>
            {childrenWithProps}
            <Button onClick={() => onFilter()}>Filter</Button>
            <Button onClick={() => clearFilter()}>Clear</Button>
        </>
    );
};
