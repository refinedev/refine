/// <reference types="cypress" />
/// <reference types="./index.d.ts" />

import {
    getAntdNotification,
    setAntdSelect,
    setAntdDropdown,
    getAntdFormItemError,
} from "./commands/antd";
import {
    getCreateButton,
    getDeleteButton,
    getSaveButton,
} from "./commands/refine";
import { list, create, edit, show } from "./commands/resource";

Cypress.Commands.add("resourceList", list);
Cypress.Commands.add("resourceCreate", create);
Cypress.Commands.add("resourceEdit", edit);
Cypress.Commands.add("resourceShow", show);
Cypress.Commands.add("getSaveButton", getSaveButton);
Cypress.Commands.add("getCreateButton", getCreateButton);
Cypress.Commands.add("getDeleteButton", getDeleteButton);
Cypress.Commands.add("getAntdNotification", getAntdNotification);
Cypress.Commands.add("setAntdSelect", setAntdSelect);
Cypress.Commands.add("setAntdDropdown", setAntdDropdown);
Cypress.Commands.add("getAntdFormItemError", getAntdFormItemError);
