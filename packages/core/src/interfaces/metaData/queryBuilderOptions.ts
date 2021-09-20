import { VariableOptions } from "./variableOptions";
import { Fields } from "./fields";

export interface QueryBuilderOptions {
    operation?: string;
    fields?: Fields;
    variables?: VariableOptions;
}
