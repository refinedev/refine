import type {
  ConditionalFilter,
  CrudOperators,
  LogicalFilter,
} from "@refinedev/core";
import camelcase from "camelcase";
import setWith from "lodash/setWith";
import cloneDeep from "lodash/cloneDeep";
import type { NamingConvention } from "src/dataProvider";
import type {
  BoolExp,
  HasuraOperatorKey,
  MultiConditionFilter,
  Operator,
} from "./boolexp";

export type HasuraFilterCondition =
  | "_and"
  | "_not"
  | "_or"
  | "_eq"
  | "_gt"
  | "_gte"
  | "_lt"
  | "_lte"
  | "_neq"
  | "_in"
  | "_nin"
  | "_like"
  | "_nlike"
  | "_ilike"
  | "_nilike"
  | "_is_null"
  | "_similar"
  | "_nsimilar"
  | "_regex"
  | "_iregex";

export type HasuraCrudOperators = CrudOperators | "not";

export type HasuraLogicalFilter = Omit<LogicalFilter, "operator"> & {
  operator: Exclude<HasuraCrudOperators, "or" | "and" | "not">;
};

export type HasuraConditionalFilter = Omit<
  ConditionalFilter,
  "operator" | "value"
> & {
  operator: Extract<HasuraCrudOperators, "or" | "and" | "not">;
  value: HasuraCrudFilters;
};

export type HasuraCrudFilter = HasuraLogicalFilter | HasuraConditionalFilter;

export type HasuraCrudFilters = HasuraCrudFilter[];

const hasuraFilters: Partial<
  Record<HasuraCrudOperators, HasuraFilterCondition | undefined>
> = {
  eq: "_eq",
  ne: "_neq",
  lt: "_lt",
  gt: "_gt",
  lte: "_lte",
  gte: "_gte",
  in: "_in",
  nin: "_nin",
  contains: "_ilike",
  ncontains: "_nilike",
  containss: "_like",
  ncontainss: "_nlike",
  null: "_is_null",
  or: "_or",
  and: "_and",
  not: "_not",
  nnull: "_is_null",
  startswith: "_iregex",
  nstartswith: "_iregex",
  endswith: "_iregex",
  nendswith: "_iregex",
  startswiths: "_similar",
  nstartswiths: "_nsimilar",
  endswiths: "_similar",
  nendswiths: "_nsimilar",
};

export const handleFilterValue = (
  operator: HasuraCrudOperators,
  value: any,
) => {
  switch (operator) {
    case "startswiths":
    case "nstartswiths":
      return `${value}%`;
    case "endswiths":
    case "nendswiths":
      return `%${value}`;
    case "startswith":
      return `^${value}`;
    case "nstartswith":
      return `^(?!${value})`;
    case "endswith":
      return `${value}$`;
    case "nendswith":
      return `(?<!${value})$`;
    case "nnull":
      return false;
    case "contains":
    case "containss":
    case "ncontains":
    case "ncontainss":
      return `%${value}%`;
    default:
      return value;
  }
};

const convertHasuraOperatorToGraphqlDefaultNaming = (
  hasuraOperator?: HasuraFilterCondition,
) => {
  return hasuraOperator ? `_${camelcase(hasuraOperator)}` : undefined;
};

const convertAdvancedHasuraOperatorToGraphqlDefaultNaming = (
  hasuraOperator: HasuraOperatorKey,
) => {
  return `_${camelcase(hasuraOperator)}`;
};

export const generateNestedFilterQuery = (
  filter: HasuraCrudFilter,
  namingConvention: NamingConvention = "hasura-default",
): BoolExp => {
  const { operator } = filter;

  if (
    operator !== "or" &&
    operator !== "and" &&
    operator !== "not" &&
    "field" in filter
  ) {
    const { field, value } = filter;

    const defaultNamingConvention = namingConvention === "hasura-default";
    const hasuraOperator = defaultNamingConvention
      ? hasuraFilters[filter.operator]
      : convertHasuraOperatorToGraphqlDefaultNaming(
          hasuraFilters[filter.operator],
        );
    if (!hasuraOperator) {
      throw new Error(`Operator ${operator} is not supported`);
    }

    const fieldsArray = field.split(".");
    const fieldsWithOperator = [...fieldsArray, hasuraOperator];
    const filteredValue = handleFilterValue(operator, value);

    return {
      ...setWith({}, fieldsWithOperator, filteredValue, Object),
    };
  }

  return {
    [`_${operator}`]: filter.value.map((f) =>
      generateNestedFilterQuery(f, namingConvention),
    ),
  };
};

export const generateFilters = (
  filters?: HasuraCrudFilters,
  namingConvention: NamingConvention = "hasura-default",
): BoolExp | undefined => {
  if (!filters) {
    return undefined;
  }

  const nestedQuery = generateNestedFilterQuery(
    {
      operator: "and",
      value: filters,
    },
    namingConvention,
  );

  return nestedQuery;
};

