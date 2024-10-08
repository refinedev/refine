import { gql } from "@urql/core";
import type { CrudSort, GetListParams } from "@refinedev/core";

import { defaultOptions } from "../../src/dataProvider/options";

describe("defaultOptions.create", () => {
  describe("dataMapper", () => {
    it("should map response data correctly", () => {
      const response = {
        data: {
          createOneBlogPost: {
            id: 1,
            title: "Sample Blog Post",
            content: "This is a sample blog post content.",
          },
        },
      };
      const params = {
        resource: "blogPosts",
      };

      const result = defaultOptions.create.dataMapper(response, params);
      expect(result).toEqual({
        id: 1,
        title: "Sample Blog Post",
        content: "This is a sample blog post content.",
      });
    });

    it("should handle different resource names correctly", () => {
      const response = {
        data: {
          createOneCategory: {
            id: 1,
            name: "Sample Category",
          },
        },
      };
      const params = {
        resource: "categories",
      };

      const result = defaultOptions.create.dataMapper(response, params);
      expect(result).toEqual({
        id: 1,
        name: "Sample Category",
      });
    });
  });

  describe("buildVariables", () => {
    it("should build variables correctly for blogPosts", () => {
      const params = {
        resource: "blogPosts",
        variables: {
          title: "New Blog Post",
          content: "This is the content of the new blog post.",
        },
      };

      const expectedVariables = {
        input: {
          blogPost: {
            title: "New Blog Post",
            content: "This is the content of the new blog post.",
          },
        },
      };

      const result = defaultOptions.create.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });

    it("should build variables correctly for categories", () => {
      const params = {
        resource: "categories",
        variables: {
          name: "New Category",
        },
      };

      const expectedVariables = {
        input: {
          category: {
            name: "New Category",
          },
        },
      };

      const result = defaultOptions.create.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });
  });
});

describe("defaultOptions.createMany", () => {
  describe("dataMapper", () => {
    it("should map response data correctly for blogPosts", () => {
      const response = {
        data: {
          createManyBlogPosts: [
            {
              id: 1,
              title: "Sample Blog Post 1",
              content: "This is the content of the first sample blog post.",
            },
            {
              id: 2,
              title: "Sample Blog Post 2",
              content: "This is the content of the second sample blog post.",
            },
          ],
        },
      };
      const params = {
        resource: "blogPosts",
        variables: [
          {
            title: "Sample Blog Post 1",
            content: "This is the content of the first sample blog post.",
          },
          {
            title: "Sample Blog Post 2",
            content: "This is the content of the second sample blog post.",
          },
        ],
      };

      const result = defaultOptions.createMany.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          title: "Sample Blog Post 1",
          content: "This is the content of the first sample blog post.",
        },
        {
          id: 2,
          title: "Sample Blog Post 2",
          content: "This is the content of the second sample blog post.",
        },
      ]);
    });

    it("should handle different resource names correctly for categories", () => {
      const response = {
        data: {
          createManyCategories: [
            {
              id: 1,
              name: "Sample Category 1",
            },
            {
              id: 2,
              name: "Sample Category 2",
            },
          ],
        },
      };
      const params = {
        resource: "categories",
        variables: [
          {
            name: "Sample Category 1",
          },
          {
            name: "Sample Category 2",
          },
        ],
      };

      const result = defaultOptions.createMany.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          name: "Sample Category 1",
        },
        {
          id: 2,
          name: "Sample Category 2",
        },
      ]);
    });
  });

  describe("buildVariables", () => {
    it("should build variables correctly for blogPosts", () => {
      const params = {
        resource: "blogPosts",
        variables: [
          {
            title: "New Blog Post 1",
            content: "This is the content of the new blog post 1.",
          },
          {
            title: "New Blog Post 2",
            content: "This is the content of the new blog post 2.",
          },
        ],
      };

      const expectedVariables = {
        input: {
          blogPosts: [
            {
              title: "New Blog Post 1",
              content: "This is the content of the new blog post 1.",
            },
            {
              title: "New Blog Post 2",
              content: "This is the content of the new blog post 2.",
            },
          ],
        },
      };

      const result = defaultOptions.createMany.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });

    it("should build variables correctly for categories", () => {
      const params = {
        resource: "categories",
        variables: [
          {
            name: "New Category 1",
          },
          {
            name: "New Category 2",
          },
        ],
      };

      const expectedVariables = {
        input: {
          categories: [
            {
              name: "New Category 1",
            },
            {
              name: "New Category 2",
            },
          ],
        },
      };

      const result = defaultOptions.createMany.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });
  });
});

