import { handlePaginationParams } from ".";

describe("handlePaginationParams", () => {
  it("should return default pagination", () => {
    expect(handlePaginationParams()).toEqual({
      current: 1,
      pageSize: 10,
      mode: "server",
    });
  });

  it("should return pagination from `pagination` prop", () => {
    expect(
      handlePaginationParams({
        pagination: { current: 2, pageSize: 20, mode: "client" },
      }),
    ).toEqual({
      current: 2,
      pageSize: 20,
      mode: "client",
    });
  });

  it("should return pagination from `config` prop", () => {
    expect(
      handlePaginationParams({
        configPagination: { current: 3, pageSize: 30 },
      }),
    ).toEqual({
      current: 3,
      pageSize: 30,
      mode: "server",
    });
  });

  it("should return pagination from `pagination` prop if config is defined", () => {
    expect(
      handlePaginationParams({
        pagination: { current: 2, pageSize: 20, mode: "client" },
        configPagination: { current: 3, pageSize: 30 },
      }),
    ).toEqual({
      current: 2,
      pageSize: 20,
      mode: "client",
    });
  });

  it("if `mode` is not defined in `pagination` prop, should return according to `hasPagination` prop", () => {
    expect(
      handlePaginationParams({
        hasPagination: false,
      }),
    ).toEqual({
      current: 1,
      pageSize: 10,
      mode: "off",
    });
  });

  it("if both `hasPagination` and `pagination.mode` are defined, should return according to `pagination` prop", () => {
    expect(
      handlePaginationParams({
        hasPagination: true,
        pagination: { mode: "client" },
      }),
    ).toEqual({
      current: 1,
      pageSize: 10,
      mode: "client",
    });
  });
});
