import { defaultGetDataFunc } from "../../src/dataProvider/options";

describe("default options", () => {
  describe("default get data", () => {
    describe("create", () => {
      const post = { id: 1, name: "John" };

      it("should return correct response with resource name", () => {
        const result = defaultGetDataFunc({
          method: "create",
          params: { resource: "posts", variables: { name: "John" } },
          response: {
            createPost: { post },
          },
        });

        expect(result).toEqual(post);
      });

      it("should return correct response with operation name", () => {
        const result = defaultGetDataFunc({
          method: "create",
          params: {
            resource: "posts",
            variables: { name: "John" },
            meta: { operation: "newPost" },
          },
          response: {
            newPost: { post },
          },
        });

        expect(result).toEqual(post);
      });
    });

    describe("delete", () => {
      const post = { id: 1, name: "John" };

      it("should return correct response with resource name", () => {
        const result = defaultGetDataFunc({
          method: "deleteOne",
          params: { resource: "posts", id: 1, variables: { name: "John" } },
          response: {
            deletePost: { post },
          },
        });

        expect(result).toEqual(post);
      });

      it("should return correct response with operation name", () => {
        const result = defaultGetDataFunc({
          method: "deleteOne",
          params: {
            resource: "posts",
            id: 1,
            variables: { name: "John" },
            meta: { operation: "nukedPost" },
          },
          response: {
            nukedPost: { post },
          },
        });

        expect(result).toEqual(post);
      });
    });

    describe("getList", () => {
      const posts = [{ id: 1 }];
      it("should return correct response with resource name", () => {
        const result = defaultGetDataFunc({
          method: "getList",
          params: { resource: "posts", meta: {} },
          response: {
            posts,
          },
        });

        expect(result).toEqual(posts);
      });

      it("should return correct response with operation name", () => {
        const result = defaultGetDataFunc({
          method: "getList",
          params: { resource: "posts", meta: { operation: "allPosts" } },
          response: {
            allPosts: posts,
          },
        });

        expect(result).toEqual(posts);
      });
    });

    describe("getOne", () => {
      const post = { id: 1, name: "John" };

      it("should return correct response with resource name", () => {
        const result = defaultGetDataFunc({
          method: "getOne",
          params: { resource: "posts", id: 1 },
          response: {
            post,
          },
        });

        expect(result).toEqual(post);
      });

      it("should return correct response with operation name", () => {
        const result = defaultGetDataFunc({
          method: "getOne",
          params: {
            resource: "posts",
            id: 1,
            meta: { operation: "thePost" },
          },
          response: {
            thePost: post,
          },
        });

        expect(result).toEqual(post);
      });
    });

    describe("update", () => {
      const post = { id: 1, name: "Alexander" };

      it("should return correct response with resource name", () => {
        const result = defaultGetDataFunc({
          method: "update",
          params: {
            resource: "posts",
            id: 1,
            variables: { name: "Alexander" },
          },
          response: {
            updatePost: { post },
          },
        });

        expect(result).toEqual(post);
      });

      it("should return correct response with operation name", () => {
        const result = defaultGetDataFunc({
          method: "update",
          params: {
            resource: "posts",
            id: 1,
            variables: { name: "Alexander" },
            meta: { operation: "updatedPost" },
          },
          response: {
            updatedPost: { post },
          },
        });

        expect(result).toEqual(post);
      });
    });
  });
});
