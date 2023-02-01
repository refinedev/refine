export { createInferencer } from "./create-inferencer";

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
} from "./utilities";

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
} from "./types";
