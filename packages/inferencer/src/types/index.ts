import { IResourceItem } from "@pankod/refine-core";
import React from "react";

export type InferType =
    | "relation"
    | "array"
    | "object"
    | "date"
    | "email"
    | "image"
    | "url"
    | "richtext"
    | "text"
    | "number"
    | "boolean"
    | "unknown"
    | `custom_${string}`
    | null;

export type InferField = {
    key: string;
    type: InferType;
    relation?: boolean;
    multiple?: boolean;
    fieldable?: boolean;
    /**
     * Accessor to get the value from the record, if its an array it means multiple values should be concatenated
     */
    accessor?: string | string[];
    resource?: IResourceItem;
    priority?: number;
    relationInfer?: InferField | null | false;
};

export type FieldInferencer = (
    key: string,
    value: unknown,
    record: Record<string, unknown>,
    infer: FieldInferencer,
) => InferField | null | false;

export type FieldTransformer = (
    fields: Array<InferField>,
    resources: IResourceItem[],
    resource: IResourceItem,
    record: Record<string, unknown>,
    infer: FieldInferencer,
) => Array<InferField>;

export type RecordField = {
    key: string;
    value: unknown;
};

export type ImportElement = [
    element: string,
    module: string,
    isDefaultImport?: boolean,
];

export type CodeViewerProps = {
    code?: string;
    loading?: boolean;
};

export type AdditionalScopeType = [
    packageName: string,
    variableName: string,
    module: unknown,
    ignoreReplacement?: boolean,
];

export type LiveComponentProps = {
    fetchError?: boolean;
    code?: string;
    additionalScope?: Array<AdditionalScopeType>;
    errorComponent?: React.FC<{ error?: string }>;
};

export type RendererContext = {
    resource: IResourceItem;
    resources: IResourceItem[];
    fields: Array<InferField | null>;
    infer: FieldInferencer;
};

export type CreateInferencerConfig = {
    /**
     * Inferencer Component Type
     */
    type: "list" | "show" | "edit";
    /**
     * Additional packages to be included in the scope, by default RefineCore and React is included
     */
    additionalScope?: Array<AdditionalScopeType>;
    /**
     * Custom Elements to be inferred
     */
    customElements?: Array<FieldInferencer>;
    /**
     * Transformers for the inferred fields
     */
    fieldTransformers?: Array<FieldTransformer>;
    /**
     *  Custom Code Viewer Component
     */
    codeViewerComponent: React.FC<CodeViewerProps>;
    /**
     * Loading component to be shown while infering
     */
    loadingComponent: React.FC;
    /**
     * Error component to be shown if infering fails or throws an error
     */
    errorComponent: React.FC<{ error?: string }>;
    /**
     * String renderer, inferred fields and the resource will be passed to this function and the code for the component will be generated.
     */
    renderer: (context: RendererContext) => string;
};

export type InferencerComponentProps = {
    /**
     * The resource name to infer from, use this or `resource` prop
     */
    name?: string;
    /**
     * The resource name to infer from, use this or `name` prop
     */
    resource?: string;
    /**
     * Data accessor string to get the data from the record
     * @example your data provider returns { data: { item: { id: 1, name: "John" } } } from `getOne` then you should pass "item" as the `single` property.
     * @example your data provider returns { data: { items: [{ id: 1, name: "John" }] } } from `getMany` then you should pass "items" as the `many` property.
     * @example your data provider returns { data: { items: [{ id: 1, name: "John" }], total: 1 } } from `getList` then you should pass "items" as the `many` property.
     */
    // dataAccessors?: Partial<Record<"single" | "list" | "many", string>>;
};

export type InferencerResultComponent = React.FC<InferencerComponentProps>;

export type CreateInferencer = (
    config: CreateInferencerConfig,
) => InferencerResultComponent;
