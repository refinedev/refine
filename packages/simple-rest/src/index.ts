import { stringify as queryStringStringify } from "query-string";
import { dataProvider } from "./provider";

export default dataProvider;

export * from "./utils";

/**
 * @deprecated Use `stringify` from `query-string` instead. This function will be removed in the next major version. To install `query-string` run `npm install query-string`
 **/
const stringify = queryStringStringify;

export { stringify };
