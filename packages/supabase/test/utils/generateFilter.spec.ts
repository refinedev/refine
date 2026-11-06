import type { CrudFilter } from "@refinedev/core";
import { generateFilter } from "../../src/utils";

const createQueryMock = () => ({
  eq: vi.fn().mockReturnThis(),
  neq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  contains: vi.fn().mockReturnThis(),
  not: vi.fn().mockReturnThis(),
  gt: vi.fn().mockReturnThis(),
  gte: vi.fn().mockReturnThis(),
  lt: vi.fn().mockReturnThis(),
  lte: vi.fn().mockReturnThis(),
  ilike: vi.fn().mockReturnThis(),
  like: vi.fn().mockReturnThis(),
  is: vi.fn().mockReturnThis(),
  or: vi.fn().mockReturnThis(),
  filter: vi.fn().mockReturnThis(),
});

describe("generateFilter", () => {
  it("should throw error if operator is and", () => {
    const filter = {
      field: "id",
      operator: "and",
      value: "5",
    } as unknown as CrudFilter;

    expect(() => generateFilter(filter, createQueryMock() as any)).toThrow(
      "Operator 'and' is not supported",
    );
  });

  it("should handle eq operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "eq", value: "test" },
      query as any,
    );
    expect(query.eq).toHaveBeenCalledWith("title", "test");
  });

  it("should handle ne operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "ne", value: "test" },
      query as any,
    );
    expect(query.neq).toHaveBeenCalledWith("title", "test");
  });

  it("should handle in operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "id", operator: "in", value: [1, 2] },
      query as any,
    );
    expect(query.in).toHaveBeenCalledWith("id", [1, 2]);
  });

  it("should handle nin operator with formatted array", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "id", operator: "nin", value: [1, 2] },
      query as any,
    );
    expect(query.not).toHaveBeenCalledWith("id", "in", '("1","2")');
  });

  it("should handle nin operator with string array", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "code", operator: "nin", value: ["A", "B"] },
      query as any,
    );
    expect(query.not).toHaveBeenCalledWith("code", "in", '("A","B")');
  });

  it("should handle contains operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "contains", value: "refine" },
      query as any,
    );
    expect(query.ilike).toHaveBeenCalledWith("title", "%refine%");
  });

  it("should handle ncontains operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "ncontains", value: "refine" },
      query as any,
    );
    expect(query.not).toHaveBeenCalledWith("title", "ilike", "%refine%");
  });

  it("should handle containss operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "containss", value: "Refine" },
      query as any,
    );
    expect(query.like).toHaveBeenCalledWith("title", "%Refine%");
  });

  it("should handle ncontainss operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "ncontainss", value: "Refine" },
      query as any,
    );
    expect(query.not).toHaveBeenCalledWith("title", "like", "%Refine%");
  });

  it("should handle startswith operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "startswith", value: "pre" },
      query as any,
    );
    expect(query.ilike).toHaveBeenCalledWith("title", "pre%");
  });

  it("should handle nstartswith operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "nstartswith", value: "pre" },
      query as any,
    );
    expect(query.not).toHaveBeenCalledWith("title", "ilike", "pre%");
  });

  it("should handle endswith operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "endswith", value: "fix" },
      query as any,
    );
    expect(query.ilike).toHaveBeenCalledWith("title", "%fix");
  });

  it("should handle nendswith operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "title", operator: "nendswith", value: "fix" },
      query as any,
    );
    expect(query.not).toHaveBeenCalledWith("title", "ilike", "%fix");
  });

  it("should handle null operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "deleted_at", operator: "null", value: null },
      query as any,
    );
    expect(query.is).toHaveBeenCalledWith("deleted_at", null);
  });

  it("should handle nnull operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "deleted_at", operator: "nnull", value: null },
      query as any,
    );
    expect(query.not).toHaveBeenCalledWith("deleted_at", "is", null);
  });

  it("should handle between operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "age", operator: "between", value: [18, 30] },
      query as any,
    );
    expect(query.gte).toHaveBeenCalledWith("age", 18);
    expect(query.lte).toHaveBeenCalledWith("age", 30);
  });

  it("should handle nbetween operator", () => {
    const query = createQueryMock();
    generateFilter(
      { field: "age", operator: "nbetween", value: [18, 30] },
      query as any,
    );
    expect(query.or).toHaveBeenCalledWith("age.lt.18,age.gt.30");
  });

  it("should throw error if nbetween length is not 2", () => {
    const query = createQueryMock();
    expect(() =>
      generateFilter(
        { field: "age", operator: "nbetween", value: [18] },
        query as any,
      ),
    ).toThrow("Nbetween operator expects a range between 2 values");
  });

  it("should handle or operator with composite filters including nin, ncontains, nnull", () => {
    const query = createQueryMock();
    generateFilter(
      {
        operator: "or",
        value: [
          { field: "status", operator: "nin", value: ["archived", "banned"] },
          { field: "description", operator: "ncontains", value: "spam" },
          { field: "verified_at", operator: "nnull", value: null },
          { field: "code", operator: "startswith", value: "DEV" },
          { field: "code", operator: "nstartswith", value: "TEST" },
          { field: "ref", operator: "endswith", value: "XYZ" },
          { field: "ref", operator: "nendswith", value: "ABC" },
        ],
      },
      query as any,
    );

    expect(query.or).toHaveBeenCalledWith(
      'status.not.in.("archived","banned"),description.not.ilike."%spam%",verified_at.not.is.null,code.ilike.DEV%,code.not.ilike.TEST%,ref.ilike.%XYZ,ref.not.ilike.%ABC',
    );
  });
});
