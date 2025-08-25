import renameCurrentToCurrentPage from "./rename-current-to-currentPage";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  renameCurrentToCurrentPage(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("rename-current-to-currentPage", () => {
  it("should alias current and setCurrent from useTable when imported from @refinedev/react-table", () => {
    const source = `
      import { useTable } from "@refinedev/core";
      const { current, setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/core";
      const { currentPage: current, setCurrentPage: setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not alias if useTable is imported from another package", () => {
    const source = `
      import { useTable } from "some-other-lib";
      const { current, setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "some-other-lib";
      const { current, setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should alias only current if setCurrent is not present and imported from @refinedev/react-table", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const { current } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const { currentPage: current } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should alias only setCurrent if current is not present and imported from @refinedev/react-table", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const { setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const { setCurrentPage: setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not change unrelated destructuring", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const { pageSize, pagination } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const { pageSize, pagination } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work with useDataGrid", () => {
    const source = `
      import { useDataGrid } from "@refinedev/mui";
      const { current, setCurrent } = useDataGrid();
    `;
    const expected = `
      import { useDataGrid } from "@refinedev/mui";
      const { currentPage: current, setCurrentPage: setCurrent } = useDataGrid();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not alias useDataGrid if imported from another package", () => {
    const source = `
      import { useDataGrid } from "other-lib";
      const { current, setCurrent } = useDataGrid();
    `;
    const expected = `
      import { useDataGrid } from "other-lib";
      const { current, setCurrent } = useDataGrid();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not alias useTable if imported from another package", () => {
    const source = `
      import { useTable } from "other-lib";
      const { current, setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "other-lib";
      const { current, setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work with useSimpleList from @refinedev/antd", () => {
    const source = `
      import { useSimpleList } from "@refinedev/simple-list";
      const { current, setCurrent } = useSimpleList();
    `;
    const expected = `
      import { useSimpleList } from "@refinedev/simple-list";
      const { currentPage: current, setCurrentPage: setCurrent } = useSimpleList();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not alias useSimpleList if imported from another package", () => {
    const source = `
      import { useSimpleList } from "other-lib";
      const { current, setCurrent } = useSimpleList();
    `;
    const expected = `
      import { useSimpleList } from "other-lib";
      const { current, setCurrent } = useSimpleList();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should refactor refineCore.current to refineCore.currentPage", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const { setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const { setCurrentPage: setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });
});
