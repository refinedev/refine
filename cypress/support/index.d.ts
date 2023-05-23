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

interface IGetChakraUIFormItemErrorParams {
    id: string;
    type?: "text" | "select";
}

interface IGetMaterialUIFormItemErrorParams {
    id: string;
}

interface IGetMantineFormItemErrorParams {
    id: string;
}

interface IResourceCreateParams {
    ui: "antd" | "material-ui" | "chakra-ui" | "mantine";
}

interface IResourceEditParams {
    ui: "antd" | "material-ui" | "chakra-ui" | "mantine";
}

declare namespace Cypress {
    interface Chainable {
        resourceList(): Chainable<void>;
        resourceCreate(
            params: IResourceCreateParams,
        ): Chainable<JQuery<HTMLElement>>;
        resourceEdit(
            params: IResourceCreateParams,
        ): Chainable<JQuery<HTMLElement>>;
        resourceShow(): Chainable<void>;

        getSaveButton(): Chainable<JQuery<HTMLElement>>;
        getCreateButton(): Chainable<JQuery<HTMLElement>>;
        getDeleteButton(): Chainable<JQuery<HTMLElement>>;
        getEditButton(): Chainable<JQuery<HTMLElement>>;
        getPageHeaderTitle(): Chainable<JQuery<HTMLElement>>;

        getAntdNotification(): Chainable<JQuery<HTMLElement>>;
        getAntdLoadingOverlay(): Chainable<JQuery<HTMLElement>>;
        getAntdPopoverDeleteButton(): Chainable<JQuery<HTMLElement>>;
        setAntdDropdown(
            params: ISetAntdDropdownParams,
        ): Chainable<JQuery<HTMLElement>>;
        setAntdSelect(
            params: ISetAntdSelectParams,
        ): Chainable<JQuery<HTMLElement>>;
        getAntdFormItemError(
            params: IGetAntdFormItemErrorParams,
        ): Chainable<JQuery<HTMLElement>>;

        getChakraUINotification(): Chainable<JQuery<HTMLElement>>;
        getChakraUIFormItemError(
            params: IGetChakraUIFormItemErrorParams,
        ): Chainable<JQuery<HTMLElement>>;
        getChakraUIDeletePopoverButton(): Chainable<JQuery<HTMLElement>>;
        getChakraUILoadingOverlay(): Chainable<JQuery<HTMLElement>>;
        getChakraUIPopoverDeleteButton(): Chainable<JQuery<HTMLElement>>;

        getMantineNotification(): Chainable<JQuery<HTMLElement>>;
        getMantinePopoverDeleteButton(): Chainable<JQuery<HTMLElement>>;
        getMantineFormItemError(
            params: IGetMantineFormItemErrorParams,
        ): Chainable<JQuery<HTMLElement>>;
        getMantineLoadingOverlay(): Chainable<JQuery<HTMLElement>>;

        getMaterialUINotification(): Chainable<JQuery<HTMLElement>>;
        getMaterialUIDeletePopoverButton(): Chainable<JQuery<HTMLElement>>;
        getMaterialUIFormItemError(
            params: IGetChakraUIFormItemErrorParams,
        ): Chainable<JQuery<HTMLElement>>;

        interceptGETPost(): Chainable<null>;
        interceptGETPosts(): Chainable<null>;
        interceptPOSTPost(): Chainable<null>;
        interceptPATCHPost(): Chainable<null>;
        interceptDELETEPost(): Chainable<null>;
        interceptGETCategories(): Chainable<null>;
    }
}
