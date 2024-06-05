import globby from "globby";
import path from "path";
import {
  noOpOutputFileTransforms,
  type OutputFileTransformer,
} from "./output-file-transforms";
import { DEFAULT_IGNORE_PATTERNS } from "./constants";
import { compile } from "./compile";

export type CompileDirOptions = {
  inputDir: string;
  outputDir: string;
  encoding?: BufferEncoding;
  data?: Record<string, any>;
  excludePatterns?: string[];
  outputFileTransforms?: OutputFileTransformer;
  onStart?: (context: { total: number }) => void;
  onStep?: (context: {
    current: number;
    total: number;
    input: string;
    output: string;
  }) => void;
  onFinish?: (context: { total: number }) => void;
};

export const compileDir = async ({
  inputDir,
  outputDir,
  encoding = "utf-8",
  data = {},
  outputFileTransforms = noOpOutputFileTransforms,
  excludePatterns = [],
  onStart = () => 0,
  onStep = () => 0,
  onFinish = () => 0,
}: CompileDirOptions) => {
  const files = await globby(inputDir, {
    ignore: [...excludePatterns, ...DEFAULT_IGNORE_PATTERNS],
  });

  onStart({ total: files.length });

  for (const file of files) {
    const input = file;
    const output = path.join(outputDir, path.relative(inputDir, input));

    const result = await compile({
      input,
      output,
      encoding,
      data,
      outputFileTransforms,
    });

    onStep({
      current: files.indexOf(file) + 1,
      total: files.length,
      ...result,
    });
  }

  onFinish({ total: files.length });
};
