export * from "./definitions/index.ts";
export { getImports, getNameChangeInImport } from "./utils/swizzle/import.ts";
export { appendAfterImports } from "./utils/swizzle/appendAfterImports.ts";
export { getFileContent } from "./utils/swizzle/getFileContent.ts";
export type { ImportMatch, NameChangeMatch } from "./utils/swizzle/import.ts";
