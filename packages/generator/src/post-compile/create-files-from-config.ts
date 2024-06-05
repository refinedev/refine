import path from "path";
import { writeFileRecursive } from "../utils/write-file-recursive";

export type CreateFilesFromConfigOptions = {
  files: Record<string | "package.json", string>;
  outputDir: string;
};

export const createFilesFromConfig = async ({
  files,
  outputDir,
}: CreateFilesFromConfigOptions) => {
  await Promise.all(
    Object.entries(files).map(async ([filename, content]) => {
      const output = path.join(outputDir, filename);

      await writeFileRecursive({
        fileContent: content,
        filePath: output,
      });
    })
  );
};

export const gitIgnoreFile = {
  ".gitignore": `
node_modules

dist
out
.next
  `.trim(),
}