import fs from "fs-extra";
import type { Plugin } from "@docusaurus/types";

export default function pluginExampleRedirectsPages(): Plugin<void> {
  return {
    name: "refine-plugin-handle-example-redirects",
    async postBuild() {
      const redirects: RedirectItem[] = collectRedirects();

      const redirectFiles = generateRedirectFiles(redirects);

      // Write files only at the end: make code more easy to test without IO
      await Promise.all(redirectFiles.map((file) => writeRedirectFile(file)));
    },
  };
}

async function writeRedirectFile(file: RedirectFile): Promise<void> {
  try {
    // User-friendly security to prevent file overrides
    if (await fs.pathExists(file.fileAbsolutePath)) {
      throw new Error(
        "The redirect plugin is not supposed to override existing files.",
      );
    }
    await fs.outputFile(
      file.fileAbsolutePath,
      file.fileContent,
      // Hard security to prevent file overrides
      // See https://stackoverflow.com/a/34187712/82609
      { flag: "wx" },
    );
  } catch (err) {
    // logger.error`Redirect file creation error for path=${file.fileAbsolutePath}.`;
    throw err;
  }
}

const htmlTemplate = (to: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <script>
    window.location.href = '${to}';
  </script>
</html>
`;

const collectRedirects = () => {
  const redirects = fs.readJSONSync("./example-redirects.json");

  return redirects?.redirects ?? [];
};

const generateRedirectFiles = (redirects: RedirectItem[]) => {
  return redirects.map((redirect) => {
    const path = `${redirect.from}/index.html`;

    return {
      fileAbsolutePath: `./build/${path}`,
      fileContent: htmlTemplate(redirect.to),
    };
  });
};

type RedirectFile = {
  fileAbsolutePath: string;
  fileContent: string;
};

type RedirectItem = {
  from: string;
  to: string;
};
