import React from "react";
import * as RefineCore from "@pankod/refine-core";

import { LivePreview, LiveProvider, ContextProps } from "@aliemir/react-live";

import { replaceImports, replaceExports } from "@/utilities";
import { AdditionalScopeType, LiveComponentProps } from "@/types";

const defaultScope: Array<AdditionalScopeType> = [
    ["react", "React", React],
    ["@pankod/refine-core", "RefineCore", RefineCore],
];

const InferencerLiveContext = React.createContext<ContextProps>(
    {} as ContextProps,
);

/**
 * Live Component will render the code with `react-live`.
 * Errors will be handled by `ErrorComponent`.
 */
export const LiveComponent: React.FC<LiveComponentProps> = ({
    fetchError,
    code,
    additionalScope,
    errorComponent: ErrorComponent,
}) => {
    const sanitized =
        (code &&
            replaceExports(
                replaceImports(
                    code,
                    [...defaultScope, ...(additionalScope ?? [])].reduce(
                        (
                            acc,
                            [
                                packageName,
                                variableName,
                                _module,
                                ignoreReplacement,
                            ],
                        ) => {
                            if (ignoreReplacement) {
                                return acc;
                            }
                            return {
                                ...acc,
                                [packageName]: variableName,
                            };
                        },
                        {},
                    ),
                ),
            )) ??
        "";

    const scope = React.useMemo(() => {
        return {
            React,
            ...React,
            ...[...defaultScope, ...(additionalScope ?? [])].reduce(
                (acc, [_packageName, variableName, packageContent]) => {
                    return {
                        ...acc,
                        [variableName]: packageContent,
                    };
                },
                {},
            ),
        };
    }, [additionalScope]);

    const ErrorComponentWithError = React.useMemo(() => {
        const LiveErrorComponent = () => {
            const { error } = React.useContext(InferencerLiveContext);

            if (ErrorComponent) {
                return (
                    <ErrorComponent
                        error={
                            error ??
                            (fetchError
                                ? "Something went wrong while fetching the resource data."
                                : undefined)
                        }
                    />
                );
            }

            return null;
        };

        return LiveErrorComponent;
    }, [ErrorComponent, fetchError]);

    return (
        <LiveProvider
            Context={InferencerLiveContext}
            code={sanitized}
            scope={scope}
            noInline
        >
            {!fetchError && <LivePreview Context={InferencerLiveContext} />}
            <ErrorComponentWithError />
        </LiveProvider>
    );
};
