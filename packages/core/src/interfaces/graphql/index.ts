import { BaseKey } from "..";
import { QueryBuilderOptions } from "./queryBuilderOptions";
import { RawQuery } from "./rawQuery";

export type GraphQL = {
    rawQuery: (props: {
        // TODO: fix me
        resource?: string;
        id?: BaseKey;
        ids?: BaseKey[];
    }) => RawQuery;
} & QueryBuilderOptions;

export type GraphQLDataProvider = {
    rawQuery?: RawQuery;
} & QueryBuilderOptions;
