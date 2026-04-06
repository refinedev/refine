import { handlePaginationParams } from ".";

describe("handlePaginationParams", () => {
  it("should return default pagination", () => {
    expect(handlePaginationParams()).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "server",
    });
  });

  it("should return pagination from `pagination` prop", () => {
    expect(
      handlePaginationParams({
        pagination: { currentPage: 2, pageSize: 20, mode: "client" },
      }),
    ).toEqual({
      currentPage: 2,
      pageSize: 20,
      mode: "client",
    });
  });

  it("should return pagination from `config` prop", () => {
    expect(
      handlePaginationParams({
        pagination: { currentPage: 3, pageSize: 30 },
      }),
    ).toEqual({
      currentPage: 3,
      pageSize: 30,
      mode: "server",
    });
  });

  it("should return pagination from `pagination` prop if config is defined", () => {
    expect(
      handlePaginationParams({
        pagination: { currentPage: 2, pageSize: 20, mode: "client" },
      }),
    ).toEqual({
      currentPage: 2,
      pageSize: 20,
      mode: "client",
    });
  });

  it("if both `hasPagination` and `pagination.mode` are defined, should return according to `pagination` prop", () => {
    expect(
      handlePaginationParams({
        pagination: { mode: "client" },
      }),
    ).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "client",
    });
  });

  it("should normalize cursor pagination", () => {
    expect(
      handlePaginationParams({
        pagination: {
          mode: "cursor",
          pageSize: 20,
          cursor: {
            current: "cursor-1",
          },
        },
      }),
    ).toEqual({
      currentPage: 1,
      pageSize: 20,
      mode: "cursor",
      cursor: {
        current: "cursor-1",
        direction: "after",
      },
    });
  });

  it("should preserve explicit cursor direction", () => {
    expect(
      handlePaginationParams({
        pagination: {
          mode: "cursor",
          pageSize: 10,
          cursor: {
            current: "cursor-5",
            direction: "before",
          },
        },
      }),
    ).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "cursor",
      cursor: {
        current: "cursor-5",
        direction: "before",
      },
    });
  });

  it("should only pass current and direction in cursor (not next/prev)", () => {
    expect(
      handlePaginationParams({
        pagination: {
          mode: "cursor",
          pageSize: 10,
          cursor: {
            current: "cursor-3",
            direction: "after",
          },
        },
      }),
    ).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "cursor",
      cursor: {
        current: "cursor-3",
        direction: "after",
      },
    });
  });

  it("should handle empty cursor object", () => {
    expect(
      handlePaginationParams({
        pagination: {
          mode: "cursor",
          pageSize: 10,
          cursor: {},
        },
      }),
    ).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "cursor",
      cursor: {},
    });
  });

  it("should handle cursor with only direction", () => {
    expect(
      handlePaginationParams({
        pagination: {
          mode: "cursor",
          pageSize: 10,
          cursor: {
            direction: "before",
          },
        },
      }),
    ).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "cursor",
      cursor: {
        direction: "before",
      },
    });
  });

  it("should handle numeric cursor values", () => {
    expect(
      handlePaginationParams({
        pagination: {
          mode: "cursor",
          pageSize: 10,
          cursor: {
            current: 0,
            direction: "after",
          },
        },
      }),
    ).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "cursor",
      cursor: {
        current: 0,
        direction: "after",
      },
    });
  });
});
