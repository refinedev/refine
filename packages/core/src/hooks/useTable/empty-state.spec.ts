import { describe, expect, it } from "vitest";

import type { CrudFilter } from "../../contexts/data/types";
import { getEmptyState } from "./empty-state";

const searchFilter: CrudFilter = {
  field: "title",
  operator: "contains",
  value: "refine",
};

const statusFilter: CrudFilter = {
  field: "status",
  operator: "eq",
  value: "published",
};

const getState = (
  overrides: Partial<Parameters<typeof getEmptyState>[0]> = {},
) =>
  getEmptyState({
    data: [],
    total: 0,
    filters: [],
    currentPage: 1,
    ...overrides,
  });

describe("getEmptyState", () => {
  it("classifies an unfiltered empty resource", () => {
    expect(getState()?.reason).toBe("no-data");
  });

  it("classifies an explicitly identified search with no matches", () => {
    expect(
      getState({
        filters: [searchFilter],
        searchFilters: [searchFilter],
        searchActive: true,
      })?.reason,
    ).toBe("no-search-results");
  });

  it("classifies ordinary and initial filters as no-filter-results", () => {
    expect(getState({ filters: [statusFilter] })?.reason).toBe(
      "no-filter-results",
    );
  });

  it("does not attribute mixed search and filter results to either one", () => {
    expect(
      getState({
        filters: [searchFilter, statusFilter],
        searchFilters: [searchFilter],
        searchActive: true,
      })?.reason,
    ).toBe("unknown");
  });

  it("does not call an empty paginated page an empty resource", () => {
    expect(getState({ total: 12, currentPage: 3 })?.reason).toBe("unknown");
    expect(getState({ total: 0, currentPage: 3 })?.reason).toBe("unknown");
  });

  it("does not classify results while loading, fetching, or errored", () => {
    expect(getState({ isLoading: true })).toBeUndefined();
    expect(getState({ isFetching: true })).toBeUndefined();
    expect(getState({ isError: true })).toBeUndefined();
  });

  it("returns no state when the result contains data", () => {
    expect(getState({ data: [{ id: 1 }] })).toBeUndefined();
  });

  it("keeps a zero-filter query unknown when no total is available", () => {
    expect(getState({ total: undefined })?.reason).toBe("unknown");
  });

  it("keeps URL-restored filters unknown when their origin is unavailable", () => {
    expect(
      getState({
        filters: [statusFilter],
        filterOriginUnknown: true,
      })?.reason,
    ).toBe("unknown");
  });

  it("uses explicit search provenance when search filters are URL-synchronized", () => {
    expect(
      getState({
        filters: [searchFilter],
        searchFilters: [searchFilter],
        searchActive: true,
        filterOriginUnknown: true,
      })?.reason,
    ).toBe("no-search-results");
  });

  it("classifies client-filtered empty rows without mistaking total for a page", () => {
    expect(
      getState({
        filters: [statusFilter],
        total: 12,
        currentPage: 2,
        clientFiltered: true,
      })?.reason,
    ).toBe("no-filter-results");
  });
});
