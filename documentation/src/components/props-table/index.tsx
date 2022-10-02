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

const RowName = ({
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
        <td>
            <div className="flex items-center">
                <span className="props-table--name">
                    {overrides[`${prop.name}-name`] ?? prop.name}
                </span>
                {required && <PropTag required />}
                {deprecated && <PropTag deprecated alt={deprecation} />}
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
    const typeDef = overrides[`${prop.name}-type`] ?? prop.type.name;
    const splitted = typeDef.split(" | ");
    const isUnion = splitted.length > 1;
    const hasLongTypeInUnion = splitted.some((t) => t.length > 20);

    return (
        <td className="props-table__type-cell">
            <div className="flex flex-wrap gap-1">
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
            <ReactMarkdown>
                {overrides[`${prop.name}-description`] ??
                    prop.tags.description ??
                    prop.description}
            </ReactMarkdown>
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
    const jsDocDefault = prop.tags?.default;
    const tsDefault =
        prop.defaultValue?.value && prop.defaultValue?.value !== jsDocDefault
            ? prop.defaultValue?.value
            : undefined;
    const customDefault = overrides[`${prop.name}-default`];

    if (jsDocDefault || customDefault) {
        return (
            <td className="props-table__default-value-cell">
                <ReactMarkdown>{customDefault ?? jsDocDefault}</ReactMarkdown>
            </td>
        );
    }

    return (
        <td className="props-table__default-value-cell">
            <div className="flex flex-wrap gap-1">
                {typeof tsDefault !== "undefined" ? (
                    <code className="max-w-xs h-min">
                        <ReactMarkdown>{tsDefault}</ReactMarkdown>
                    </code>
                ) : null}
            </div>
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
