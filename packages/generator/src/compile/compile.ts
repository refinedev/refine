import ejs from "ejs";
import fs from "fs/promises";
import { ejsOptions } from "./ejs-options";
import { writeFileRecursive } from "../utils/write-file-recursive";
import {
  noOpOutputFileTransforms,
  type OutputFileTransformer,
} from "./output-file-transforms";

export type CompileOptions = {
  input: string;
  output: string;
  encoding?: BufferEncoding;
  data?: Record<string, any>;
  outputFileTransforms?: OutputFileTransformer;
};

export const compile = async ({
  input,
  output: defaultOutput,
  encoding = "utf-8",
  data = {},
  outputFileTransforms = noOpOutputFileTransforms,
}: CompileOptions) => {
  const inputContent = await fs.readFile(input, "utf-8");

  let transformed = inputContent;

  for (const option of ejsOptions) {
    transformed = await ejs.render(transformed, data, option);
  }

  const { outputFile: filePath, content: fileContent } = outputFileTransforms({
    content: transformed,
    inputFile: input,
    outputFile: defaultOutput,
  });

  await writeFileRecursive({
    fileContent,
    filePath,
    encoding,
  });

  return { input, output: filePath };
};
