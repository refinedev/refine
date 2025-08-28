import { describe, it, expect } from "@jest/globals";
import transform from "./useInfiniteList-return-type-update";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transformCode = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");

  return transform(
    { source, path: "test.tsx" },
    {
      jscodeshift: j,
      j,
      stats: () => {},
      report: () => {},
    },
    {},
  );
};

describe("useInfiniteList-return-type-update", () => {
  it("should transform basic useInfiniteList destructuring", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data,
          error,
          hasNextPage,
          isLoading,
          fetchNextPage,
          isFetchingNextPage,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transformCode(source)).toMatchSnapshot();
  });

  it("should handle renamed destructured properties", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data: posts,
          isLoading: loading,
          hasNextPage,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transformCode(source)).toMatchSnapshot();
  });

  it("should preserve overtime and other non-query/result properties", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data,
          isLoading,
          overtime,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transformCode(source)).toMatchSnapshot();
  });

  it("should handle only query properties", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          isLoading,
          error,
          fetchNextPage,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transformCode(source)).toMatchSnapshot();
  });

  it("should handle only result properties", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data,
          hasNextPage,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transformCode(source)).toMatchSnapshot();
  });

  it("should not transform non-destructured usage", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const queryResult = useInfiniteList({
          resource: "posts"
        });

        return <div>{queryResult.data}</div>;
      };
    `;

    expect(transformCode(source)).toMatchSnapshot();
  });

  it("should handle TypeScript generic usage", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      interface IPost {
        id: number;
        title: string;
      }

      const MyComponent = () => {
        const {
          data,
          hasNextPage,
          isLoading,
        } = useInfiniteList<IPost>({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transformCode(source)).toMatchSnapshot();
  });
});
