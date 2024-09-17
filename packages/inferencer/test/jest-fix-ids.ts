// @see https://github.com/thymikee/jest-preset-angular/issues/336#issuecomment-1536232102
// @see https://github.com/orgs/mantinedev/discussions/467
const attributesToClean: { [key: string]: RegExp[] } = {
  id: [/^mantine-.*$/],
  for: [/^mantine-.*$/],
  "aria-describedby": [/^mantine-.*$/],
  "aria-labelledby": [/^mantine-.*$/],
  "aria-controls": [/^mantine-.*$/],
};
const attributesToCleanKeys = Object.keys(attributesToClean);
const hasAttributesToClean = (attribute: Attr) =>
  attributesToCleanKeys.some((name) => attribute.name === name);

let lastCleanedNode: Element | null = null;

module.exports = {
  print: (val: Element, serialize: (v: Element) => string) => {
    const clone = val.cloneNode(true) as Element;

    for (const attr of Object.values(clone.attributes).filter(
      hasAttributesToClean,
    )) {
      attr.value = attr.value
        .split(" ")
        .filter((attrValue: string) => {
          return !attributesToClean[attr.name].some((regex) =>
            regex.test(attrValue),
          );
        })
        .join(" ");
    }

    lastCleanedNode = clone;
    return serialize(clone);
  },
  test: (val: Element) =>
    val !== lastCleanedNode &&
    val.attributes !== undefined &&
    Object.values(val.attributes).some(hasAttributesToClean),
};
