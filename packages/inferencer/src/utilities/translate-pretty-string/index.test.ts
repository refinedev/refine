import type { IResourceItem } from "@refinedev/core";
import { translatePrettyString } from ".";
import type { InferField } from "@/types";

describe("translatePrettyString", () => {
  const resource: IResourceItem = {
    name: "posts",
  };
  const field: InferField = {
    key: "title",
    type: "text",
  };
  describe("special characters", () => {
    const unusualField: InferField = {
      key: 'a "label" <tag> & {value}',
      type: "text",
    };

    it("encodes JSX text and attributes without changing their meaning", () => {
      const expected =
        "A &quot;label&quot; &lt;tag&gt; &amp; &#123;value&#125;";
      expect(
        translatePrettyString({
          resource,
          field: unusualField,
          noQuotes: true,
        }),
      ).toBe(expected);
      expect(translatePrettyString({ resource, field: unusualField })).toBe(
        `"${expected}"`,
      );
    });

    it("serializes plain JavaScript labels separately from JSX", () => {
      const result = translatePrettyString({
        resource,
        field: unusualField,
        noBraces: true,
      });
      expect(JSON.parse(result)).toBe('A "label" <tag> & {value}');
    });

    it("serializes translation keys as string arguments", () => {
      const result = translatePrettyString({
        resource,
        field: unusualField,
        i18n: true,
        noBraces: true,
      });
      expect(result.startsWith("translate(")).toBe(true);
      expect(JSON.parse(result.slice("translate(".length, -1))).toBe(
        `posts.fields.${unusualField.key}`,
      );
    });
  });

  describe("with i18n", () => {
    it("should return without braces", () => {
      expect(
        translatePrettyString({
          resource,
          field,
          i18n: true,
          noBraces: true,
        }),
      ).toBe('translate("posts.fields.title")');
    });

    it("should return with braces", () => {
      expect(
        translatePrettyString({
          resource,
          field,
          i18n: true,
        }),
      ).toBe('{translate("posts.fields.title")}');
    });
  });
  describe("without i18n", () => {
    it("should return without quotes", () => {
      expect(
        translatePrettyString({
          resource,
          field,
          i18n: false,
          noQuotes: true,
        }),
      ).toBe("Title");
    });

    it("should return with quotes", () => {
      expect(
        translatePrettyString({
          resource,
          field,
          i18n: false,
        }),
      ).toBe('"Title"');
    });
  });
});
