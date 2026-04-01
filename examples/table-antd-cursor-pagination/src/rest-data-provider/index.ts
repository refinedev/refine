import axios, { type AxiosInstance } from "axios";
import type { DataProvider } from "@refinedev/core";

const axiosInstance = axios.create();

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination }) => {
    let url = `${apiUrl}/${resource}?per_page=${pagination?.pageSize || 10}`;

    if (pagination?.cursor?.current !== undefined) {
      const direction = pagination.cursor.direction ?? "after";
      const cursorParam = direction === "before" ? "since" : "until";

      url = `${url}&${cursorParam}=${pagination.cursor.current}`;
    }

    const { data } = await httpClient.get(url);

    const firstItem = data[0];
    const lastItem = data[data.length - 1];
    const previousCursor =
      pagination?.cursor?.current !== undefined
        ? firstItem?.commit?.committer?.date
        : undefined;
    const nextCursor = lastItem?.commit?.committer?.date;

    return {
      data,
      total: 200,
      cursor: {
        next: nextCursor,
        prev: previousCursor,
      },
    };
  },

  getMany: async () => {
    throw new Error("Not implemented");
  },

  create: async () => {
    throw new Error("Not implemented");
  },

  update: async () => {
    throw new Error("Not implemented");
  },

  getOne: async () => {
    throw new Error("Not implemented");
  },

  deleteOne: async () => {
    throw new Error("Not implemented");
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async () => {
    throw new Error("Not implemented");
  },
});
