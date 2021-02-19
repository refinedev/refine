import React from "react";
import { Button } from "antd";
import { FilterDropdownProps } from "antd/lib/table/interface";

import { TextInput } from "@components";

export const TextInputFilter: React.FC<FilterDropdownProps> = ({
    selectedKeys,
    setSelectedKeys,
    confirm,
    clearFilters,
}) => {
    const clearFilter = () => {
        if (clearFilters) clearFilters();
    };

    const onFilter = () => {
        if (confirm) confirm();
    };

    return (
        <>
            <TextInput
                value={selectedKeys[0]}
                onChange={(event) => setSelectedKeys([event.target.value])}
            />
            <Button onClick={() => onFilter()}>Filter</Button>
            <Button onClick={() => clearFilter()}>Clear</Button>
        </>
    );
};