describe("defaultOptions.getOne", () => {
  describe("dataMapper", () => {
    it("should map response data correctly for blogPosts", () => {
      const response = {
        data: {
          blogPost: {
            id: 1,
            title: "Sample Blog Post",
            content: "This is a sample blog post content.",
          },
        },
      };
      const params = {
        resource: "blogPosts",
        id: 1,
      };

      const result = defaultOptions.getOne.dataMapper(response, params);
      expect(result).toEqual({
        id: 1,
        title: "Sample Blog Post",
        content: "This is a sample blog post content.",
      });
    });

    it("should handle different resource names correctly for categories", () => {
      const response = {
        data: {
          category: {
            id: 1,
            name: "Sample Category",
          },
        },
      };
      const params = {
        resource: "categories",
        id: 1,
      };

      const result = defaultOptions.getOne.dataMapper(response, params);
      expect(result).toEqual({
        id: 1,
        name: "Sample Category",
      });
    });
  });

  describe("buildVariables", () => {
    it("should build variables correctly for blogPosts", () => {
      const params = {
        id: 1,
        resource: "blogPosts",
      };

      const expectedVariables = {
        id: 1,
      };

      const result = defaultOptions.getOne.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });

    it("should build variables correctly for categories", () => {
      const params = {
        id: 1,
        resource: "categories",
      };

      const expectedVariables = {
        id: 1,
      };

      const result = defaultOptions.getOne.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });
  });

  describe("convertMutationToQuery", () => {
    it("should convert mutation to query correctly for blogPosts", () => {
      const params = {
        resource: "blogPosts",
        id: 1,
        meta: {
          gqlMutation: gql`
            mutation {
              blogPost(id: $id) {
                id
                title
                content
              }
            }
          `,
        },
      };

      const expectedQuery = gql`
        query GetBlogPost($id: ID!) {
          blogPost(id: $id) {
            id
            title
            content
          }
        }
      `;

      const result = defaultOptions.getOne.convertMutationToQuery(params);
      expect(result).toEqual(expectedQuery);
    });

    it("should convert mutation to query correctly for categories", () => {
      const params = {
        resource: "categories",
        id: 1,
        meta: {
          gqlMutation: gql`
            mutation {
              category(id: $id) {
                id
                name
              }
            }
          `,
        },
      };

      const expectedQuery = gql`
        query GetCategory($id: ID!) {
          category(id: $id) {
            id
            name
          }
        }
      `;

      const result = defaultOptions.getOne.convertMutationToQuery(params);
      expect(result).toEqual(expectedQuery);
    });

    it("should throw an error if no gqlOperation is provided", () => {
      const params = {
        resource: "blogPosts",
        id: 1,
        meta: {},
      };

      expect(() => {
        defaultOptions.getOne.convertMutationToQuery(params);
      }).toThrow("Operation is required.");
    });
  });
});

