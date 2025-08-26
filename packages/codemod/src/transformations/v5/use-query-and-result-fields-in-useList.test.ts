import useQueryAndResultFieldsInUseListTransform from "./use-query-and-result-fields-in-useList";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  return useQueryAndResultFieldsInUseListTransform(j, root);
};

describe("use-query-and-result-fields-in-useList", () => {
  it("should rename pagination.current to pagination.currentPage in useList", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data } = useList({
        resource: "posts",
        pagination: { current: 2, pageSize: 5 }
      });
    `;
    const expected = `
      import { useList } from "@refinedev/core";
      const { result: data } = useList({
        resource: "posts",
        pagination: { currentPage: 2, pageSize: 5 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename renamed data from useList", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data: stages } = useList<TaskStages>({
        resource: "taskStages",
        pagination: { current: 1, pageSize: 10 }
      });
    `;
    const expected = `
      import { useList } from "@refinedev/core";
      const { result: stages } = useList<TaskStages>({
        resource: "taskStages",
        pagination: { currentPage: 1, pageSize: 10 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });
});
