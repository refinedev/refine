export const getMantineNotification = () => {
    return cy.get(".mantine-Notification-description");
};

export const getMantinePopoverDeleteButton = () => {
    return cy.get(".mantine-Popover-dropdown").contains(/delete/gi);
};

export const getMantineFormItemError = ({
    id,
}: IGetChakraUIFormItemErrorParams) => {
    return cy.get(`#${id}-error`);
};

export const getMantineLoadingOverlay = () => {
    return cy.get(".mantine-LoadingOverlay-root");
};
