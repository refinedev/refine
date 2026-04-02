import axios, { type AxiosInstance } from "axios";
import type { BaseRecord, DataProvider, GetListParams } from "@refinedev/core";
import { getLinkCursor, getRequestUrl, type GitHubCommit } from "./utils";

const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
const axiosInstance = axios.create(
  githubToken
    ? {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }
    : undefined,
);

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
    pagination,
  }: GetListParams) => {
    const pageSize = pagination?.pageSize || 10;
    const requestUrl = getRequestUrl({
      apiUrl,
      resource,
      pageSize,
      cursor: pagination?.cursor,
    });

    // Fetch the current page.
    const response = await httpClient.get<GitHubCommit[]>(requestUrl);
    const nextCursor = getLinkCursor({
      linkHeader: response.headers.link,
      rel: "next",
    });
    const previousCursor = getLinkCursor({
      linkHeader: response.headers.link,
      rel: "prev",
    });

    return {
      data: response.data as TData[],
      cursor: {
        ...(nextCursor ? { next: nextCursor } : {}),
        ...(previousCursor ? { prev: previousCursor } : {}),
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
