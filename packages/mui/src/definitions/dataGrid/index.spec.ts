import { CrudSorting, CrudFilters } from "@refinedev/core";
import {
    GridSortModel,
    GridFilterModel,
    GridLinkOperator,
} from "@mui/x-data-grid";

import {
    transformSortModelToCrudSorting,
    transformCrudSortingToSortModel,
    transformFilterModelToCrudFilters,
    transformMuiOperatorToCrudOperator,
    transformCrudOperatorToMuiOperator,
    transformCrudFiltersToFilterModel,
} from ".";

describe("transformSortModelToCrudSorting", () => {
    it("Map grid sort model to crud sorting", () => {
        const gridSorter: GridSortModel = [
            { field: "title", sort: "asc" },
            { field: "view", sort: "desc" },
        ];

        const crudSorter: CrudSorting = [
            { field: "title", order: "asc" },
            { field: "view", order: "desc" },
        ];

        expect(transformSortModelToCrudSorting(gridSorter)).toEqual(crudSorter);
    });

    it("if sort direction is 'undefined', then use 'asc'", () => {
        const gridSorter: GridSortModel = [{ field: "title", sort: undefined }];

        const crudSorter: CrudSorting = [{ field: "title", order: "asc" }];

        expect(transformSortModelToCrudSorting(gridSorter)).toEqual(crudSorter);
    });

    it("if sort direction is 'null', then use 'asc'", () => {
        const gridSorter: GridSortModel = [{ field: "title", sort: null }];

        const crudSorter: CrudSorting = [{ field: "title", order: "asc" }];

        expect(transformSortModelToCrudSorting(gridSorter)).toEqual(crudSorter);
    });
});

describe("transformCrudSortingToSortModel", () => {
    it("Map crud sorting to grid sort model", () => {
        const crudSorter: CrudSorting = [
            { field: "title", order: "asc" },
            { field: "view", order: "desc" },
        ];

        const gridSorter: GridSortModel = [
            { field: "title", sort: "asc" },
            { field: "view", sort: "desc" },
        ];

        expect(transformCrudSortingToSortModel(crudSorter)).toEqual(gridSorter);
    });
});

describe("transformFilterModelToCrudFilters", () => {
    it("Map filter model to crud filters with 'or' operator", () => {
        const filterModel: GridFilterModel = {
            items: [
                {
                    id: 1,
                    columnField: "rating",
                    operatorValue: ">",
                    value: 4,
                },
                {
                    id: 2,
                    columnField: "isAdmin",
                    operatorValue: "is",
                    value: true,
                },
            ],
            linkOperator: GridLinkOperator.Or,
        };

        const crudFilters: CrudFilters = [
            {
                operator: "or",
                value: [
                    {
                        field: "rating",
                        operator: "gt",
                        value: 4,
                    },
                    {
                        field: "isAdmin",
                        operator: "eq",
                        value: true,
                    },
                ],
            },
        ];

        expect(transformFilterModelToCrudFilters(filterModel)).toEqual(
            crudFilters,
        );
    });

    it("Map filter model to crud filters with 'and' operator", () => {
        const filterModel: GridFilterModel = {
            items: [
                {
                    id: 1,
                    columnField: "rating",
                    operatorValue: ">",
                    value: 4,
                },
                {
                    id: 2,
                    columnField: "isAdmin",
                    operatorValue: "is",
                    value: true,
                },
            ],
            linkOperator: GridLinkOperator.And,
        };

        const crudFilters: CrudFilters = [
            {
                field: "rating",
                operator: "gt",
                value: 4,
            },
            {
                field: "isAdmin",
                operator: "eq",
                value: true,
            },
        ];

        expect(transformFilterModelToCrudFilters(filterModel)).toEqual(
            crudFilters,
        );
    });

    it("Map filter model to crud filters with undefined operator", () => {
        const filterModel: GridFilterModel = {
            items: [
                {
                    id: 1,
                    columnField: "rating",
                    operatorValue: ">",
                    value: 4,
                },
                {
                    id: 2,
                    columnField: "isAdmin",
                    operatorValue: "is",
                    value: true,
                },
            ],
        };

        const crudFilters: CrudFilters = [
            {
                field: "rating",
                operator: "gt",
                value: 4,
            },
            {
                field: "isAdmin",
                operator: "eq",
                value: true,
            },
        ];

        expect(transformFilterModelToCrudFilters(filterModel)).toEqual(
            crudFilters,
        );
    });
});

describe("transformMuiOperatorToCrudOperators", () => {
    it("transform mui operator to crud operator", () => {
        expect(transformMuiOperatorToCrudOperator("equals")).toEqual("eq");
        expect(transformMuiOperatorToCrudOperator("is")).toEqual("eq");
        expect(transformMuiOperatorToCrudOperator("=")).toEqual("eq");
        expect(transformMuiOperatorToCrudOperator("!=")).toEqual("ne");
        expect(transformMuiOperatorToCrudOperator("not")).toEqual("ne");
        expect(transformMuiOperatorToCrudOperator("<")).toEqual("lt");
        expect(transformMuiOperatorToCrudOperator("before")).toEqual("lt");
        expect(transformMuiOperatorToCrudOperator("<=")).toEqual("lte");
        expect(transformMuiOperatorToCrudOperator("onOrBefore")).toEqual("lte");
        expect(transformMuiOperatorToCrudOperator(">")).toEqual("gt");
        expect(transformMuiOperatorToCrudOperator("after")).toEqual("gt");
        expect(transformMuiOperatorToCrudOperator(">=")).toEqual("gte");
        expect(transformMuiOperatorToCrudOperator("onOrAfter")).toEqual("gte");
        expect(transformMuiOperatorToCrudOperator("contains")).toEqual(
            "contains",
        );
        expect(transformMuiOperatorToCrudOperator("something")).toEqual(
            "something",
        );
    });
});

