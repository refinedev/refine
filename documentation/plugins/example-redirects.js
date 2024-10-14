"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs;
  } else {
    return rhsFn();
  }
}
function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return undefined;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
var _fsextra = require("fs-extra");
var _fsextra2 = _interopRequireDefault(_fsextra);

function pluginExampleRedirectsPages() {
  return {
    name: "refine-plugin-handle-example-redirects",
    async postBuild() {
      const redirects = collectRedirects();

      const redirectFiles = generateRedirectFiles(redirects);

      // Write files only at the end: make code more easy to test without IO
      await Promise.all(redirectFiles.map((file) => writeRedirectFile(file)));
    },
  };
}
exports.default = pluginExampleRedirectsPages;

async function writeRedirectFile(file) {
  try {
    // User-friendly security to prevent file overrides
    if (await _fsextra2.default.pathExists(file.fileAbsolutePath)) {
      throw new Error(
        "The redirect plugin is not supposed to override existing files.",
      );
    }
    await _fsextra2.default.outputFile(
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

const htmlTemplate = (to) => `
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
  const redirects = _fsextra2.default.readJSONSync("./example-redirects.json");

  return _nullishCoalesce(
    _optionalChain([redirects, "optionalAccess", (_) => _.redirects]),
    () => [],
  );
};

const generateRedirectFiles = (redirects) => {
  return redirects.map((redirect) => {
    const path = `${redirect.from}/index.html`;

    return {
      fileAbsolutePath: `./build/${path}`,
      fileContent: htmlTemplate(redirect.to),
    };
  });
};
