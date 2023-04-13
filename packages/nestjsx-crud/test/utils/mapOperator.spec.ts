import { ComparisonOperator, CondOperator } from "@nestjsx/crud-request";
import { CrudOperators } from "@refinedev/core";
import { mapOperator } from "../../src/utils";

describe("mapOperator", () => {
    it("should map CrudOperators to ComparisonOperator", () => {
        const operators: Record<CrudOperators, ComparisonOperator> = {
            and: "$and",
            or: "$or",
            ne: CondOperator.NOT_EQUALS,
            lt: CondOperator.LOWER_THAN,
            gt: CondOperator.GREATER_THAN,
            lte: CondOperator.LOWER_THAN_EQUALS,
            gte: CondOperator.GREATER_THAN_EQUALS,
            in: CondOperator.IN,
            nin: CondOperator.NOT_IN,
            contains: CondOperator.CONTAINS_LOW,
            ncontains: CondOperator.EXCLUDES_LOW,
            containss: CondOperator.CONTAINS,
            ncontainss: CondOperator.EXCLUDES,
            null: CondOperator.IS_NULL,
            startswith: CondOperator.STARTS_LOW,
            startswiths: CondOperator.STARTS,
            endswith: CondOperator.ENDS_LOW,
            endswiths: CondOperator.ENDS,
            between: CondOperator.EQUALS,
            eq: CondOperator.EQUALS,
            nbetween: CondOperator.EQUALS,
            nnull: CondOperator.EQUALS,
            nendswith: CondOperator.EQUALS,
            nendswiths: CondOperator.EQUALS,
            nstartswith: CondOperator.EQUALS,
            nstartswiths: CondOperator.EQUALS,
        };

        Object.entries(operators).forEach(([key, value]) => {
            expect(mapOperator(key as CrudOperators)).toBe(value);
        });
    });

    it("should return CondOperator.EQUALS for unsupported CrudOperators", () => {
        const unsupportedOperator: CrudOperators =
            "unsupported" as CrudOperators;
        expect(mapOperator(unsupportedOperator)).toBe(CondOperator.EQUALS);
    });
});
