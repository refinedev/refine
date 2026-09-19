/// <reference types="vite/client" />
import ts from "typescript";
import type { InferField, RendererContext } from "../types";

const renderers = import.meta.glob<{
  renderer: (context: RendererContext) => string;
}>("./{antd,mui,mantine,chakra-ui,headless}/{list,show,edit,create}.tsx");

const fieldNames = [
  "title",
  "author's name",
  'a "quoted" label',
  "folder\\name",
  "line\nbreak",
  "<label> & {value}",
  "tick`name",
  "日本語",
];

const fieldTypes: InferField["type"][] = ["text", "boolean", "date"];

const stringValues = (node: ts.Node): string[] => {
  const values: string[] = [];
  const visit = (child: ts.Node) => {
    if (ts.isStringLiteral(child)) values.push(child.text);
    ts.forEachChild(child, visit);
  };
  visit(node);
  return values;
};

describe("field name escaping", () => {
  it("covers every framework and action", () => {
    expect(Object.keys(renderers)).toHaveLength(20);
  });

  describe.each(Object.entries(renderers))("%s", (_path, load) => {
    let renderer: (context: RendererContext) => string;

    beforeAll(async () => {
      ({ renderer } = await load());
    }, 180000);

    it.each(fieldNames)("preserves field names as data %j", (key) => {
      for (const i18n of [false, true]) {
        for (const type of fieldTypes) {
          const code = renderer({
            resource: { name: "posts" },
            resources: [],
            fields: [{ key, type }],
            infer: () => null,
            isCustomPage: false,
            i18n,
          });
          const result = ts.transpileModule(code, {
            fileName: "generated.tsx",
            reportDiagnostics: true,
            compilerOptions: {
              jsx: ts.JsxEmit.Preserve,
              target: ts.ScriptTarget.ES2022,
            },
          });
          expect(result.diagnostics).toEqual([]);
          const source = ts.createSourceFile(
            "generated.tsx",
            code,
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TSX,
          );
          if (!/^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(key)) {
            expect(stringValues(source)).toContain(key);
          }
        }
      }
    });
  });
});
