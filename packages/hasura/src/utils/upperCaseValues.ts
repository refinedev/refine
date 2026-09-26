import mapValues from "lodash/mapValues";

export const upperCaseValues = (obj: any): any => {
  if (!obj) return undefined;
  // Sorting on a relation field gives a nested object, e.g. `{ category: { title: "asc" } }`.
  return mapValues(obj, (v: any) =>
    typeof v === "string" ? v.toUpperCase() : upperCaseValues(v),
  );
};
