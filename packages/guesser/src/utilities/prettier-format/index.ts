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
        arrowParens: "always",
        trailingComma: "all",
        semi: true,
        tabWidth: 4,
        printWidth: 80,
    });
};
