/// <reference types="cypress" />

interface ISetAntdDropdownParams {
    id: string;
    selectIndex?: number;
}

interface ISetAntdSelectParams {
    id: string;
    value: string;
}

interface IGetAntdFormItemErrorParams {
    id: string;
}

declare namespace Cypress {
    interface Chainable {
        resourceList(): Chainable<void>;
        resourceCreate(): Chainable<void>;
        resourceEdit(): Chainable<void>;
        resourceShow(): Chainable<void>;
        getSaveButton(): Chainable<JQuery<HTMLElement>>;
        getCreateButton(): Chainable<JQuery<HTMLElement>>;
        getDeleteButton(): Chainable<JQuery<HTMLElement>>;
        getAntdNotification(): Chainable<JQuery<HTMLElement>>;
        setAntdDropdown(
            params: ISetAntdDropdownParams,
        ): Chainable<JQuery<HTMLElement>>;
        setAntdSelect(
            params: ISetAntdSelectParams,
        ): Chainable<JQuery<HTMLElement>>;
        getAntdFormItemError(
            params: IGetAntdFormItemErrorParams,
        ): Chainable<JQuery<HTMLElement>>;
    }
}
