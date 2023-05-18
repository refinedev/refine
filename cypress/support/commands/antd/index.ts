/// <reference types="cypress" />
/// <reference types="../../index.d.ts" />

export const getAntdNotification = () => {
    return cy.get(".ant-notification-notice");
};

export const setAntdDropdown = ({
    id,
    selectIndex,
}: ISetAntdDropdownParams) => {
    return cy
        .get(`#${id}`)
        .click({ force: true })
        .get(".ant-select-item-option")
        .eq(selectIndex || 0)
        .click({ force: true })
        .get(`#${id}`)
        .blur();
};

export const setAntdSelect = ({ id, value }: ISetAntdSelectParams) => {
    return cy
        .get(`#${id}`)
        .click({ force: true })
        .get(`.ant-select-item[title="${value}"]`)
        .click({ force: true })
        .get(`#${id}`)
        .blur();
};

export const getAntdFormItemError = ({ id }: IGetAntdFormItemErrorParams) => {
    return cy.get(`#${id}_help > .ant-form-item-explain-error`);
};

export const getAntdLoadingOverlay = () => {
    return cy.get(`.ant-spin`);
};

export const getAntdPopoverDeleteButton = () => {
    return cy.get(".ant-popconfirm-buttons button").contains(/delete/gi);
};
