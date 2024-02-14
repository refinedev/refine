import {
    ASTPath,
    JSCodeshift,
    JSXAttribute,
    JSXElement,
    JSXExpressionContainer,
    JSXFragment,
    JSXSpreadChild,
} from "jscodeshift";

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

export const wrapChildren = (
    j: JSCodeshift,
    element: ASTPath<JSXElement>,

    wrapper: string,
    wrapperAttributes: JSXAttribute[] = [],
) => {
    const wrapperElement = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier(wrapper), wrapperAttributes),
        j.jsxClosingElement(j.jsxIdentifier(wrapper)),
        element.value.children,
    );

    j(element).replaceWith(
        j.jsxElement(element.node.openingElement, element.node.closingElement, [
            wrapperElement,
        ]),
    );

    return element;
};
