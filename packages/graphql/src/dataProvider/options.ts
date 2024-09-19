import type {
  BaseRecord,
  CreateParams,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
} from "@refinedev/core";
import camelCase from "camelcase";
import pluralize from "pluralize";

"asd".toUpperCase;

type GraphQLGetDataFunctionParams = { response: Record<string, any> } & (
  | { method: "getList"; params: GetListParams }
  | { method: "create"; params: CreateParams }
  | { method: "update"; params: UpdateParams }
  | { method: "getOne"; params: GetOneParams }
  | { method: "deleteOne"; params: DeleteOneParams }
);

type GraphQLGetDataFunction = (params: GraphQLGetDataFunctionParams) => any;

type GraphQLGetCountFunctionParams = {
  response: Record<string, any>;
  params: GetListParams;
};

type GraphQLGetCountFunction = (
  params: GraphQLGetCountFunctionParams,
) => number;

export type GraphQLDataProviderOptions = {
  getData: GraphQLGetDataFunction;
  getCount: GraphQLGetCountFunction;
};

export const defaultGetDataFunc: GraphQLGetDataFunction = ({
  method,
  params,
  response,
}) => {
  const singularResource = pluralize.singular(params.resource);

  switch (method) {
    case "create": {
      const camelCreateName = camelCase(`create-${singularResource}`);
      const operation = params.meta?.operation ?? camelCreateName;

      // console.log(response, operation, singularResource);

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

export const defaultGetCountFunc: GraphQLGetCountFunction = ({
  params,
  response,
}): number => {
  const camelResource = camelCase(params.resource);

  const operation = params.meta?.operation ?? camelResource;

  return response[operation]?.totalCount ?? 0;
};