describe("transformMuiOperatorToCrudOperator", () => {
    it("transform crud operator to mui operator with 'number' value", () => {
        expect(transformCrudOperatorToMuiOperator("eq", "number")).toEqual("=");
        expect(transformCrudOperatorToMuiOperator("ne", "number")).toEqual(
            "!=",
        );
        expect(transformCrudOperatorToMuiOperator("gt", "number")).toEqual(">");
        expect(transformCrudOperatorToMuiOperator("gte", "number")).toEqual(
            ">=",
        );
        expect(transformCrudOperatorToMuiOperator("lt", "number")).toEqual("<");
        expect(transformCrudOperatorToMuiOperator("lte", "number")).toEqual(
            "<=",
        );
    });

    it("transform crud operator to mui operator with 'boolean' value", () => {
        expect(transformCrudOperatorToMuiOperator("eq", "boolean")).toEqual(
            "is",
        );
        expect(transformCrudOperatorToMuiOperator("eq", "boolean")).toEqual(
            "is",
        );
    });

    it("transform crud operator to mui operator with 'string' value", () => {
        expect(
            transformCrudOperatorToMuiOperator("contains", "string"),
        ).toEqual("contains");
        expect(transformCrudOperatorToMuiOperator("eq", "string")).toEqual(
            "equals",
        );
    });

    it("transform crud operator to mui operator with 'date' and 'dateTime' value", () => {
        expect(transformCrudOperatorToMuiOperator("eq", "date")).toEqual("is");
        expect(transformCrudOperatorToMuiOperator("ne", "date")).toEqual("not");
        expect(transformCrudOperatorToMuiOperator("gt", "date")).toEqual(
            "after",
        );
        expect(transformCrudOperatorToMuiOperator("gte", "dateTime")).toEqual(
            "onOrAfter",
        );
        expect(transformCrudOperatorToMuiOperator("lt", "dateTime")).toEqual(
            "before",
        );
        expect(transformCrudOperatorToMuiOperator("lte", "dateTime")).toEqual(
            "onOrBefore",
        );
    });

    it("transform crud operator to mui operator with undefined value", () => {
        expect(transformCrudOperatorToMuiOperator("null", undefined)).toEqual(
            "isEmpty",
        );
        expect(transformCrudOperatorToMuiOperator("nnull", undefined)).toEqual(
            "isNotEmpty",
        );
    });
});

describe("transformCrudFiltersToFilterModel", () => {
    it("Map crud filters to filter model with 'or' operator", () => {
        const crudFilters: CrudFilters = [
            {
                operator: "or",
                value: [
                    {
                        field: "rating",
                        operator: "gt",
                        value: 4,
                    },
                    {
                        field: "isAdmin",
                        operator: "eq",
                        value: true,
                    },
                ],
            },
        ];

        const columnsLookup = {
            rating: "number",
            isAdmin: "boolean",
        };

        const filterModel: GridFilterModel = {
            items: [
                {
                    columnField: "rating",
                    operatorValue: ">",
                    value: 4,
                    id: "ratinggt",
                },
                {
                    columnField: "isAdmin",
                    operatorValue: "is",
                    value: true,
                    id: "isAdmineq",
                },
            ],
            linkOperator: GridLinkOperator.Or,
        };

        expect(
            transformCrudFiltersToFilterModel(crudFilters, columnsLookup),
        ).toEqual(filterModel);
    });

    it("Map crud filters to filter model with 'and' operator", () => {
        const crudFilters: CrudFilters = [
            {
                field: "rating",
                operator: "gt",
                value: 4,
            },
            {
                field: "isAdmin",
                operator: "eq",
                value: true,
            },
        ];

        const columnsLookup = {
            rating: "number",
            isAdmin: "boolean",
        };

        const filterModel: GridFilterModel = {
            items: [
                {
                    columnField: "rating",
                    operatorValue: ">",
                    value: 4,
                    id: "ratinggt",
                },
                {
                    columnField: "isAdmin",
                    operatorValue: "is",
                    value: true,
                    id: "isAdmineq",
                },
            ],
            linkOperator: GridLinkOperator.And,
        };

        expect(
            transformCrudFiltersToFilterModel(crudFilters, columnsLookup),
        ).toEqual(filterModel);
    });

    it("Map crud filters to filter model with 'or' and 'and' operator, should prioritize to 'or' filter", () => {
        const crudFilters: CrudFilters = [
            {
                field: "createdAt",
                operator: "gt",
                value: "2022-04-06T14:29",
            },
            {
                operator: "or",
                value: [
                    {
                        field: "rating",
                        operator: "gt",
                        value: 4,
                    },
                    {
                        field: "isAdmin",
                        operator: "eq",
                        value: true,
                    },
                ],
            },
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ];

        const columnsLookup = {
            rating: "number",
            isAdmin: "boolean",
        };

        const filterModel: GridFilterModel = {
            items: [
                {
                    columnField: "rating",
                    operatorValue: ">",
                    value: 4,
                    id: "ratinggt",
                },
                {
                    columnField: "isAdmin",
                    operatorValue: "is",
                    value: true,
                    id: "isAdmineq",
                },
            ],
            linkOperator: GridLinkOperator.Or,
        };

        expect(
            transformCrudFiltersToFilterModel(crudFilters, columnsLookup),
        ).toEqual(filterModel);
    });

    it("Map crud filters to filter model with no filters, should return default mui filter mui", () => {
        const crudFilters: CrudFilters = [];

        const columnsLookup = {};

        expect(
            transformCrudFiltersToFilterModel(crudFilters, columnsLookup),
        ).toEqual({
            items: [],
            linkOperator: "and",
        });
    });
});
