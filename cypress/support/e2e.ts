/// <reference types="cypress" />
/// <reference types="./index.d.ts" />

import {
    getAntdNotification,
    setAntdSelect,
    setAntdDropdown,
    getAntdFormItemError,
    getAntdLoadingOverlay,
    getAntdPopoverDeleteButton,
    getAntdColumnSorter,
    getAntdFilterTrigger,
    getAntdPaginationItem,
    getTableRowExpandButton,
    setAntdRangeDatePickerToToday,
} from "./commands/antd";
import {
    getChakraUIPopoverDeleteButton,
    getChakraUIFormItemError,
    getChakraUILoadingOverlay,
    getChakraUINotification,
    getChakraUIToast,
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
    getPageHeaderTitle,
    getSaveButton,
    getShowButton,
} from "./commands/refine";
import { list, create, edit, show } from "./commands/resource";
import { documentTitle } from "./commands/document-title-handler";

// add commands to the Cypress chain
import "./commands/intercepts";
import {
    getMaterialUIColumnHeader,
    getMaterialUIDeletePopoverButton,
    getMaterialUIFormItemError,
    getMaterialUILoadingCircular,
    getMaterialUINotifications,
} from "./commands/material-ui";

Cypress.Keyboard.defaults({
    keystrokeDelay: 0,
});

Cypress.Commands.add("documentTitle", documentTitle);

Cypress.Commands.add("resourceList", list);
Cypress.Commands.add("resourceCreate", create);
Cypress.Commands.add("resourceEdit", edit);
Cypress.Commands.add("resourceShow", show);

Cypress.Commands.add("getSaveButton", getSaveButton);
Cypress.Commands.add("getCreateButton", getCreateButton);
Cypress.Commands.add("getDeleteButton", getDeleteButton);
Cypress.Commands.add("getEditButton", getEditButton);
Cypress.Commands.add("getShowButton", getShowButton);
Cypress.Commands.add("getPageHeaderTitle", getPageHeaderTitle);

Cypress.Commands.add("getAntdNotification", getAntdNotification);
Cypress.Commands.add("setAntdSelect", setAntdSelect);
Cypress.Commands.add("setAntdDropdown", setAntdDropdown);
Cypress.Commands.add("getAntdFormItemError", getAntdFormItemError);
Cypress.Commands.add("getAntdLoadingOverlay", getAntdLoadingOverlay);
Cypress.Commands.add("getAntdPopoverDeleteButton", getAntdPopoverDeleteButton);
Cypress.Commands.add("getAntdColumnSorter", getAntdColumnSorter);
Cypress.Commands.add("getAntdFilterTrigger", getAntdFilterTrigger);
Cypress.Commands.add("getAntdPaginationItem", getAntdPaginationItem);
Cypress.Commands.add("getTableRowExpandButton", getTableRowExpandButton);
Cypress.Commands.add(
    "setAntdRangeDatePickerToToday",
    setAntdRangeDatePickerToToday,
);

Cypress.Commands.add("getChakraUINotification", getChakraUINotification);
Cypress.Commands.add("getChakraUIToast", getChakraUIToast);
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
Cypress.Commands.add(
    "getMaterialUILoadingCircular",
    getMaterialUILoadingCircular,
);
Cypress.Commands.add("getMaterialUIColumnHeader", getMaterialUIColumnHeader);

Cypress.Commands.add("getMantineNotification", getMantineNotification);
Cypress.Commands.add(
    "getMantinePopoverDeleteButton",
    getMantinePopoverDeleteButton,
);
Cypress.Commands.add("getMantineFormItemError", getMantineFormItemError);
Cypress.Commands.add("getMantineLoadingOverlay", getMantineLoadingOverlay);

/**
 * Disable telemetry calls
 */
beforeEach(() => {
    cy.intercept("https://telemetry.refine.dev/**", {
        body: "Disabled telemetry to avoid unwanted entries in the database",
        statusCode: 200,
    }).as("telemetry");
});
