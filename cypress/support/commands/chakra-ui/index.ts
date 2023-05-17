export const getChakraUINotification = () => {
    return cy.get(".chakra-alert");
};

export const getChakraUIFormItemError = ({
    id,
    type = "text",
}: IGetChakraUIFormItemErrorParams) => {
    if (type === "text") {
        return cy.get(`#${id}`).siblings(".chakra-form__error-message");
    }

    if (type === "select") {
        return cy
            .get(`#${id}`)
            .parent()
            .parent()
            .find(".chakra-form__error-message");
    }

    // type === "text"
    return cy.get(`#${id}`).siblings(".chakra-form__error-message");
};

export const getChakraUIDeletePopoverButton = () => {
    return cy.get(".chakra-popover__body button").contains(/delete/gi);
};

export const getChakraUILoadingOverlay = () => {
    return cy.get(".chakra-spinner");
};
