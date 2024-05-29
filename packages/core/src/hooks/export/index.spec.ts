import { renderHook } from "@testing-library/react";
import papaparse from "papaparse";

import { MockJSONServer, TestWrapper, act } from "@test";
import { mockRouterProvider, posts } from "@test/dataMocks";

import { downloadInBrowser } from "../../definitions/helpers/downloadInBrowser";
import * as pickDataProvider from "../../definitions/helpers/pickDataProvider";
import { type ExportOptions, useExport } from "./";

const testCsv = "col1,col2\r\ncell1,cell2";
jest.mock("papaparse", () => ({
  unparse: jest.fn(() => testCsv),
}));

jest.mock("../../definitions/helpers/downloadInBrowser", () => ({
  downloadInBrowser: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useExport Hook", () => {
  it("should render", () => {
    renderHook(() => useExport(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });
  });

  it("should trigger export correctly", async () => {
    const { result } = renderHook(() => useExport(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });
    let resultingCSV = null;
    await act(async () => {
      resultingCSV = await result.current.triggerExport();
    });

    expect(papaparse.unparse).toBeCalledWith(posts, expect.anything());
    expect(resultingCSV).toEqual(testCsv);
  });

  it.each(["categories", "posts"])(
    "should call getList with '%s' resource",
    async (testCase) => {
      const getListMock = jest.fn();

      const { result } = renderHook(
        () =>
          useExport({
            resource: testCase,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer.default,
              getList: (props) => getListMock(props.resource),
            },
            resources: [{ name: "posts" }, { name: "categories" }],
          }),
        },
      );

      await act(async () => {
        await result.current.triggerExport();
      });

      expect(getListMock).toBeCalledWith(testCase);
    },
  );

  it("should call getList with resource from router provider", async () => {
    const getListMock = jest.fn();

    const { result } = renderHook(() => useExport(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          resource: {
            name: "posts",
            list: "/posts",
          },
        }),
        dataProvider: {
          ...MockJSONServer.default,
          getList: (props) => getListMock(props.resource),
        },
        resources: [{ name: "posts" }, { name: "categories" }],
      }),
    });

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(getListMock).toBeCalledWith("posts");
  });

  it("should cut the amount of data to be exported when given maxItemCount", async () => {
    const { result } = renderHook(
      () =>
        useExport({
          maxItemCount: 1,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(papaparse.unparse).toBeCalledWith([posts[0]], expect.anything());
  });

  it("should work with custom pageSize", async () => {
    const { result } = renderHook(
      () =>
        useExport({
          pageSize: 1,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(papaparse.unparse).toBeCalledWith(posts, expect.anything());
  });

  it("should work with custom mapData", async () => {
    const { result } = renderHook(
      () =>
        useExport({
          mapData: (item) => ({
            id: item.id,
            title: item.title,
          }),
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(papaparse.unparse).toBeCalledWith(
      posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      expect.anything(),
    );
  });

  it("should handle getList throwing error", async () => {
    const onError = jest.fn();
    const { result } = renderHook(
      () =>
        useExport({
          onError,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: () => {
                throw new Error("Error");
              },
            } as any,
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.triggerExport();
    });

    expect(result.current.isLoading).toEqual(false);
    expect(onError).toBeCalledWith(Error("Error"));

    expect(papaparse.unparse).not.toBeCalled();
  });

  it.each(["identifier", "name"])(
    "should use identifier, before resource.name when selecting dataProvider. test case: %s",
    async (testCase) => {
      const isIdentifier = testCase === "identifier";

      const pickDataProviderSpy = jest.spyOn(
        pickDataProvider,
        "pickDataProvider",
      );

      const { result } = renderHook(() => useExport(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          routerProvider: mockRouterProvider({
            resource: {
              name: "postsName",
              identifier: isIdentifier ? "postsIdentifier" : undefined,
            },
          }),
        }),
      });

      await act(async () => {
        await result.current.triggerExport();
      });

      expect(papaparse.unparse).toBeCalledWith(posts, expect.anything());

      if (isIdentifier) {
        expect(pickDataProviderSpy).toBeCalledWith(
          "postsIdentifier",
          undefined,
          [],
        );
      } else {
        expect(pickDataProviderSpy).toBeCalledWith("postsName", undefined, []);
      }

      jest.clearAllMocks();
    },
  );
  describe("should exportOptions be backwards compatible", () => {
    type TestCase = {
      exportOptions?: ExportOptions;
      expectations?: {
        unparseConfig: papaparse.UnparseConfig;
        filename: string | RegExp;
        useBom: boolean;
        csvToSave: string;
      };
    };
    const defaultUnparseConfig: papaparse.UnparseConfig = {
      quoteChar: '"',
      header: true,
      delimiter: undefined,
      columns: undefined,
      quotes: true,
    };

    const defaultExpect: TestCase["expectations"] = {
      unparseConfig: defaultUnparseConfig,
      filename: /\.csv$/,
      csvToSave: testCsv,
      useBom: true,
    };

    const createExpectations = (
      expects?: Partial<TestCase["expectations"]>,
    ) => {
      const { unparseConfig, ...rest } = expects ?? {};
      return {
        ...defaultExpect,
        unparseConfig: {
          ...defaultExpect.unparseConfig,
          ...unparseConfig,
        },
        ...rest,
      };
    };

    const TEST_CASES: TestCase[] = [
      {},
      {
        exportOptions: undefined,
      },
      {
        exportOptions: {
          filename: "my file",
        },
        expectations: createExpectations({
          filename: "my_file.csv",
        }),
      },
      {
        exportOptions: {
          useTextFile: true,
        },
        expectations: createExpectations({
          filename: /\.txt$/,
        }),
      },
      {
        exportOptions: {
          title: "some-tile",
        },
      },
      {
        exportOptions: {
          title: "some-title",
          showTitle: true,
        },
        expectations: createExpectations({
          csvToSave: `some-title\r\n\n${testCsv}`,
        }),
      },
      {
        exportOptions: {
          useBom: false,
        },
        expectations: createExpectations({
          useBom: false,
        }),
      },
      {
        exportOptions: {
          useBom: true,
        },
        expectations: createExpectations({
          useBom: true,
        }),
      },
      {
        exportOptions: {
          quoteStrings: "my-quote",
        },
        expectations: createExpectations({
          unparseConfig: {
            quoteChar: "my-quote",
          },
        }),
      },
      {
        exportOptions: {
          fieldSeparator: "my-field-separator",
        },
        expectations: createExpectations({
          unparseConfig: {
            delimiter: "my-field-separator",
          },
        }),
      },
      {
        exportOptions: {
          decimalSeparator: "does nothing",
        },
      },
      {
        exportOptions: {
          useKeysAsHeaders: false,
        },
        expectations: createExpectations({
          unparseConfig: {
            header: false,
          },
        }),
      },
      {
        // useKeysAsHeaders takes priority over options.headers
        exportOptions: {
          headers: ["col1"],
        },
      },
      {
        exportOptions: {
          useKeysAsHeaders: false,
          headers: ["col1"],
        },
        expectations: createExpectations({
          unparseConfig: {
            header: false,
            columns: ["col1"],
          },
        }),
      },
      {
        exportOptions: {
          useKeysAsHeaders: false,
          showLabels: true,
          headers: ["col1"],
        },
        expectations: createExpectations({
          unparseConfig: {
            header: true,
            columns: ["col1"],
          },
        }),
      },
    ];

    it.each(TEST_CASES)(
      "exportOptions=$exportOptions",
      async ({ exportOptions, expectations }) => {
        const { result } = renderHook(
          () =>
            useExport({
              exportOptions,
            }),
          {
            wrapper: TestWrapper({
              dataProvider: MockJSONServer,
              resources: [{ name: "posts" }],
            }),
          },
        );

        let resultCSV = null;
        await act(async () => {
          resultCSV = await result.current.triggerExport();
        });

        expectations = expectations ?? defaultExpect;
        expect(resultCSV).toEqual(expectations.csvToSave);
        expect(papaparse.unparse).toBeCalledWith(
          posts,
          expectations.unparseConfig,
        );
        expect(downloadInBrowser).toBeCalledWith(
          expect.stringMatching(expectations.filename),
          `${expectations.useBom ? "\ufeff" : ""}${expectations.csvToSave}`,
          expect.stringContaining(
            exportOptions?.useTextFile ? "text/plain" : "text/csv",
          ),
        );
      },
    );
  });
  it("should now download when set to false", async () => {
    const { result } = renderHook(
      () =>
        useExport({
          download: false,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    let resultCSV = null;
    await act(async () => {
      resultCSV = await result.current.triggerExport();
    });

    expect(resultCSV).toEqual(testCsv);
    expect(downloadInBrowser).not.toBeCalled();
  });
});
