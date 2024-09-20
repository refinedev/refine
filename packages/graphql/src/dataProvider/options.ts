import type {
  BaseRecord,
  CreateParams,
  DeleteOneParams,
  GetListParams,
  GetListResponse,
  GetManyParams,
  GetManyResponse,
  GetOneParams,
  GetOneResponse,
  UpdateParams,
} from "@refinedev/core";
import camelCase from "camelcase";
import pluralize from "pluralize";

type GraphQLGetDataFunctionParams = { response: Record<string, any> } & (
  | { method: "getList"; params: GetListParams }
  | { method: "create"; params: CreateParams }
  | { method: "update"; params: UpdateParams }
  | { method: "getOne"; params: GetOneParams }
  | { method: "deleteOne"; params: DeleteOneParams }
  | { method: "getMany"; params: GetManyParams }
);

type ResponseMap = {
  getList: GetListResponse<any>;
  getOne: GetOneResponse<any>;
  getMany: GetManyResponse<any>;
  create: CreateParams;
  update: UpdateParams;
  deleteOne: DeleteOneParams;
};

type InferResponse<T extends GraphQLGetDataFunctionParams> = T extends {
  method: infer M;
}
  ? M extends keyof ResponseMap
    ? ResponseMap[M]
    : never
  : never;

type GraphQLGetDataFunction = (
  params: GraphQLGetDataFunctionParams,
) => InferResponse<typeof params>;

type GraphQLGetCountFunctionParams = Partial<{
  response: Record<string, any>;
  params: GetListParams;
}>;

type GraphQLGetCountFunction = (
  params: GraphQLGetCountFunctionParams,
) => number;

export type GraphQLDataProviderOptions = Partial<{
  getData: GraphQLGetDataFunction;
  getCount: GraphQLGetCountFunction;
}>;

export const defaultGetDataFn: GraphQLGetDataFunction = ({
  method,
  params,
  response,
}) => {
  const singularResource = pluralize.singular(params.resource);

  switch (method) {
    case "create": {
      const camelCreateName = camelCase(`create-${singularResource}`);
      const operation = params.meta?.operation ?? camelCreateName;

      return response[operation][singularResource];
    }
    case "deleteOne": {
      const camelDeleteName = camelCase(`delete-${singularResource}`);

      const operation = params.meta?.operation ?? camelDeleteName;

      return response[operation][singularResource];
    }
    case "getList": {
      const camelResource = camelCase(params.resource);
      const operation = params.meta?.operation ?? camelResource;

      return response[operation] ?? [];
    }
    case "getOne": {
      const camelResource = camelCase(singularResource);

      const operation = params.meta?.operation ?? camelResource;

      return response[operation];
    }
    case "update": {
      const camelUpdateName = camelCase(`update-${singularResource}`);
      const operation = params.meta?.operation ?? camelUpdateName;

      return response[operation][singularResource];
    }
  }
};

export const defaultGetCountFn: GraphQLGetCountFunction = ({
  params,
  response,
}): number => {
  const camelResource = camelCase(params.resource);

  const operation = params.meta?.operation ?? camelResource;

  return response[operation]?.totalCount ?? 0;
};
