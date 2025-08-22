import { renameThemedV2Imports } from "./rename-themed-v2-imports";

import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  renameThemedV2Imports(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("rename-themed-v2-imports", () => {
  describe("ThemedLayoutV2", () => {
    it("should rename ThemedLayoutV2 to ThemedLayout as ThemedLayoutV2 - antd", () => {
      const source = `
        import { ThemedLayoutV2, ErrorComponent } from "@refinedev/antd";
      `;

      const expected = `
        import { ThemedLayout as ThemedLayoutV2, ErrorComponent } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should rename ThemedLayoutV2 to ThemedLayout as ThemedLayoutV2 - mui", () => {
      const source = `
        import { ThemedLayoutV2, ErrorComponent } from "@refinedev/mui";
      `;

      const expected = `
        import { ThemedLayout as ThemedLayoutV2, ErrorComponent } from "@refinedev/mui";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should rename ThemedLayoutV2 to ThemedLayout as ThemedLayoutV2 - mantine", () => {
      const source = `
        import { ThemedLayoutV2, ErrorComponent } from "@refinedev/mantine";
      `;

      const expected = `
        import { ThemedLayout as ThemedLayoutV2, ErrorComponent } from "@refinedev/mantine";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should rename ThemedLayoutV2 to ThemedLayout as ThemedLayoutV2 - chakra-ui", () => {
      const source = `
        import { ThemedLayoutV2, ErrorComponent } from "@refinedev/chakra-ui";
      `;

      const expected = `
        import { ThemedLayout as ThemedLayoutV2, ErrorComponent } from "@refinedev/chakra-ui";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should rename type ThemedLayoutV2 to ThemedLayout as ThemedLayoutV2", () => {
      const source = `
        import { type ThemedLayoutV2, ErrorComponent } from "@refinedev/antd";
      `;

      const expected = `
        import { type ThemedLayout as ThemedLayoutV2, ErrorComponent } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });
  });

  describe("ThemedTitleV2", () => {
    it("should rename ThemedTitleV2 to ThemedTitle as ThemedTitleV2", () => {
      const source = `
        import { ThemedTitleV2, ThemedLayoutV2 } from "@refinedev/antd";
      `;

      const expected = `
        import { ThemedTitle as ThemedTitleV2, ThemedLayout as ThemedLayoutV2 } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });
  });

  describe("ThemedSiderV2", () => {
    it("should rename ThemedSiderV2 to ThemedSider as ThemedSiderV2", () => {
      const source = `
        import { ThemedSiderV2, ThemedLayoutV2 } from "@refinedev/antd";
      `;

      const expected = `
        import { ThemedSider as ThemedSiderV2, ThemedLayout as ThemedLayoutV2 } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });
  });

  describe("ThemedHeaderV2", () => {
    it("should rename ThemedHeaderV2 to ThemedHeader as ThemedHeaderV2", () => {
      const source = `
        import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/antd";
      `;

      const expected = `
        import { ThemedHeader as ThemedHeaderV2, ThemedLayout as ThemedLayoutV2 } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });
  });

  describe("Multiple components", () => {
    it("should handle multiple V2 components in single import", () => {
      const source = `
        import { 
          ThemedLayoutV2, 
          ThemedTitleV2,
          ThemedSiderV2,
          ThemedHeaderV2,
          ErrorComponent 
        } from "@refinedev/antd";
      `;

      const expected = `
        import { 
          ThemedLayout as ThemedLayoutV2, 
          ThemedTitle as ThemedTitleV2,
          ThemedSider as ThemedSiderV2,
          ThemedHeader as ThemedHeaderV2,
          ErrorComponent 
        } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should handle mixed type and regular imports", () => {
      const source = `
        import { 
          type ThemedLayoutV2, 
          ThemedTitleV2,
          ErrorComponent 
        } from "@refinedev/mui";
      `;

      const expected = `
        import { 
          type ThemedLayout as ThemedLayoutV2, 
          ThemedTitle as ThemedTitleV2,
          ErrorComponent 
        } from "@refinedev/mui";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });
  });

  describe("Edge cases", () => {
    it("should not modify when ThemedLayout already exists", () => {
      const source = `
        import { ThemedLayout, ThemedLayoutV2, ErrorComponent } from "@refinedev/antd";
      `;

      const expected = `
        import { ThemedLayout, ThemedLayoutV2, ErrorComponent } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should not modify when ThemedTitle already exists", () => {
      const source = `
        import { ThemedTitle, ThemedTitleV2, ErrorComponent } from "@refinedev/antd";
      `;

      const expected = `
        import { ThemedTitle, ThemedTitleV2, ErrorComponent } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should not affect imports from other packages", () => {
      const source = `
        import { ThemedLayoutV2 } from "some-other-package";
        import { ErrorComponent } from "@refinedev/antd";
      `;

      const expected = `
        import { ThemedLayoutV2 } from "some-other-package";
        import { ErrorComponent } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should not modify files without V2 component imports", () => {
      const source = `
        import { ErrorComponent, useNotificationProvider } from "@refinedev/antd";
      `;

      const expected = `
        import { ErrorComponent, useNotificationProvider } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should handle imports from unsupported packages", () => {
      const source = `
        import { ThemedLayoutV2 } from "@refinedev/core";
        import { ErrorComponent } from "@refinedev/antd";
      `;

      const expected = `
        import { ThemedLayoutV2 } from "@refinedev/core";
        import { ErrorComponent } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should handle multiple import statements from different packages", () => {
      const source = `
        import { ThemedLayoutV2 } from "@refinedev/antd";
        import { ThemedTitleV2 } from "@refinedev/mui";
        import { ThemedSiderV2 } from "@refinedev/mantine";
        import { ThemedHeaderV2 } from "@refinedev/chakra-ui";
      `;

      const expected = `
        import { ThemedLayout as ThemedLayoutV2 } from "@refinedev/antd";
        import { ThemedTitle as ThemedTitleV2 } from "@refinedev/mui";
        import { ThemedSider as ThemedSiderV2 } from "@refinedev/mantine";
        import { ThemedHeader as ThemedHeaderV2 } from "@refinedev/chakra-ui";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should preserve user aliases when transforming imports", () => {
      const source = `
        import { ThemedLayoutV2 as MyLayout, ErrorComponent } from "@refinedev/antd";
      `;

      const expected = `
        import { ThemedLayout as MyLayout, ErrorComponent } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should handle multiple V2 components with different aliases", () => {
      const source = `
        import { 
          ThemedLayoutV2 as CustomLayout, 
          ThemedTitleV2 as CustomTitle,
          ErrorComponent 
        } from "@refinedev/mui";
      `;

      const expected = `
        import { 
          ThemedLayout as CustomLayout, 
          ThemedTitle as CustomTitle,
          ErrorComponent 
        } from "@refinedev/mui";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should handle mix of aliased and non-aliased V2 imports", () => {
      const source = `
        import { 
          ThemedLayoutV2 as MyLayout, 
          ThemedTitleV2,
          ErrorComponent 
        } from "@refinedev/antd";
      `;

      const expected = `
        import { 
          ThemedLayout as MyLayout, 
          ThemedTitle as ThemedTitleV2,
          ErrorComponent 
        } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });
  });
});
