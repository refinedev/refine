import React from "react";
import { Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";

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
    const close = jest.fn();

    const props: FilterDropdownProps = {
        confirm,
        close,
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

    it("should render Date Picker successfully", () => {
        const { getByText } = render(
            <FilterDropdown
                {...props}
                mapValue={(selectedKeys) =>
                    !selectedKeys
                        ? ""
                        : Array.isArray(selectedKeys)
                        ? dayjs(selectedKeys[0])
                        : dayjs(selectedKeys)
                }
            >
                <DatePicker />
            </FilterDropdown>,
        );
        getByText("Filter");
        getByText("Clear");
    });

    it("should render with Date Picker called confirm function successfully if click the filter button", async () => {
        const { getByText } = render(
            <FilterDropdown
                {...props}
                mapValue={(selectedKeys) =>
                    !selectedKeys
                        ? ""
                        : Array.isArray(selectedKeys)
                        ? dayjs(selectedKeys[0])
                        : dayjs(selectedKeys)
                }
            >
                <DatePicker />
            </FilterDropdown>,
        );

        fireEvent.click(getByText("Filter"));

        expect(confirm).toHaveBeenCalled();
        expect(setSelectedKeys).toHaveBeenCalled();
    });

    it("should render with Date Picker called clearFilter function successfully if click the clear button", async () => {
        const { getByText } = render(
            <FilterDropdown
                {...props}
                mapValue={(selectedKeys) =>
                    !selectedKeys
                        ? ""
                        : Array.isArray(selectedKeys)
                        ? dayjs(selectedKeys[0])
                        : dayjs(selectedKeys)
                }
            >
                <DatePicker />
            </FilterDropdown>,
        );

        fireEvent.click(getByText("Clear"));

        expect(clearFilters).toHaveBeenCalled();
    });

    it("should call mapValue with Date Picker", async () => {
        const { getByTestId } = render(
            <FilterDropdown {...props} mapValue={mapValueFn}>
                <DatePicker data-testid="date-picker" />
            </FilterDropdown>,
        );

        fireEvent.change(getByTestId("date-picker"), dayjs());

        expect(mapValueFn).toHaveBeenCalled();
    });

    it("should render Select successfully", () => {
        const { getByText } = render(
            <FilterDropdown
                {...props}
                mapValue={(val) =>
                    Array.isArray(val) ? val.map((i) => Number(i)) : Number(val)
                }
            >
                <Select />
            </FilterDropdown>,
        );
        getByText("Filter");
        getByText("Clear");
    });

    it("should render with Select called confirm function successfully if click the filter button", async () => {
        const { getByText } = render(
            <FilterDropdown
                {...props}
                selectedKeys={["1"]}
                mapValue={(val) =>
                    Array.isArray(val) ? val.map((i) => Number(i)) : Number(val)
                }
            >
                <Select />
            </FilterDropdown>,
        );

        fireEvent.click(getByText("Filter"));

        expect(confirm).toHaveBeenCalled();
        expect(setSelectedKeys).toHaveBeenCalledWith([1]);
    });
});