describe("defaultOptions.getList", () => {
  describe("dataMapper", () => {
    it("should map response data correctly for blogPosts", () => {
      const response = {
        data: {
          blogPosts: {
            nodes: [
              {
                id: 1,
                title: "Sample Blog Post 1",
                content: "This is the content of the first sample blog post.",
              },
              {
                id: 2,
                title: "Sample Blog Post 2",
                content: "This is the content of the second sample blog post.",
              },
            ],
          },
        },
      };
      const params = {
        resource: "blogPosts",
      };

      const result = defaultOptions.getList.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          title: "Sample Blog Post 1",
          content: "This is the content of the first sample blog post.",
        },
        {
          id: 2,
          title: "Sample Blog Post 2",
          content: "This is the content of the second sample blog post.",
        },
      ]);
    });

    it("should handle different resource names correctly for categories", () => {
      const response = {
        data: {
          categories: {
            nodes: [
              {
                id: 1,
                name: "Sample Category 1",
              },
              {
                id: 2,
                name: "Sample Category 2",
              },
            ],
          },
        },
      };
      const params = {
        resource: "categories",
      };

      const result = defaultOptions.getList.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          name: "Sample Category 1",
        },
        {
          id: 2,
          name: "Sample Category 2",
        },
      ]);
    });
  });

  describe("countMapper", () => {
    it("should map response count correctly for blogPosts", () => {
      const response = {
        data: {
          blogPosts: {
            totalCount: 42,
          },
        },
      };
      const params = {
        resource: "blogPosts",
      };

      const result = defaultOptions.getList.countMapper(response, params);
      expect(result).toEqual(42);
    });

    it("should handle different resource names correctly for categories", () => {
      const response = {
        data: {
          categories: {
            totalCount: 17,
          },
        },
      };
      const params = {
        resource: "categories",
      };

      const result = defaultOptions.getList.countMapper(response, params);
      expect(result).toEqual(17);
    });
  });

  describe("buildSorters", () => {
    it("should build sorters correctly for blogPosts", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        sorters: [
          { field: "title", order: "asc" },
          { field: "createdAt", order: "desc" },
        ],
      };

      const expectedSorters = [
        { field: "title", direction: "ASC" },
        { field: "createdAt", direction: "DESC" },
      ];

      const result = defaultOptions.getList.buildSorters(params);
      expect(result).toEqual(expectedSorters);
    });

    it("should handle empty sort array correctly", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        sort: [],
      };

      const expectedSorters: CrudSort[] = [];

      const result = defaultOptions.getList.buildSorters(params);
      expect(result).toEqual(expectedSorters);
    });
  });

  describe("buildFilters", () => {
    it("should build filters correctly for equality operator", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        filters: [{ field: "title", operator: "eq", value: "Sample Title" }],
      };

      const expectedFilters = {
        title: { eq: "Sample Title" },
      };

      const result = defaultOptions.getList.buildFilters(params);
      expect(result).toEqual(expectedFilters);
    });

    it("should build filters correctly for contains operator", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        filters: [{ field: "title", operator: "contains", value: "Sample" }],
      };

      const expectedFilters = {
        title: { iLike: "%Sample%" },
      };

      const result = defaultOptions.getList.buildFilters(params);
      expect(result).toEqual(expectedFilters);
    });

    it("should build filters correctly for between operator", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        filters: [{ field: "price", operator: "between", value: [10, 20] }],
      };

      const expectedFilters = {
        price: { between: { lower: 10, upper: 20 } },
      };

      const result = defaultOptions.getList.buildFilters(params);
      expect(result).toEqual(expectedFilters);
    });

    it("should build filters correctly for null operator", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        filters: [{ field: "description", operator: "null", value: true }],
      };

      const expectedFilters = {
        description: { is: null },
      };

      const result = defaultOptions.getList.buildFilters(params);
      expect(result).toEqual(expectedFilters);
    });

    it("should handle logical operators correctly", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        filters: [
          {
            operator: "and",
            value: [
              { field: "title", operator: "eq", value: "Sample Title" },
              { field: "price", operator: "gt", value: 10 },
            ],
          },
        ],
      };

      const expectedFilters = {
        and: [
          {
            title: { eq: "Sample Title" },
            price: { gt: 10 },
          },
        ],
      };

      const result = defaultOptions.getList.buildFilters(params);
      expect(result).toEqual(expectedFilters);
    });

    it("should filter out empty arrays", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        filters: [{ field: "tags", operator: "in", value: [] }],
      };

      const expectedFilters = {};

      const result = defaultOptions.getList.buildFilters(params);
      expect(result).toEqual(expectedFilters);
    });

    it("should filter out null or undefined values", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        filters: [
          { field: "title", operator: "eq", value: null },
          { field: "price", operator: "eq", value: undefined },
        ],
      };

      const expectedFilters = {};

      const result = defaultOptions.getList.buildFilters(params);
      expect(result).toEqual(expectedFilters);
    });
  });

  describe("buildPagination", () => {
    it("should build pagination correctly with page and perPage", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        pagination: {
          current: 2,
          pageSize: 10,
        },
      };

      const expectedPagination = {
        limit: 10,
        offset: 10,
      };

      const result = defaultOptions.getList.buildPagination(params);
      expect(result).toEqual(expectedPagination);
    });

    it("should handle pagination with default values", () => {
      const params: GetListParams = {
        resource: "blogPosts",
        pagination: {
          current: 1,
          pageSize: 20,
        },
      };

      const expectedPagination = {
        limit: 20,
        offset: 0,
      };

      const result = defaultOptions.getList.buildPagination(params);
      expect(result).toEqual(expectedPagination);
    });
  });
});

