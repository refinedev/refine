import {
    GridSortModel,
    GridFilterModel,
    GridLinkOperator,
    GridFilterItem,
} from "@mui/x-data-grid";
import {
    CrudFilters,
    CrudOperators,
    CrudSorting,
    LogicalFilter,
} from "@refinedev/core";

export const transformSortModelToCrudSorting = (
    sortModel: GridSortModel,
): CrudSorting => {
    const sorter = sortModel.map(({ field, sort }) => ({
        field,
        order: sort || "asc",
    }));
    return sorter;
};

export const transformCrudSortingToSortModel = (
    crudSorting: CrudSorting,
): GridSortModel => {
    const sortModel = crudSorting.map(({ field, order }) => ({
        field,
        sort: order,
    }));
    return sortModel;
};

export const transformMuiOperatorToCrudOperator = (
    operatorValue?: string,
): Exclude<CrudOperators, "or"> => {
    if (!operatorValue) {
        return "eq";
    }

    switch (operatorValue) {
        case "equals":
        case "is":
        case "=":
            return "eq";
        case "!=":
        case "not":
            return "ne";
        case ">":
        case "after":
            return "gt";
        case ">=":
        case "onOrAfter":
            return "gte";
        case "<":
        case "before":
            return "lt";
        case "<=":
        case "onOrBefore":
            return "lte";
        case "isEmpty":
            return "null";
        case "isNotEmpty":
            return "nnull";
        default:
            return operatorValue as Exclude<CrudOperators, "or">;
    }
};

export const transformFilterModelToCrudFilters = ({
    items,
    linkOperator,
}: GridFilterModel): CrudFilters => {
    const filters = items.map(({ columnField, value, operatorValue }) => ({
        field: columnField,
        value: value ?? "",
        operator: transformMuiOperatorToCrudOperator(operatorValue),
    }));

    if (linkOperator === GridLinkOperator.Or) {
        return [{ operator: "or", value: filters }];
    }
    return filters;
};

export const transformCrudOperatorToMuiOperator = (
    operator: CrudOperators,
    columnType?: string,
): string => {
    switch (columnType) {
        case "number":
            switch (operator) {
                case "eq":
                    return "=";
                case "ne":
                    return "!=";
                case "gt":
                    return ">";
                case "gte":
                    return ">=";
                case "lt":
                    return "<";
                case "lte":
                    return "<=";
                case "null":
                    return "isEmpty";
                case "nnull":
                    return "isNotEmpty";
                default:
                    return operator;
            }
        case "singleSelect":
        case "boolean":
            switch (operator) {
                case "eq":
                    return "is";
                default:
                    return operator;
            }
        case undefined:
        case "string":
            switch (operator) {
                case "eq":
                    return "equals";
                case "contains":
                    return "contains";
                case "null":
                    return "isEmpty";
                case "nnull":
                    return "isNotEmpty";
                default:
                    return operator;
            }
        case "date":
        case "dateTime":
            switch (operator) {
                case "eq":
                    return "is";
                case "ne":
                    return "not";
                case "gt":
                    return "after";
                case "gte":
                    return "onOrAfter";
                case "lt":
                    return "before";
                case "lte":
                    return "onOrBefore";
                case "null":
                    return "isEmpty";
                case "nnull":
                    return "isNotEmpty";
                default:
                    return operator;
            }
        default:
            return operator;
    }
};

export const transformCrudFiltersToFilterModel = (
    crudFilters: CrudFilters,
    columnsType?: Record<string, string>,
): GridFilterModel | undefined => {
    const gridFilterItems: GridFilterItem[] = [];

    const isExistOrFilter = crudFilters.some(
        (filter) => filter.operator === "or",
    );

    if (columnsType) {
        if (isExistOrFilter) {
            const orLogicalFilters = crudFilters.find(
                (filter) => filter.operator === "or",
            )?.value as LogicalFilter[];

            orLogicalFilters.map(({ field, value, operator }) => {
                const columnType = columnsType[field];

                gridFilterItems.push({
                    columnField: field,
                    operatorValue: transformCrudOperatorToMuiOperator(
                        operator,
                        columnType,
                    ),
                    value: value === "" ? undefined : value,
                    id: field + operator,
                });
            });
        } else {
            (crudFilters as LogicalFilter[]).map(
                ({ field, value, operator }) => {
                    const columnType = columnsType[field];

                    gridFilterItems.push({
                        columnField: field,
                        operatorValue: transformCrudOperatorToMuiOperator(
                            operator,
                            columnType,
                        ),
                        value: value === "" ? undefined : value,
                        id: field + operator,
                    });
                },
            );
        }
    }

    return {
        items: gridFilterItems,
        // If there is "or" filter, default link operator is "or"
        linkOperator: isExistOrFilter
            ? GridLinkOperator.Or
            : GridLinkOperator.And,
    };
};
