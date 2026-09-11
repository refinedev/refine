import queryString from "query-string";
import { dataProvider } from "./provider.js";

const { stringify } = queryString;

export default dataProvider;

export * from "./utils/index.js";

export { stringify };
