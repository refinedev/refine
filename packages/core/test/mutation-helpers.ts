import { useList, useMany, useOne } from "../src/hooks/data";
import { TestWrapper, renderHook, waitFor } from "./";
import { MockJSONServer } from "./dataMocks";

const extractData = (
  listResult:
    | ReturnType<typeof renderUseList>
    | ReturnType<typeof renderUseMany>,
) => {
  return "query" in listResult.current
    ? listResult.current.result?.data
    : listResult.current.data?.data;
};

export const renderUseOne = () => {
  const { result: useOneResult } = renderHook(
    () => useOne({ resource: "posts", id: "1" }),
    {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
      }),
    },
  );

  return useOneResult;
};

export const renderUseList = () => {
  const { result: useListResult } = renderHook(
    () => useList({ resource: "posts" }),
    {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
      }),
    },
  );

  return useListResult;
};

export const renderUseMany = () => {
  const { result: useManyResult } = renderHook(
    () => useMany({ resource: "posts", ids: ["1", "2"] }),
    {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
      }),
    },
  );

  return useManyResult;
};

export const assertOne = async (
  useOneResult: ReturnType<typeof renderUseOne>,
  property: string,
  value: string | undefined,
) => {
  await waitFor(() => {
    expect(useOneResult.current.data?.data[property]).toEqual(value);
  });
};

export const assertList = async (
  listResult:
    | ReturnType<typeof renderUseList>
    | ReturnType<typeof renderUseMany>,
  keyInput: string,
  valueInput: string | string[] | undefined,
) => {
  await waitFor(() => {
    const data = extractData(listResult);
    if (Array.isArray(valueInput)) {
      valueInput.forEach((value, index) => {
        expect(data?.[index][keyInput]).toEqual(value);
      });
    } else if (typeof valueInput === "string") {
      expect(data?.map((d) => d[keyInput])).toContainEqual(valueInput);
    }
  });
};

export const assertListLength = async (
  listResult:
    | ReturnType<typeof renderUseList>
    | ReturnType<typeof renderUseMany>,
  length: number,
) => {
  await waitFor(() => {
    expect(extractData(listResult)).toHaveLength(length);
  });
};

export const assertMutationSuccess = async (mutationResult: any) => {
  await waitFor(
    () => {
      expect(mutationResult.current.isSuccess).toBeTruthy();
    },
    { timeout: 2000 },
  );
};
