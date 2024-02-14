import {
    ASTPath,
    Collection,
    JSCodeshift,
    JSXAttribute,
    JSXElement,
    JSXExpressionContainer,
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

export const addAttributeIfNotExist = (
    j: JSCodeshift,
    source: Collection,
    element: ASTPath<JSXElement>,
    attributeIdentifier: string,
    attributeValue?: JSXElement | JSXExpressionContainer,
) => {
    const existingAttribute = source.find(j.JSXAttribute, {
        name: {
            name: attributeIdentifier,
        },
    });

    if (existingAttribute.length) {
        return;
    }

    const attribute = j.jsxAttribute(
        j.jsxIdentifier(attributeIdentifier),
        attributeValue ? attributeValue : undefined,
    );

    element.node.openingElement.attributes?.push(attribute);
};
