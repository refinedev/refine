/// <reference types="cypress" />
/// <reference types="./index.d.ts" />

import {
    getAntdNotification,
    setAntdSelect,
    setAntdDropdown,
    getAntdFormItemError,
    getAntdLoadingOverlay,
    getAntdPopoverDeleteButton,
} from "./commands/antd";
import {
    getChakraUIDeletePopoverButton,
    getChakraUIFormItemError,
    getChakraUILoadingOverlay,
    getChakraUINotification,
} from "./commands/chakra-ui";
import {
    getCreateButton,
    getDeleteButton,
    getEditButton,
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
Cypress.Commands.add("getEditButton", getEditButton);

Cypress.Commands.add("getAntdNotification", getAntdNotification);
Cypress.Commands.add("setAntdSelect", setAntdSelect);
Cypress.Commands.add("setAntdDropdown", setAntdDropdown);
Cypress.Commands.add("getAntdFormItemError", getAntdFormItemError);
Cypress.Commands.add("getAntdLoadingOverlay", getAntdLoadingOverlay);
Cypress.Commands.add("getAntdPopoverDeleteButton", getAntdPopoverDeleteButton);

Cypress.Commands.add("getChakraUINotification", getChakraUINotification);
Cypress.Commands.add("getChakraUIFormItemError", getChakraUIFormItemError);
Cypress.Commands.add(
    "getChakraUIDeletePopoverButton",
    getChakraUIDeletePopoverButton,
);
Cypress.Commands.add("getChakraUILoadingOverlay", getChakraUILoadingOverlay);
