import prettier from "prettier/standalone";
import tsParser from "prettier/parser-typescript";

/**
 * Standalone prettier formatter with typescript parser
 * to format the generated code.
 */
export const prettierFormat = (code: string) => {
    return prettier.format(code, {
        parser: "typescript",
        plugins: [tsParser],
    });
};
