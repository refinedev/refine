import { CrudFilters, LogicalFilter } from "@refinedev/core";
import { Formula } from "@qualifyze/airtable-formulator";
import { generateLogicalFilterFormula } from "./generateLogicalFilterFormula";

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
