// @ts-nocheck
import { singular } from "pluralize";
import { buildFilters } from "../utils/buildFilters";
import camelcase from "camelcase";

export const poptions = {
  create: {
    dataMapper: (response, params) => {
      const key = `createOne${camelcase(singular(params.resource), {
        pascalCase: true,
      })}`;

      return response.data[key];
    },
    buildVariables: (params) => {
      return {
        input: { [singular(params.resource)]: params.variables },
      };
    },
  },
  createMany: {
    dataMapper: (response, params) => {
      const key = `createMany${camelcase(resource, { pascalCase: true })}`;
    },
    buildVariables: (params) => {
      return {
        input: {
          [camelcase(params.resource)]: params.variables,
        },
      };
    },
  },
  getOne: {
    dataMapper: (response, params) => {},
  },
  getList: {
    dataMapper: (response, params) => {
      return response.data[params.resource].nodes;
    },
    countMapper: (response, params) => {
      return response.data[params.resource].totalCount;
    },
    buildSorters: (params) => {
      const { sorters = [] } = params;

      return sorters.map((s) => ({
        field: s.field,
        direction: s.order.toUpperCase(),
      }));
    },
    buildFilters: (params) => buildFilters(params.filters),
    buildPagination: (params) => {
      const { pagination = {} } = params;

      // maximum value of 32 bit signed integer
      if (pagination.mode === "off") return { limit: 2147483647 };

      const { pageSize = 10, current = 1 } = pagination;

      return {
        limit: pageSize,
        offset: (current - 1) * pageSize,
      };
    },
  },
  getMany: {
    dataMapper: (response, params) => [],
  },
  update: {
    dataMapper: (response, params) => {},
  },
  updateMany: {
    dataMapper: (response, params) => {},
  },
  deleteOne: {
    dataMapper: (response, params) => {},
  },
  deleteMany: {
    dataMapper: (response, params) => {},
  },
};

// create
// createMany
// getOne
// getList
// getMany
// update
// updateMany
// deleteOne
// deleteMany

// class RefineDataLayer {
//   constructor(apiURL: string, authURL: string) {

//   }

//   async getList(params: any): {

//     return []
//   }

//   async login(username: string): {
//     return {
//       success: true
//     }
//   }
// }

// const createRefineLayer = (apiURL: string, authURL: string): RefineDataLayer => {
//   const layer = new RefineDataLayer(apiURL, authURL)

//   return layer
// }

// createRefineLayer.
