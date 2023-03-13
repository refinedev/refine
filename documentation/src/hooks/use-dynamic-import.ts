import { useEffect, useState } from "react";
import { ComponentDoc, PropItem } from "react-docgen-typescript";

export interface StringIndexedObject<T> {
    [key: string]: T;
}

export type DeclarationType = Omit<ComponentDoc, "methods"> &
    Partial<Pick<ComponentDoc, "methods">> & {
        props?: StringIndexedObject<
            Omit<PropItem, "tags"> & {
                tags?: {
                    description?: string | null;
                    deprecated?: string | null;
                    default?: string | null;
                };
            }
        >;
    };

export const useDynamicImport = (
    name: string,
    prefix = "@refinedev/",
): DeclarationType | null => {
    const [props, setProps] = useState<DeclarationType>(null);

    useEffect(() => {
        let resolved = false;

        import(
            `@docgen/${
                name.startsWith(prefix) ? name : `${prefix}${name}`
            }.json`
        )
            .then((props) => {
                if (!resolved) {
                    resolved = true;
                    setProps(props.default);
                }
            })
            .catch(console.warn);

        return () => {
            resolved = true;
        };
    }, [name]);

    return props;
};
