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
    getChakraUIPopoverDeleteButton,
    getChakraUIFormItemError,
    getChakraUILoadingOverlay,
    getChakraUINotification,
} from "./commands/chakra-ui";
import {
    getMantineFormItemError,
    getMantineLoadingOverlay,
    getMantineNotification,
    getMantinePopoverDeleteButton,
} from "./commands/mantine";
import {
    getCreateButton,
    getDeleteButton,
    getEditButton,
    getSaveButton,
} from "./commands/refine";
import { list, create, edit, show } from "./commands/resource";

// add commands to the Cypress chain
import "./commands/intercepts";
import {
    getMaterialUIDeletePopoverButton,
    getMaterialUIFormItemError,
    getMaterialUINotifications,
} from "./commands/material-ui";

Cypress.Keyboard.defaults({
    keystrokeDelay: 0,
});

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
    "getChakraUIPopoverDeleteButton",
    getChakraUIPopoverDeleteButton,
);
Cypress.Commands.add("getChakraUILoadingOverlay", getChakraUILoadingOverlay);

Cypress.Commands.add("getMaterialUINotification", getMaterialUINotifications);
Cypress.Commands.add(
    "getMaterialUIDeletePopoverButton",
    getMaterialUIDeletePopoverButton,
);
Cypress.Commands.add("getMaterialUIFormItemError", getMaterialUIFormItemError);

Cypress.Commands.add("getMantineNotification", getMantineNotification);
Cypress.Commands.add(
    "getMantinePopoverDeleteButton",
    getMantinePopoverDeleteButton,
);
Cypress.Commands.add("getMantineFormItemError", getMantineFormItemError);
Cypress.Commands.add("getMantineLoadingOverlay", getMantineLoadingOverlay);
