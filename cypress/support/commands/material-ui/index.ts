/// <reference types="cypress" />
/// <reference types="../../index.d.ts" />

export const getMaterialUINotifications = () => {
    return cy.get("#notistack-snackbar .MuiBox-root > h6");
};

export const getMaterialUIDeletePopoverButton = () => {
    return cy.get(".MuiDialogActions-root > button").contains(/delete/i);
};

export const getMaterialUIFormItemError = ({
    id,
}: IGetMaterialUIFormItemErrorParams) => {
    return cy.get(`#${id}-helper-text`);
};
