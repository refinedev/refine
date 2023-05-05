import { CrudFilters, LogicalFilter } from "@refinedev/core";
import { generateLogicalFilterFormula } from "./generateLogicalFilterFormula";
import { Formula } from "@qualifyze/airtable-formulator";

export const generateFilterFormula = (filters: CrudFilters): Formula[] => {
    const compound = filters.map((filter): Formula => {
        const { operator, value } = filter;

        if (operator === "or") {
            return ["OR", ...generateFilterFormula(value)];
        }

        return generateLogicalFilterFormula(filter as LogicalFilter);
    });

    return compound;
};
