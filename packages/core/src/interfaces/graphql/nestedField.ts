import { Fields } from "./fields";
import { QueryBuilderOptions } from "./queryBuilderOptions";

export type NestedField = {
    operation: string;
    variables: QueryBuilderOptions[];
    fields: Fields;
};
