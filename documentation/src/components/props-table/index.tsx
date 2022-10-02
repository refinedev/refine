import React from "react";
import ReactMarkdown from "react-markdown";
import {
    DeclarationType,
    useDynamicImport,
} from "../../hooks/use-dynamic-import";
import PropTag from "../prop-tag";

type Overrides = `${string}-${
    | "hidden"
    | "deprecated"
    | "required"
    | "name"
    | "description"
    | "default"
    | "type"}`;

type OverridesMap = { [key: Overrides]: string };

type RowItem = DeclarationType["props"][string];

type Props = {
    module: string;
    hideDefaults?: boolean;
} & OverridesMap;

const Name = ({
    prop,
    overrides,
}: {
    prop: RowItem;
    overrides: OverridesMap;
}) => {
    const required = overrides[`${prop.name}-required`] || prop.required;
    const deprecated =
        overrides[`${prop.name}-deprecated`] || prop.tags?.deprecated;
    const deprecation =
        overrides[`${prop.name}-deprecated`] || prop.tags?.deprecated || "";

    return (
        <>
            <span className="props-table--name">
                {overrides[`${prop.name}-name`] ?? prop.name}
            </span>
            {required && <PropTag required />}
            {deprecated && <PropTag deprecated alt={deprecation} />}
        </>
    );
};

const Type = ({
    prop,
    overrides,
}: {
    prop: RowItem;
    overrides: OverridesMap;
}) => {
    const typeDef = overrides[`${prop.name}-type`] ?? prop.type.name;
    const splitted = typeDef.split(" | ");
    const isUnion = splitted.length > 1;
    const hasLongTypeInUnion = splitted.some((t) => t.length > 20);

    return (
        <>
            {hasLongTypeInUnion && isUnion ? (
                <>
                    {splitted.map((t, i) => (
                        <code className="h-min max-w-xs" key={i}>
                            <ReactMarkdown>{t}</ReactMarkdown>
                        </code>
                    ))}
                </>
            ) : (
                <code className="max-w-xs h-min">
                    <ReactMarkdown>{typeDef}</ReactMarkdown>
                </code>
            )}
        </>
    );
};

const Description = ({
    prop,
    overrides,
}: {
    prop: RowItem;
    overrides: OverridesMap;
}) => {
    return (
        <ReactMarkdown>
            {overrides[`${prop.name}-description`] ??
                prop.tags.description ??
                prop.description}
        </ReactMarkdown>
    );
};

const Default = ({
    prop,
    overrides,
}: {
    prop: RowItem;
    overrides: OverridesMap;
}) => {
    const jsDocDefault = prop.tags?.default;
    const tsDefault =
        prop.defaultValue?.value && prop.defaultValue?.value !== jsDocDefault
            ? prop.defaultValue?.value
            : undefined;
    const customDefault = overrides[`${prop.name}-default`];

    if (jsDocDefault || customDefault) {
        return <ReactMarkdown>{customDefault ?? jsDocDefault}</ReactMarkdown>;
    }

    return (
        <div className="flex flex-wrap gap-1">
            {typeof tsDefault !== "undefined" ? (
                <code className="max-w-xs h-min">
                    <ReactMarkdown>{tsDefault}</ReactMarkdown>
                </code>
            ) : null}
        </div>
    );
};

const RowName = ({
    prop,
    overrides,
}: {
    prop: RowItem;
    overrides: OverridesMap;
}) => {
    return (
        <td>
            <div className="flex items-center">
                <Name prop={prop} overrides={overrides} />
            </div>
        </td>
    );
};

const RowType = ({
    prop,
    overrides,
}: {
    prop: RowItem;
    overrides: OverridesMap;
}) => {
    return (
        <td className="props-table__type-cell">
            <div className="flex flex-wrap gap-1">
                <Type prop={prop} overrides={overrides} />
            </div>
        </td>
    );
};

const RowDescription = ({
    prop,
    overrides,
}: {
    prop: RowItem;
    overrides: OverridesMap;
}) => {
    return (
        <td className="props-table__description-cell">
            <Description prop={prop} overrides={overrides} />
        </td>
    );
};

const RowDefault = ({
    prop,
    overrides,
}: {
    prop: RowItem;
    overrides: OverridesMap;
}) => {
    return (
        <td className="props-table__default-value-cell">
            <Default prop={prop} overrides={overrides} />
        </td>
    );
};

const PropsTable: React.FC<React.PropsWithChildren<Props>> = ({
    module,
    hideDefaults,
    children,
    ...overrides
}) => {
    const data = useDynamicImport(module);
    console.log("DATA", data);

    if (!data) {
        return null;
    }

    return (
        <>
            <table className="props-table">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Type</th>
                        <th>Description</th>
                        {hideDefaults ? null : <th>Default</th>}
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data.props).map((prop) => {
                        if (overrides[`${prop.name}-hidden`]) {
                            return null;
                        }
                        return (
                            <tr key={prop.name}>
                                <RowName prop={prop} overrides={overrides} />
                                <RowType prop={prop} overrides={overrides} />
                                <RowDescription
                                    prop={prop}
                                    overrides={overrides}
                                />
                                {hideDefaults ? null : (
                                    <RowDefault
                                        prop={prop}
                                        overrides={overrides}
                                    />
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {children}
        </>
    );
};

export default PropsTable;
