import { JSCodeshift, Collection } from "jscodeshift";

const DEPRECATED_NAME = "resourceNameOrRouteName";
const NEW_NAME = "resource";

export const renameResourcePropInButtons = (
    j: JSCodeshift,
    source: Collection,
) => {
    source.find(j.JSXOpeningElement).forEach((path) => {
        const attributes = path.node.attributes;
        if (!attributes) return;

        source.find(j.JSXOpeningElement).forEach((el) => {
            if (
                `${
                    "name" in el.node?.name ? el.node?.name?.name : ""
                }`.includes("Button")
            ) {
                const attributes = el.node?.attributes;
                if (!attributes) return;

                el.node?.attributes.forEach((attr) => {
                    if (attr.type === "JSXAttribute") {
                        if (attr?.name?.name === DEPRECATED_NAME) {
                            attr.name.name = NEW_NAME;
                        }
                    }
                });
            }
        });
    });
};
