export { createInferencer } from "./create-inferencer/index.tsx";

export { SharedCodeViewer } from "./components/shared-code-viewer/index.tsx";

export {
  jsx,
  accessor,
  componentName,
  dataProviderFromResource,
  shouldDotAccess,
  getAccessorKey,
  dotAccessor,
  getFieldableKeys,
  getOptionLabel,
  getVariableName,
  isIDKey,
  noOp,
  prettyString,
  toPlural,
  toSingular,
  printImports,
  removeRelationSuffix,
  idQuoteWrapper,
} from "./utilities/index.ts";

export type {
  AdditionalScopeType,
  CodeViewerProps,
  CreateInferencer,
  CreateInferencerConfig,
  FieldInferencer,
  FieldTransformer,
  ImportElement,
  InferField,
  InferType,
  InferencerComponentProps,
  InferencerResultComponent,
  RecordField,
  RendererContext,
} from "./types/index.ts";
