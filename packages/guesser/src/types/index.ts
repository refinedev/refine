import { IResourceItem } from "@pankod/refine-core";
import React from "react";

export type GuessType =
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

export type GuessField = {
    key: string;
    type: GuessType;
    relation?: boolean;
    multiple?: boolean;
    fieldable?: boolean;
    /**
     * Accessor to get the value from the record, if its an array it means multiple values should be concatenated
     */
    accessor?: string | string[];
    resource?: IResourceItem;
    priority?: number;
    relationGuess?: GuessField | null | false;
};

export type FieldGuesser = (
    key: string,
    value: unknown,
    record: Record<string, unknown>,
    guess: FieldGuesser,
) => GuessField | null | false;

export type FieldTransformer = (
    fields: Array<GuessField>,
    resources: IResourceItem[],
    resource: IResourceItem,
    record: Record<string, unknown>,
    guess: FieldGuesser,
) => Array<GuessField>;

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
    type: "list" | "show" | "edit";
    resourceName?: string;
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
    fields: Array<GuessField | null>;
    guess: FieldGuesser;
};

export type CreateGuesserConfig = {
    /**
     * Guesser Component Type
     */
    type: "list" | "show" | "edit";
    /**
     * Additional packages to be included in the scope, by default RefineCore and React is included
     */
    additionalScope?: Array<AdditionalScopeType>;
    /**
     * Custom Elements to be guessed
     */
    customElements?: Array<FieldGuesser>;
    /**
     * Transformers for the guessed fields
     */
    fieldTransformers?: Array<FieldTransformer>;
    /**
     *  Custom Code Viewer Component
     */
    codeViewerComponent?: React.FC<CodeViewerProps>;
    /**
     * Loading component to be shown while guessing
     */
    loadingComponent?: React.FC;
    /**
     * Error component to be shown if guessing fails or throws an error
     */
    errorComponent?: React.FC<{ error?: string }>;
    /**
     * String renderer, guessed fields and the resource will be passed to this function and the code for the component will be generated.
     */
    renderer: (context: RendererContext) => string;
};

export type GuesserComponentProps = {
    /**
     * The resource name to guess from
     */
    name: string;
    /**
     * Data accessor string to get the data from the record
     * @example your data provider returns { data: { item: { id: 1, name: "John" } } } from `getOne` then you should pass "item" as the `single` property.
     * @example your data provider returns { data: { items: [{ id: 1, name: "John" }] } } from `getMany` then you should pass "items" as the `many` property.
     * @example your data provider returns { data: { items: [{ id: 1, name: "John" }], total: 1 } } from `getList` then you should pass "items" as the `many` property.
     */
    // dataAccessors?: Partial<Record<"single" | "list" | "many", string>>;
};

export type GuesserResultComponent = React.FC<GuesserComponentProps>;

export type CreateGuesser = (
    config: CreateGuesserConfig,
) => GuesserResultComponent;
