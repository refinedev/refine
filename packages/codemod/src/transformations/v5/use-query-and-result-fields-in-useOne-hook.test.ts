import useQueryAndResultFieldsInUseOneTransform from "./use-query-and-result-fields-in-useOne-hook";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  return useQueryAndResultFieldsInUseOneTransform(j, root);
};

describe("use-query-and-result-fields-in-useOne-hook", () => {
  it("should handle result in useOne", () => {
    const source = `
      import { useOne } from "@refinedev/core";
      const { data } = useOne({
        id: 123
      });

      const post = data?.data ?? {};
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle renamed result in useOne", () => {
    const source = `
      import { useOne } from "@refinedev/core";
      const { data: postData } = useOne({
        id: 123
      });

      const post = postData?.data ?? {};
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle result with isLoading in useOne", () => {
    const source = /* tsx */ `
      import { useOne } from "@refinedev/core";

      export const EditProduct = () => {
        const { data, isLoading } = useOne({ id: 123 });

        if (isLoading) {
          return <div>Loading...</div>;
        }

        return (
          <div>
            <div>Product name: {data?.data.name}</div>
            <div>Product price: \${data?.data.price}</div>
          </div>
        );
      };
    `;

    expect(transform(source)).toMatchSnapshot();
  });
});
