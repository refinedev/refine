import { stringLiteral } from ".";

const fieldNames = [
  "author's name",
  'a "quoted" label',
  "folder\\name",
  "line\nbreak",
  "line\rbreak",
  "tab\tname",
  "<label> & value",
  "{display}",
  "tick`name",
  "café 日本語",
  "line\u2028separator\u2029",
];

describe("stringLiteral", () => {
  it.each(fieldNames)("preserves the field name %j", (name) => {
    const literal = stringLiteral(name);
    expect(JSON.parse(literal)).toBe(name);
    expect(literal).not.toMatch(/[<>\n\r\u2028\u2029]/);
  });
});
