import { defineTest } from "jscodeshift/dist/testUtils";
import jscodeshift from "jscodeshift";
import { fixV4Deprecations } from "./fix-v4-deprecations";

// Test for fixDeprecatedUseTableProps function
describe("fixDeprecatedUseTableProps", () => {
  const transformOptions = {
    parser: "tsx",
  };

  const applyTransform = (source: string) => {
    const j = jscodeshift.withParser("tsx");
    const collection = j(source);
    fixV4Deprecations(j, collection);
    return collection.toSource();
  };

  it("should transform initialSorter to sorters.initial in refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      initialSorter: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should transform permanentSorter to sorters.permanent in refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      permanentSorter: [
        {
          field: "status",
          order: "asc",
        },
      ],
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      sorters: {
        permanent: [
          {
            field: "status",
            order: "asc",
          },
        ],
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should transform both initial and permanent sorters in refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      initialSorter: [
        {
          field: "id",
          order: "desc",
        },
      ],
      permanentSorter: [
        {
          field: "status",
          order: "asc",
        },
      ],
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
        permanent: [
          {
            field: "status",
            order: "asc",
          },
        ],
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should transform pagination props in refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      hasPagination: true,
      initialCurrent: 2,
      initialPageSize: 20,
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      pagination: {
        mode: "server",
        current: 2,
        pageSize: 20,
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should transform filter props in refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      initialFilter: [
        {
          field: "status",
          operator: "eq",
          value: "published",
        },
      ],
      permanentFilter: [
        {
          field: "category",
          operator: "eq",
          value: "tech",
        },
      ],
      defaultSetFilterBehavior: "merge",
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      filters: {
        initial: [
          {
            field: "status",
            operator: "eq",
            value: "published",
          },
        ],
        permanent: [
          {
            field: "category",
            operator: "eq",
            value: "tech",
          },
        ],
        defaultBehavior: "merge",
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should transform all deprecated props together in refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      resource: "posts",
      hasPagination: false,
      initialCurrent: 1,
      initialPageSize: 10,
      initialSorter: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
      permanentSorter: [
        {
          field: "status",
          order: "asc",
        },
      ],
      initialFilter: [
        {
          field: "published",
          operator: "eq",
          value: true,
        },
      ],
      permanentFilter: [
        {
          field: "deleted",
          operator: "eq",
          value: false,
        },
      ],
      defaultSetFilterBehavior: "replace",
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      resource: "posts",
      pagination: {
        mode: "off",
        current: 1,
        pageSize: 10,
      },
      filters: {
        initial: [
          {
            field: "published",
            operator: "eq",
            value: true,
          },
        ],
        permanent: [
          {
            field: "deleted",
            operator: "eq",
            value: false,
          },
        ],
        defaultBehavior: "replace",
      },
      sorters: {
        initial: [
          {
            field: "createdAt",
            order: "desc",
          },
        ],
        permanent: [
          {
            field: "status",
            order: "asc",
          },
        ],
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should transform top-level deprecated props (without refineCoreProps)", () => {
    const input = `
import { useTable } from "@refinedev/antd";

const MyComponent = () => {
  const { tableProps } = useTable({
    resource: "posts",
    hasPagination: true,
    initialCurrent: 3,
    initialPageSize: 25,
    initialSorter: [
      {
        field: "title",
        order: "asc",
      },
    ],
    permanentSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    initialFilter: [
      {
        field: "category",
        operator: "contains",
        value: "tech",
      },
    ],
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/antd";

const MyComponent = () => {
  const { tableProps } = useTable({
    resource: "posts",
    pagination: {
      mode: "server",
      current: 3,
      pageSize: 25,
    },
    filters: {
      initial: [
        {
          field: "category",
          operator: "contains",
          value: "tech",
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: "title",
          order: "asc",
        },
      ],
      permanent: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should work with useDataGrid hook", () => {
    const input = `
import { useDataGrid } from "@refinedev/mui";

const MyComponent = () => {
  const { dataGridProps } = useDataGrid({
    refineCoreProps: {
      initialSorter: [
        {
          field: "name",
          order: "asc",
        },
      ],
      hasPagination: true,
      initialPageSize: 50,
    },
  });
};
`;

    const expectedOutput = `
import { useDataGrid } from "@refinedev/mui";

const MyComponent = () => {
  const { dataGridProps } = useDataGrid({
    refineCoreProps: {
      pagination: {
        mode: "server",
        pageSize: 50,
      },
      sorters: {
        initial: [
          {
            field: "name",
            order: "asc",
          },
        ],
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should preserve other props in refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      resource: "posts",
      meta: {
        customField: "value",
      },
      queryOptions: {
        staleTime: 5000,
      },
      initialSorter: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      resource: "posts",
      meta: {
        customField: "value",
      },
      queryOptions: {
        staleTime: 5000,
      },
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle empty sorters/filters/pagination objects correctly", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      resource: "posts",
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      resource: "posts",
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle mixed scenarios with both top-level and refineCoreProps", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    columns: [],
    refineCoreProps: {
      initialSorter: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });
  
  const { tableProps: tableProps2 } = useTable({
    columns: [],
    initialSorter: [
      {
        field: "title",
        order: "asc",
      },
    ],
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    columns: [],
    refineCoreProps: {
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
    },
  });
  
  const { tableProps: tableProps2 } = useTable({
    columns: [],
    sorters: {
      initial: [
        {
          field: "title",
          order: "asc",
        },
      ],
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle complex nested structures with dynamic values", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      initialSorter: [
        {
          field: "nested.field",
          order: "desc",
        },
      ],
      hasPagination: dynamicValue ? true : false,
      initialFilter: filters.map(f => ({
        field: f.key,
        operator: f.op,
        value: f.val,
      })),
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      pagination: {
        mode: dynamicValue ? "server" : "off",
      },
      filters: {
        initial: filters.map(f => ({
          field: f.key,
          operator: f.op,
          value: f.val,
        })),
      },
      sorters: {
        initial: [
          {
            field: "nested.field",
            order: "desc",
          },
        ],
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle edge case with false hasPagination", () => {
    const input = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      hasPagination: false,
    },
  });
};
`;

    const expectedOutput = `
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const { tableProps } = useTable({
    refineCoreProps: {
      pagination: {
        mode: "off",
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });

  it("should handle multiple hooks in same file", () => {
    const input = `
import { useTable, useDataGrid } from "@refinedev/antd";

const MyComponent = () => {
  const { tableProps } = useTable({
    initialSorter: [{ field: "id", order: "desc" }],
    hasPagination: true,
  });

  const { dataGridProps } = useDataGrid({
    refineCoreProps: {
      permanentSorter: [{ field: "status", order: "asc" }],
      initialCurrent: 5,
    },
  });
};
`;

    const expectedOutput = `
import { useTable, useDataGrid } from "@refinedev/antd";

const MyComponent = () => {
  const { tableProps } = useTable({
    pagination: {
      mode: "server",
    },
    sorters: {
      initial: [{ field: "id", order: "desc" }],
    },
  });

  const { dataGridProps } = useDataGrid({
    refineCoreProps: {
      pagination: {
        current: 5,
      },
      sorters: {
        permanent: [{ field: "status", order: "asc" }],
      },
    },
  });
};
`;

    const result = applyTransform(input);
    expect(result.trim()).toBe(expectedOutput.trim());
  });
});
