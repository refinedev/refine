import { routeGenerator } from ".";
import type { ResourceProps } from "../../../contexts/resource/types";

const mockResources: ResourceProps[] = [
  { name: "posts" },
  {
    name: "category",
  },
  {
    name: "active",
    parentName: "posts",
  },
  {
    name: "first",
    parentName: "active",
  },
];

const mockItemResourcePropsWithoutParent: ResourceProps = {
  name: "category",
};

const mockItemResourcePropsWithParent: ResourceProps = {
  name: "active",
  parentName: "posts",
};

const mockItemResourcePropsWithTwoParent: ResourceProps = {
  name: "first",
  parentName: "active",
};

describe("routeGenerator", () => {
  it("should return category route", async () => {
    const route = routeGenerator(
      mockItemResourcePropsWithoutParent,
      mockResources,
    );
    expect(route).toEqual("/category");
  });

  it("should equal return with parent route", async () => {
    const route = routeGenerator(
      mockItemResourcePropsWithParent,
      mockResources,
    );
    expect(route).toEqual("/posts/active");
  });

  it("should return exect route", async () => {
    const route = routeGenerator(
      mockItemResourcePropsWithTwoParent,
      mockResources,
    );
    expect(route).toEqual("/posts/active/first");
  });

  it("should return exect route with meta.route", async () => {
    const route = routeGenerator(
      {
        ...mockItemResourcePropsWithTwoParent,
        meta: {
          route: "foo",
        },
      },
      mockResources,
    );
    expect(route).toEqual("/posts/active/foo");
  });
});
