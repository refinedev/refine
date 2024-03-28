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

export const clearMantineSelect = (field: string) => {
  cy.get(field).each(($elm) => {
    cy.wrap($elm)
      .invoke("val")
      .then((text) => {
        if (text) {
          cy.get(field).click();
          cy.get(".mantine-Popover-dropdown:visible .mantine-Select-option")
            .contains(text as string)
            .click();
        }
      });
  });
};

export const fillMantineStatus = (status = "Published") => {
  // Select option if it's not selected
  cy.get("#status").each(($elm) => {
    cy.wrap($elm)
      .invoke("val")
      .then((text) => {
        if (status) {
          if (text === status) {
          } else {
            cy.get("#status").click();
            cy.get(".mantine-Popover-dropdown:visible .mantine-Select-option")
              .contains(status)
              .click();
          }
        } else {
          cy.get("#status").click();
          cy.get(".mantine-Popover-dropdown:visible .mantine-Select-option")
            .first()
            .click();
        }
      });
  });
};

export const fillMantineForm = () => {
  cy.fixture("mock-post").then((mockPost) => {
    cy.get("#title").clear().type(mockPost.title);
    cy.get("#content textarea").clear({ force: true }).type(mockPost.content, {
      delay: 32,
    });
    cy.fillMantineStatus();
    cy.get("#categoryId").click().type("{downArrow}{enter}", { force: true });
  });
};
