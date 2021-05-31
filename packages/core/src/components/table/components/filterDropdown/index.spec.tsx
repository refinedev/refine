import React from "react";

import { render, fireEvent } from "@test";
import { FilterDropdown, FilterDropdownProps } from "./";

describe("FilterDropdown", () => {
    const confirm = jest.fn();
    const clearFilters = jest.fn();
    const setSelectedKeys = jest.fn();

    const props: FilterDropdownProps = {
        confirm,
        selectedKeys: [],
        setSelectedKeys,
        visible: false,
        prefixCls: "",
        filters: [],
        clearFilters,
    };

    it("should render called confirm function successfully if click the filter button", async () => {
        const { getByText } = render(<FilterDropdown {...props} />);

        fireEvent.click(getByText("Filter"));

        expect(confirm).toHaveBeenCalledTimes(1);
    });
});
