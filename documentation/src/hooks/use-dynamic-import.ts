import { useEffect, useState } from "react";
import { ComponentDoc } from "react-docgen-typescript";

type DeclarationType = Omit<ComponentDoc, "methods"> &
    Partial<Pick<ComponentDoc, "methods">>;

export const useDynamicImport = (
    name: string,
    prefix = "@pankod/",
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
            .catch(console.error);

        return () => {
            resolved = true;
        };
    }, [name]);

    return props;
};
