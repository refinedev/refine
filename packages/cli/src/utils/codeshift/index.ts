import { ASTPath, JSCodeshift, JSXAttribute, JSXElement } from "jscodeshift";

export const wrapElement = (
    j: JSCodeshift,
    element: ASTPath<JSXElement>,
    wrapper: string,
    wrapperAttributes: JSXAttribute[] = [],
) => {
    const wrapperElement = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier(wrapper), wrapperAttributes),
        j.jsxClosingElement(j.jsxIdentifier(wrapper)),
        [element.value],
    );

    j(element).replaceWith(wrapperElement);

    return element;
};
