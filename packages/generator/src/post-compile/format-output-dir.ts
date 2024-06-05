import globby from "globby";
import fs from "fs/promises";
import { format, type Options as PrettierOptions } from "prettier";

export type FormatOutputDirOptions = {
  outputDir: string;
  formatOptions?: PrettierOptions;
};

const defaultOptions: PrettierOptions = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  printWidth: 80,
  tabWidth: 2,
};

const extensions = ["js", "ts", "json", "md", "jsx", "tsx", "css", "html"];

export const formatOutputDir = async ({
  outputDir,
  formatOptions = defaultOptions,
}: FormatOutputDirOptions) => {
  const files = await globby(`${outputDir}/**/*.{${extensions.join(",")}}`);

  await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(file, "utf-8");
      const formatted = await format(content, {
        filepath: file,
        ...defaultOptions,
        ...formatOptions,
      });

      await fs.writeFile(file, formatted);
    })
  );
};
