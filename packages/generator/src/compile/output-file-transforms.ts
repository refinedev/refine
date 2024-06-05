export type OutputFileTransformer = (context: {
  inputFile: string;
  outputFile: string;
  content: string;
}) => { outputFile: string; content: string };

export const noOpOutputFileTransforms: OutputFileTransformer = ({ outputFile, content }) => ({ outputFile, content });

export const removeLinesStartingWith = (starting: string): OutputFileTransformer => ({ content, outputFile }) => ({
  content: content
    .split("\n")
    .filter((line) => !line.trim().startsWith(starting))
    .join("\n"),
  outputFile,
});

export const replaceAllInFile = (search: string, replace: string): OutputFileTransformer => ({ content, outputFile }) => ({
  content: content.replace(new RegExp(search, "g"), replace),
  outputFile,
});

export const isAllowedFile = ({ outputFile }: { outputFile: string }) => {
  return /\.(js|ts|tsx|jsx|json|md|css|html)$/.test(outputFile);
}