function isAdvancedHasuraOperator(key: string): key is HasuraOperatorKey {
  const keys: HasuraOperatorKey[] = [
    "_eq",
    "_neq",
    "_gt",
    "_gte",
    "_lt",
    "_lte",
    "_in",
    "_is_null",
    "_ne",
    "_nin",
    "_ilike",
    "_like",
    "_nilike",
    "_nlike",
    "_nsimilar",
    "_similar",
    "_regex",
    "_iregex",
    "_nregex",
    "_niregex",
    "_contained_in",
    "_contains",
    "_has_key",
    "_has_keys_any",
    "_has_keys_all",
  ];

  return keys.includes(key as HasuraOperatorKey);
}

function isMultiConditionFilter(key: string): key is MultiConditionFilter {
  const keys: MultiConditionFilter[] = ["_and", "_or"];
  return keys.includes(key as MultiConditionFilter);
}

const convertNestedFiltersToGraphqlDefault = (
  operator: string,
  value: BoolExp | Operator | BoolExp[],
): BoolExp => {
  let hasuraOperator = operator;
  if (!isMultiConditionFilter(hasuraOperator)) {
    if (isAdvancedHasuraOperator(hasuraOperator)) {
      hasuraOperator = convertAdvancedHasuraOperatorToGraphqlDefaultNaming(
        operator as HasuraOperatorKey,
      );
      return {
        [hasuraOperator]: value,
      };
    }

    if (hasuraOperator === "_not") {
      /*
        e.g.
          _not: {
            created_at: { _lte: '2024-01-08T11:19:58.060476+00:00' },
          },
      */
      if (Object.keys(value).length > 1) {
        throw new Error(
          "@packages/hasura: Hasura _not BoolExp object expects one key/value pair.",
        );
      }
      const [k, v] = Object.entries(value)[0];
      return {
        _not: convertNestedFiltersToGraphqlDefault(k, v),
      };
    }

    hasuraOperator = camelcase(operator); // Key references TableColumn
    if (Object.keys(value).length > 1) {
      throw new Error(
        "@packages/hasura: Hasura tableColumn BoolExp object expects one key/value pair.",
      );
    }
    const [k, v] = Object.entries(value)[0];
    return {
      [hasuraOperator]: convertNestedFiltersToGraphqlDefault(k, v),
    };
  }

  if (!Array.isArray(value)) {
    throw new Error(
      '@packages/hasura: BoolExp Operators "_and | _or" expect a value of type BoolExp[] when present.',
    );
  }

  return {
    [hasuraOperator]: value.map((f) => {
      if (Object.keys(f).length > 1) {
        throw new Error(
          "@packages/hasura: Hasura _and | _or BoolExp[] object expects one key/value pair.",
        );
      }
      const [k, v] = Object.entries(f)[0];
      return convertNestedFiltersToGraphqlDefault(k, v);
    }),
  };
};

export const mergeHasuraFilters = (
  namingConvention: NamingConvention = "hasura-default",
  filters?: BoolExp,
  metaFilters?: BoolExp,
): BoolExp | undefined => {
  if (!filters || !metaFilters) {
    return filters;
  }
  const mergedFilters = cloneDeep(filters);
  const defaultNamingConvention = namingConvention === "hasura-default";
  let finalMetaFilters = metaFilters;

  if (!defaultNamingConvention) {
    const metaFilterList: BoolExp[] = Object.entries(metaFilters).map(
      (filter) => {
        const [k, v] = filter;
        return convertNestedFiltersToGraphqlDefault(k, v);
      },
    );
    finalMetaFilters = Object.assign({}, ...metaFilterList);
  }

  const entries = Object.entries(finalMetaFilters);
  let andOperatorPresent = false;

  const arbitraryOperators = entries.filter((f) => {
    const [k] = f;
    if (k === "_and") {
      andOperatorPresent = true;
    }
    return !isMultiConditionFilter(k);
  });

  if (
    arbitraryOperators.length > 1 ||
    (andOperatorPresent && arbitraryOperators.length)
  ) {
    console.warn(
      "@packages/hasura: multiple filters present. Group Multiple Parameters via _and. Tip: You can use the _or and _and operators along with the _not operator to create arbitrarily complex boolean expressions involving multiple filtering criteria.",
    );
  }

  entries.forEach((filter) => {
    const [k, v] = filter;

    if (!isMultiConditionFilter(k) && mergedFilters._and) {
      // Group Multiple Parameters Together
      mergedFilters._and = mergedFilters._and.concat({ [k]: v });
    } else if (k === "_and" && mergedFilters._and) {
      // Merge _and conditions from both groups of Hasura Filters
      if (!Array.isArray(v)) {
        throw new Error(
          "@packages/hasura: unexpected value for BoolExp _and. Expected an Array.",
        );
      }
      mergedFilters._and = mergedFilters._and.concat(v);
    } else {
      mergedFilters[k] = v;
    }
  });

  return mergedFilters;
};
