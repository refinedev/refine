import type { CrudFilter } from "@refinedev/core";
import { mapOperator } from "./mapOperator";

export const generateFilter = (filter: CrudFilter, query: any) => {
  switch (filter.operator) {
    case "eq":
      return query.eq(filter.field, filter.value);
    case "ne":
      return query.neq(filter.field, filter.value);
    case "in":
      return query.in(filter.field, filter.value);
    case "nin": {
      const formattedValue = Array.isArray(filter.value)
        ? `(${filter.value.map((val: any) => `"${val}"`).join(",")})`
        : filter.value;
      return query.not(filter.field, "in", formattedValue);
    }
    case "ina":
      return query.contains(filter.field, filter.value);
    case "nina":
      return query.not(
        filter.field,
        "cs",
        `{${filter.value.map((val: any) => `"${val}"`).join(",")}}`,
      );

    case "gt":
      return query.gt(filter.field, filter.value);
    case "gte":
      return query.gte(filter.field, filter.value);
    case "lt":
      return query.lt(filter.field, filter.value);
    case "lte":
      return query.lte(filter.field, filter.value);
    case "between":
      if (filter.value.length !== 2) {
        throw new Error(
          `[@refinedev/supabase]: Unexpected length ${filter.value.length}. Between operator expects a range between 2 values.`,
        );
      }
      return query
        .gte(filter.field, filter.value[0])
        .lte(filter.field, filter.value[1]);
    case "nbetween":
      if (filter.value.length !== 2) {
        throw new Error(
          `[@refinedev/supabase]: Unexpected length ${filter.value.length}. Nbetween operator expects a range between 2 values.`,
        );
      }
      return query.or(
        `${filter.field}.lt.${filter.value[0]},${filter.field}.gt.${filter.value[1]}`,
      );
    case "contains":
      return query.ilike(filter.field, `%${filter.value}%`);
    case "ncontains":
      return query.not(filter.field, "ilike", `%${filter.value}%`);
    case "containss":
      return query.like(filter.field, `%${filter.value}%`);
    case "ncontainss":
      return query.not(filter.field, "like", `%${filter.value}%`);
    case "null":
      return query.is(filter.field, null);
    case "nnull":
      return query.not(filter.field, "is", null);
    case "startswith":
      return query.ilike(filter.field, `${filter.value}%`);
    case "nstartswith":
      return query.not(filter.field, "ilike", `${filter.value}%`);
    case "endswith":
      return query.ilike(filter.field, `%${filter.value}`);
    case "nendswith":
      return query.not(filter.field, "ilike", `%${filter.value}`);
    case "or": {
      const orSyntax = filter.value
        .map((item) => {
          if (
            item.operator !== "or" &&
            item.operator !== "and" &&
            "field" in item
          ) {
            let value = item.value;
            let op = mapOperator(item.operator);

            if (
              item.operator === "startswith" ||
              item.operator === "endswith"
            ) {
              op = "ilike";
            } else if (
              item.operator === "nstartswith" ||
              item.operator === "nendswith"
            ) {
              op = "not.ilike";
            }

            if (item.operator === "ina" || item.operator === "nina") {
              value = `{${item.value.map((val: any) => `"${val}"`).join(",")}}`;
            }

            if (
              item.operator === "contains" ||
              item.operator === "containss" ||
              item.operator === "ncontains" ||
              item.operator === "ncontainss"
            ) {
              value = `"%${value}%"`;
            }

            if (
              item.operator === "startswith" ||
              item.operator === "nstartswith"
            ) {
              value = `${value}%`;
            }

            if (item.operator === "endswith" || item.operator === "nendswith") {
              value = `%${value}`;
            }

            if (item.operator === "in" || item.operator === "nin") {
              value = `(${item.value.map((val: any) => `"${val}"`).join(",")})`;
            }

            if (item.operator === "null" || item.operator === "nnull") {
              value = "null";
            }

            return `${item.field}.${op}.${value}`;
          }
          return;
        })
        .join(",");
      return query.or(orSyntax);
    }

    case "and":
      throw Error("Operator 'and' is not supported");
    default:
      return query.filter(
        filter.field,
        mapOperator(filter.operator),
        filter.value,
      );
  }
};
