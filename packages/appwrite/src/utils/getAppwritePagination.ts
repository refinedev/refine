import { Query } from "appwrite";

export const getAppwritePagination = (current: number, pageSize: number) => {
  return [Query.offset((current - 1) * pageSize), Query.limit(pageSize)];
};