describe("defaultOptions.getMany", () => {
  describe("buildFilter", () => {
    it("should build filter correctly for blogPosts", () => {
      const params = {
        ids: [1, 2, 3],
        resource: "blogPosts",
      };

      const expectedFilter = {
        id: { in: [1, 2, 3] },
      };

      const result = defaultOptions.getMany.buildFilter(params);
      expect(result).toEqual(expectedFilter);
    });

    it("should build filter correctly for categories", () => {
      const params = {
        ids: [1, 2, 3],
        resource: "categories",
      };

      const expectedFilter = {
        id: { in: [1, 2, 3] },
      };

      const result = defaultOptions.getMany.buildFilter(params);
      expect(result).toEqual(expectedFilter);
    });
  });

  describe("dataMapper", () => {
    it("should map response data correctly for blogPosts", () => {
      const response = {
        data: {
          blogPosts: {
            nodes: [
              {
                id: 1,
                title: "Sample Blog Post 1",
                content: "This is the content of the first sample blog post.",
              },
              {
                id: 2,
                title: "Sample Blog Post 2",
                content: "This is the content of the second sample blog post.",
              },
            ],
          },
        },
      };
      const params = {
        resource: "blogPosts",
        ids: [1, 2],
      };

      const result = defaultOptions.getMany.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          title: "Sample Blog Post 1",
          content: "This is the content of the first sample blog post.",
        },
        {
          id: 2,
          title: "Sample Blog Post 2",
          content: "This is the content of the second sample blog post.",
        },
      ]);
    });

    it("should handle different resource names correctly for categories", () => {
      const response = {
        data: {
          categories: {
            nodes: [
              {
                id: 1,
                name: "Sample Category 1",
              },
              {
                id: 2,
                name: "Sample Category 2",
              },
            ],
          },
        },
      };
      const params = {
        resource: "categories",
        ids: [1, 2],
      };

      const result = defaultOptions.getMany.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          name: "Sample Category 1",
        },
        {
          id: 2,
          name: "Sample Category 2",
        },
      ]);
    });
  });
});

describe("defaultOptions.update", () => {
  describe("dataMapper", () => {
    it("should map response data correctly for blogPosts", () => {
      const response = {
        data: {
          updateOneBlogPost: {
            id: 1,
            title: "Updated Blog Post",
            content: "This is the updated content of the blog post.",
          },
        },
      };
      const params = {
        resource: "blogPosts",
      };

      const result = defaultOptions.update.dataMapper(response, params);
      expect(result).toEqual({
        id: 1,
        title: "Updated Blog Post",
        content: "This is the updated content of the blog post.",
      });
    });

    it("should handle different resource names correctly for categories", () => {
      const response = {
        data: {
          updateOneCategory: {
            id: 1,
            name: "Updated Category",
          },
        },
      };
      const params = {
        resource: "categories",
      };

      const result = defaultOptions.update.dataMapper(response, params);
      expect(result).toEqual({
        id: 1,
        name: "Updated Category",
      });
    });
  });

  describe("buildVariables", () => {
    it("should build variables correctly for blogPosts", () => {
      const params = {
        id: 1,
        resource: "blogPosts",
        variables: {
          title: "Updated Blog Post",
          content: "This is the updated content of the blog post.",
        },
      };

      const expectedVariables = {
        id: 1,
        update: {
          title: "Updated Blog Post",
          content: "This is the updated content of the blog post.",
        },
      };

      const result = defaultOptions.update.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });

    it("should build variables correctly for categories", () => {
      const params = {
        id: 1,
        resource: "categories",
        variables: {
          name: "Updated Category",
        },
      };

      const expectedVariables = {
        id: 1,
        update: {
          name: "Updated Category",
        },
      };

      const result = defaultOptions.update.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });
  });
});

describe("defaultOptions.updateMany", () => {
  describe("dataMapper", () => {
    it("should map response data correctly for blogPosts", () => {
      const response = {
        data: {
          updateManyBlogPosts: [
            {
              id: 1,
              title: "Updated Blog Post 1",
              content: "This is the updated content of the first blog post.",
            },
            {
              id: 2,
              title: "Updated Blog Post 2",
              content: "This is the updated content of the second blog post.",
            },
          ],
        },
      };
      const params = {
        resource: "blogPosts",
        ids: [1, 2],
        variables: [
          {
            name: "Updated Category 1",
          },
          {
            name: "Updated Category 2",
          },
        ],
      };

      const result = defaultOptions.updateMany.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          title: "Updated Blog Post 1",
          content: "This is the updated content of the first blog post.",
        },
        {
          id: 2,
          title: "Updated Blog Post 2",
          content: "This is the updated content of the second blog post.",
        },
      ]);
    });

    it("should handle different resource names correctly for categories", () => {
      const response = {
        data: {
          updateManyCategories: [
            {
              id: 1,
              name: "Updated Category 1",
            },
            {
              id: 2,
              name: "Updated Category 2",
            },
          ],
        },
      };
      const params = {
        resource: "categories",
        ids: [1, 2],
        variables: [
          {
            name: "Updated Category 1",
          },
          {
            name: "Updated Category 2",
          },
        ],
      };

      const result = defaultOptions.updateMany.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          name: "Updated Category 1",
        },
        {
          id: 2,
          name: "Updated Category 2",
        },
      ]);
    });
  });

  describe("buildVariables", () => {
    it("should build variables correctly for blogPosts", () => {
      const params = {
        ids: [1, 2],
        resource: "blogPosts",
        variables: {
          title: "Updated Blog Post",
          content: "This is the updated content of the blog post.",
        },
      };

      const expectedVariables = {
        input: {
          filter: { id: { in: [1, 2] } },
          update: {
            title: "Updated Blog Post",
            content: "This is the updated content of the blog post.",
          },
        },
      };

      const result = defaultOptions.updateMany.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });

    it("should build variables correctly for categories", () => {
      const params = {
        ids: [1, 2],
        resource: "categories",
        variables: {
          name: "Updated Category",
        },
      };

      const expectedVariables = {
        input: {
          filter: { id: { in: [1, 2] } },
          update: {
            name: "Updated Category",
          },
        },
      };

      const result = defaultOptions.updateMany.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });
  });
});

