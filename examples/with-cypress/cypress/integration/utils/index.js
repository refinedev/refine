export const exactMatchRegexp = (word) => new RegExp(`(?:^|\W)${word}(?:$|\W)`);

export const getTitleOfFormItem = (selector) =>
    cy
        .get(selector)
        .parents(".ant-row.ant-form-item")
        .find(".ant-form-item-label");

export const getItemFromSelectDropdown = (selector) =>
    cy.get(selector).parents(".ant-select-dropdown").find(".ant-select-item");
