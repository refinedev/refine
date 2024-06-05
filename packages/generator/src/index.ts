export { generate } from "./compile/generate";
export { defineConfigurator } from "./pre-compile/define-configurator";

export {
  removeLinesStartingWith,
  replaceAllInFile,
  noOpOutputFileTransforms,
  isAllowedFile,
} from "./compile/output-file-transforms";

export {
  replaceName,
  addScripts,
  noOpPackageJsonTransformer,
  replaceVersion,
  updateDependencies,
} from "./post-compile/package-json-transformer";

export {
  gitIgnoreFile
} from "./post-compile/create-files-from-config";