describe("defaultOptions.deleteOne", () => {
  describe("dataMapper", () => {
    it("should map response data correctly for blogPosts", () => {
      const response = {
        data: {
          deleteOneBlogPost: {
            id: 1,
            title: "Deleted Blog Post",
            content: "This is the content of the deleted blog post.",
          },
        },
      };
      const params = {
        resource: "blogPosts",
      };

      const result = defaultOptions.deleteOne.dataMapper(response, params);
      expect(result).toEqual({
        id: 1,
        title: "Deleted Blog Post",
        content: "This is the content of the deleted blog post.",
      });
    });

    it("should handle different resource names correctly for categories", () => {
      const response = {
        data: {
          deleteOneCategory: {
            id: 1,
            name: "Deleted Category",
          },
        },
      };
      const params = {
        resource: "categories",
      };

      const result = defaultOptions.deleteOne.dataMapper(response, params);
      expect(result).toEqual({
        id: 1,
        name: "Deleted Category",
      });
    });
  });

  describe("buildVariables", () => {
    it("should build variables correctly for blogPosts", () => {
      const params = {
        id: 1,
        resource: "blogPosts",
      };

      const expectedVariables = {
        input: { id: 1 },
      };

      const result = defaultOptions.deleteOne.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });

    it("should build variables correctly for categories", () => {
      const params = {
        id: 1,
        resource: "categories",
      };

      const expectedVariables = {
        input: { id: 1 },
      };

      const result = defaultOptions.deleteOne.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });
  });
});

describe("defaultOptions.deleteMany", () => {
  describe("dataMapper", () => {
    it("should map response data correctly for blogPosts", () => {
      const response = {
        data: {
          deleteManyBlogPosts: [
            {
              id: 1,
              title: "Deleted Blog Post 1",
              content: "This is the content of the first deleted blog post.",
            },
            {
              id: 2,
              title: "Deleted Blog Post 2",
              content: "This is the content of the second deleted blog post.",
            },
          ],
        },
      };
      const params = {
        resource: "blogPosts",
        ids: [1, 2],
      };

      const result = defaultOptions.deleteMany.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          title: "Deleted Blog Post 1",
          content: "This is the content of the first deleted blog post.",
        },
        {
          id: 2,
          title: "Deleted Blog Post 2",
          content: "This is the content of the second deleted blog post.",
        },
      ]);
    });

    it("should handle different resource names correctly for categories", () => {
      const response = {
        data: {
          deleteManyCategories: [
            {
              id: 1,
              name: "Deleted Category 1",
            },
            {
              id: 2,
              name: "Deleted Category 2",
            },
          ],
        },
      };
      const params = {
        resource: "categories",
        ids: [1, 2],
      };

      const result = defaultOptions.deleteMany.dataMapper(response, params);
      expect(result).toEqual([
        {
          id: 1,
          name: "Deleted Category 1",
        },
        {
          id: 2,
          name: "Deleted Category 2",
        },
      ]);
    });
  });

  describe("buildVariables", () => {
    it("should build variables correctly for blogPosts", () => {
      const params = {
        ids: [1, 2],
        resource: "blogPosts",
      };

      const expectedVariables = {
        input: {
          filter: {
            id: { in: [1, 2] },
          },
        },
      };

      const result = defaultOptions.deleteMany.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });

    it("should build variables correctly for categories", () => {
      const params = {
        ids: [1, 2],
        resource: "categories",
      };

      const expectedVariables = {
        input: {
          filter: {
            id: { in: [1, 2] },
          },
        },
      };

      const result = defaultOptions.deleteMany.buildVariables(params);
      expect(result).toEqual(expectedVariables);
    });
  });
});
