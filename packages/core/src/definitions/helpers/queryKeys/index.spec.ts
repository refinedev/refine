import { queryKeys, queryKeysReplacement } from ".";

describe("queryKeys", () => {
  describe("all", () => {
    it("should return default data-provider", () => {
      expect(queryKeys().all).toEqual(["default"]);
    });
    it("should return custom data-provider", () => {
      expect(queryKeys(undefined, "custom-data-provider").all).toEqual([
        "custom-data-provider",
      ]);
    });
  });
  describe("resourceAll", () => {
    it("should return without data provider", () => {
      expect(queryKeys("post").resourceAll).toEqual(["default", "post"]);
    });
    it("should return with data provider", () => {
      expect(queryKeys("post", "custom-data-provider").resourceAll).toEqual([
        "custom-data-provider",
        "post",
      ]);
    });
    it("should return without resource", () => {
      expect(queryKeys(undefined, "custom-data-provider").resourceAll).toEqual([
        "custom-data-provider",
        "",
      ]);
    });
  });
  describe("list", () => {
    it("should return without data provider", () => {
      expect(queryKeys("post").list()).toEqual(["default", "post", "list", {}]);
    });
    it("should return with data provider", () => {
      expect(queryKeys("post", "custom-data-provider").list()).toEqual([
        "custom-data-provider",
        "post",
        "list",
        {},
      ]);
    });
    it("should return without resource", () => {
      expect(queryKeys(undefined, "custom-data-provider").list()).toEqual([
        "custom-data-provider",
        "",
        "list",
        {},
      ]);
    });
    it("should return with config", () => {
      expect(
        queryKeys(undefined, "custom-data-provider").list({
          hasPagination: false,
        }),
      ).toEqual([
        "custom-data-provider",
        "",
        "list",
        {
          hasPagination: false,
        },
      ]);
    });
    it("should return with config and meta", () => {
      expect(
        queryKeys(undefined, "custom-data-provider", {
          meta: {
            foo: "bar",
          },
        }).list({
          hasPagination: false,
        }),
      ).toEqual([
        "custom-data-provider",
        "",
        "list",
        {
          hasPagination: false,
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
    it("should return with config and metaData", () => {
      expect(
        queryKeys(undefined, "custom-data-provider", undefined, {
          meta: {
            foo: "bar",
          },
        }).list({
          hasPagination: false,
        }),
      ).toEqual([
        "custom-data-provider",
        "",
        "list",
        {
          hasPagination: false,
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
  });
  describe("many", () => {
    it("should return without data provider", () => {
      expect(queryKeys("post").many()).toEqual([
        "default",
        "post",
        "getMany",
        {},
      ]);
    });
    it("should return with data provider", () => {
      expect(queryKeys("post", "custom-data-provider").many()).toEqual([
        "custom-data-provider",
        "post",
        "getMany",
        {},
      ]);
    });
    it("should return without resource", () => {
      expect(queryKeys(undefined, "custom-data-provider").many()).toEqual([
        "custom-data-provider",
        "",
        "getMany",
        {},
      ]);
    });
    it("should return with ids", () => {
      expect(
        queryKeys(undefined, "custom-data-provider").many([1, 2, 3]),
      ).toEqual(["custom-data-provider", "", "getMany", ["1", "2", "3"], {}]);
    });
    it("should return with ids and meta", () => {
      expect(
        queryKeys(undefined, "custom-data-provider", {
          meta: {
            foo: "bar",
          },
        }).many([1, 2, 3]),
      ).toEqual([
        "custom-data-provider",
        "",
        "getMany",
        ["1", "2", "3"],
        {
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
    it("should return with ids and metaData", () => {
      expect(
        queryKeys(undefined, "custom-data-provider", undefined, {
          meta: {
            foo: "bar",
          },
        }).many([1, 2, 3]),
      ).toEqual([
        "custom-data-provider",
        "",
        "getMany",
        ["1", "2", "3"],
        {
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
  });
  describe("detail", () => {
    it("should return without data provider", () => {
      expect(queryKeys("post").detail(1)).toEqual([
        "default",
        "post",
        "detail",
        "1",
        {},
      ]);
    });
    it("should return with data provider", () => {
      expect(queryKeys("post", "custom-data-provider").detail(1)).toEqual([
        "custom-data-provider",
        "post",
        "detail",
        "1",
        {},
      ]);
    });
    it("should return without resource", () => {
      expect(queryKeys(undefined, "custom-data-provider").detail(1)).toEqual([
        "custom-data-provider",
        "",
        "detail",
        "1",
        {},
      ]);
    });
    it("should return without id", () => {
      expect(queryKeys(undefined, "custom-data-provider").detail()).toEqual([
        "custom-data-provider",
        "",
        "detail",
        undefined,
        {},
      ]);
    });
    it("should return with ids", () => {
      expect(queryKeys(undefined, "custom-data-provider").detail(1)).toEqual([
        "custom-data-provider",
        "",
        "detail",
        "1",
        {},
      ]);
    });
    it("should return with ids and meta", () => {
      expect(
        queryKeys(undefined, "custom-data-provider", {
          meta: {
            foo: "bar",
          },
        }).detail(1),
      ).toEqual([
        "custom-data-provider",
        "",
        "detail",
        "1",
        {
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
    it("should return with ids and metaData", () => {
      expect(
        queryKeys(undefined, "custom-data-provider", undefined, {
          meta: {
            foo: "bar",
          },
        }).detail(1),
      ).toEqual([
        "custom-data-provider",
        "",
        "detail",
        "1",
        {
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
  });
  describe("logList", () => {
    it("should return with resource", () => {
      expect(queryKeys("post").logList()).toEqual(["logList", "post"]);
    });
    it("should return with meta", () => {
      expect(
        queryKeys("post").logList({
          foo: "bar",
        }),
      ).toEqual([
        "logList",
        "post",
        {
          foo: "bar",
        },
      ]);
    });
    it("should return with metaData", () => {
      expect(
        queryKeys("post", undefined, undefined, {
          foo: "bar",
        }).logList(),
      ).toEqual([
        "logList",
        "post",
        {
          foo: "bar",
        },
      ]);
    });
  });
});

describe("queryKeysReplacement should match queryKeys", () => {
  describe("all", () => {
    it("should return default data-provider", () => {
      expect(queryKeysReplacement(true)().all).toEqual(["default"]);
    });
    it("should return custom data-provider", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider").all,
      ).toEqual(["custom-data-provider"]);
    });
  });
  describe("resourceAll", () => {
    it("should return without data provider", () => {
      expect(queryKeysReplacement(true)("post").resourceAll).toEqual([
        "default",
        "post",
      ]);
    });
    it("should return with data provider", () => {
      expect(
        queryKeysReplacement(true)("post", "custom-data-provider").resourceAll,
      ).toEqual(["custom-data-provider", "post"]);
    });
    it("should return without resource", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider")
          .resourceAll,
      ).toEqual(["custom-data-provider", ""]);
    });
  });
  describe("list", () => {
    it("should return without data provider", () => {
      expect(queryKeysReplacement(true)("post").list()).toEqual([
        "default",
        "post",
        "list",
        {},
      ]);
    });
    it("should return with data provider", () => {
      expect(
        queryKeysReplacement(true)("post", "custom-data-provider").list(),
      ).toEqual(["custom-data-provider", "post", "list", {}]);
    });
    it("should return without resource", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider").list(),
      ).toEqual(["custom-data-provider", "", "list", {}]);
    });
    it("should return with config", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider").list({
          hasPagination: false,
        }),
      ).toEqual([
        "custom-data-provider",
        "",
        "list",
        {
          hasPagination: false,
        },
      ]);
    });
    it("should return with config and meta", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider", {
          meta: {
            foo: "bar",
          },
        }).list({
          hasPagination: false,
        }),
      ).toEqual([
        "custom-data-provider",
        "",
        "list",
        {
          hasPagination: false,
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
    it("should return with config and metaData", () => {
      expect(
        queryKeysReplacement(true)(
          undefined,
          "custom-data-provider",
          undefined,
          {
            meta: {
              foo: "bar",
            },
          },
        ).list({
          hasPagination: false,
        }),
      ).toEqual([
        "custom-data-provider",
        "",
        "list",
        {
          hasPagination: false,
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
  });
  describe("many", () => {
    it("should return without data provider", () => {
      expect(queryKeysReplacement(true)("post").many()).toEqual([
        "default",
        "post",
        "getMany",
        {},
      ]);
    });
    it("should return with data provider", () => {
      expect(
        queryKeysReplacement(true)("post", "custom-data-provider").many(),
      ).toEqual(["custom-data-provider", "post", "getMany", {}]);
    });
    it("should return without resource", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider").many(),
      ).toEqual(["custom-data-provider", "", "getMany", {}]);
    });
    it("should return with ids", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider").many([
          1, 2, 3,
        ]),
      ).toEqual(["custom-data-provider", "", "getMany", ["1", "2", "3"], {}]);
    });
    it("should return with ids and meta", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider", {
          meta: {
            foo: "bar",
          },
        }).many([1, 2, 3]),
      ).toEqual([
        "custom-data-provider",
        "",
        "getMany",
        ["1", "2", "3"],
        {
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
    it("should return with ids and metaData", () => {
      expect(
        queryKeysReplacement(true)(
          undefined,
          "custom-data-provider",
          undefined,
          {
            meta: {
              foo: "bar",
            },
          },
        ).many([1, 2, 3]),
      ).toEqual([
        "custom-data-provider",
        "",
        "getMany",
        ["1", "2", "3"],
        {
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
  });
  describe("detail", () => {
    it("should return without data provider", () => {
      expect(queryKeysReplacement(true)("post").detail(1)).toEqual([
        "default",
        "post",
        "detail",
        "1",
        {},
      ]);
    });
    it("should return with data provider", () => {
      expect(
        queryKeysReplacement(true)("post", "custom-data-provider").detail(1),
      ).toEqual(["custom-data-provider", "post", "detail", "1", {}]);
    });
    it("should return without resource", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider").detail(1),
      ).toEqual(["custom-data-provider", "", "detail", "1", {}]);
    });
    it("should return without id", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider").detail(),
      ).toEqual(["custom-data-provider", "", "detail", undefined, {}]);
    });
    it("should return with ids", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider").detail(1),
      ).toEqual(["custom-data-provider", "", "detail", "1", {}]);
    });
    it("should return with ids and meta", () => {
      expect(
        queryKeysReplacement(true)(undefined, "custom-data-provider", {
          meta: {
            foo: "bar",
          },
        }).detail(1),
      ).toEqual([
        "custom-data-provider",
        "",
        "detail",
        "1",
        {
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
    it("should return with ids and metaData", () => {
      expect(
        queryKeysReplacement(true)(
          undefined,
          "custom-data-provider",
          undefined,
          {
            meta: {
              foo: "bar",
            },
          },
        ).detail(1),
      ).toEqual([
        "custom-data-provider",
        "",
        "detail",
        "1",
        {
          meta: {
            foo: "bar",
          },
        },
      ]);
    });
  });
  describe("logList", () => {
    it("should return with resource", () => {
      expect(queryKeysReplacement(true)("post").logList()).toEqual([
        "logList",
        "post",
      ]);
    });
    it("should return with meta", () => {
      expect(
        queryKeysReplacement(true)("post").logList({
          foo: "bar",
        }),
      ).toEqual([
        "logList",
        "post",
        {
          foo: "bar",
        },
      ]);
    });
    it("should return with metaData", () => {
      expect(
        queryKeysReplacement(true)("post", undefined, undefined, {
          foo: "bar",
        }).logList(),
      ).toEqual([
        "logList",
        "post",
        {
          foo: "bar",
        },
      ]);
    });
  });
});
