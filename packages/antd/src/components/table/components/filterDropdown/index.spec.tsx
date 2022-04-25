import React from "react";
import { Input } from "antd";

import { render, fireEvent } from "@test";
import { FilterDropdown, FilterDropdownProps } from "./";

describe("FilterDropdown", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const confirm = jest.fn();
    const clearFilters = jest.fn();
    const setSelectedKeys = jest.fn();
    const mapValueFn = jest.fn();

    const props: FilterDropdownProps = {
        confirm,
        selectedKeys: [],
        setSelectedKeys,
        visible: false,
        prefixCls: "",
        filters: [],
        clearFilters,
        children: null,
    };

    it("should render successfully", () => {
        const { getByText } = render(
            <FilterDropdown {...props}>
                <Input />
            </FilterDropdown>,
        );
        getByText("Filter");
        getByText("Clear");
    });

    it("should render called confirm function successfully if click the filter button", async () => {
        const { getByText } = render(
            <FilterDropdown {...props}>
                <Input />
            </FilterDropdown>,
        );

        fireEvent.click(getByText("Filter"));

        expect(confirm).toHaveBeenCalled();
        expect(setSelectedKeys).toHaveBeenCalled();
    });

    it("should render called clearFilter function successfully if click the clear button", async () => {
        const { getByText } = render(
            <FilterDropdown {...props}>
                <Input />
            </FilterDropdown>,
        );

        fireEvent.click(getByText("Clear"));

        expect(clearFilters).toHaveBeenCalled();
    });

    it("should not called setSelectedKeys on onChange function", async () => {
        const { getByTestId } = render(
            <FilterDropdown {...props}>
                <Input data-testid="input" />
            </FilterDropdown>,
        );

        fireEvent.change(getByTestId("input"), {
            target: {
                value: "test",
            },
        });

        expect(setSelectedKeys).not.toHaveBeenCalled();
    });

    it("should call mapValue", async () => {
        const { getByTestId } = render(
            <FilterDropdown {...props} mapValue={mapValueFn}>
                <Input data-testid="input" />
            </FilterDropdown>,
        );

        fireEvent.change(getByTestId("input"), {
            target: {
                value: "test",
            },
        });

        expect(mapValueFn).toHaveBeenCalled();
    });
});
