import fs from "fs/promises";
import path from "path";

type WriteFileRecursiveOptions = {
    filePath: string;
    fileContent: string;
    encoding?: BufferEncoding;
  };
  
  export const writeFileRecursive = async ({
    fileContent,
    filePath,
    encoding = "utf-8",
  }: WriteFileRecursiveOptions): Promise<void> => {
    const dirname = path.dirname(filePath);
    await fs.mkdir(dirname, { recursive: true });
    return await fs.writeFile(filePath, fileContent, encoding);
  };
  