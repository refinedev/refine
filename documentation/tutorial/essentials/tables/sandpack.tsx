import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
    return (
        <TutorialSandpack
            dependencies={{
                "@refinedev/core": "latest",
            }}
            files={{
                "App.tsx": {
                    code: AppTsxCode,
                },
                "styles.css": {
                    code: StylesCssCode,
                    hidden: true,
                },
                "data-provider.ts": {
                    code: DataProviderTsCode,
                },
                "show-product.tsx": {
                    code: ShowProductTsxCode,
                    // hidden: true,
                },
                "edit-product.tsx": {
                    code: EditProductTsxCode,
                    // hidden: true,
                },
                "create-product.tsx": {
                    code: CreateProductTsxCode,
                    // hidden: true,
                },
                "list-products.tsx": {
                    code: ListProductTsxCode,
                    active: true,
                    // hidden: true,
                },
            }}
            finalFiles={{
                "App.tsx": {
                    code: AppTsxWithListProductsTsxCode,
                },
                "styles.css": {
                    code: StylesCssCode,
                    hidden: true,
                },
                "data-provider.ts": {
                    code: DataProviderWithTotalInGetListMethodTsCode,
                },
                "show-product.tsx": {
                    code: ShowProductTsxCode,
                    // hidden: true,
                },
                "edit-product.tsx": {
                    code: EditProductTsxCode,
                    // hidden: true,
                },
                "create-product.tsx": {
                    code: CreateProductTsxCode,
                    // hidden: true,
                },
                "list-products.tsx": {
                    code: ListProductsWithHeaderSortersTsxCode,
                    active: true,
                    // hidden: true,
                },
            }}
        >
            {children}
        </TutorialSandpack>
    );
};

const AppTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./data-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      <EditProduct />
      {/* <ListProducts /> */}
      {/* <CreateProduct /> */}
    </Refine>
  );
}
`.trim();

const StylesCssCode = /* css */ `
body {
    font-family: sans-serif;
    -webkit-font-smoothing: auto;
    -moz-font-smoothing: auto;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: auto;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
}
  
h1 {
  font-size: 1.5rem;
}

form input,
form textarea,
form button,
form select {
    display: block;
    margin-bottom: 12px;
}

table th {
  font-weight: 600;
}

table, th, td {
  border: 0px solid;
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 14px;
}

table th, table td {
  padding: 5px;
  text-align: left;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.pagination div {
  display: flex;
  gap: 6px;
  align-items: center;
}

.pagination span {
  cursor: pointer;
}

.pagination .current {
  font-weight: bold;
  cursor: default;
}

`.trim();

const DataProviderTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);
    const data = await response.json();

    return { data };
  },
  create: async ({ resource, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}\`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return { data };
  },
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetch(\`\${API_URL}/\${resource}?\${params.toString()}\`);
    const data = await response.json();

    return {
        data,
        total: 0, // We'll cover this in the next chapters.
    };
  },
  /* ... */
};
`.trim();

const ShowProductTsxCode = /* tsx */ `
import { useOne } from "@refinedev/core";

export const ShowProduct = () => {
    const { data, isLoading } = useOne({ resource: "products", id: 123 });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Product name: {data?.data.name}</div>;
};
`.trim();

const ListProductTsxCode = /* tsx */ `
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: [{ field: "name", order: "asc" }],
    filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.data?.map((product) => (
          <li key={product.id}>
            <p>
              {product.name}
              <br />
              Price: {product.price}
              <br />
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
`.trim();

const CreateProductTsxCode = /* tsx */ `
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({
    action: "create",
    resource: "products",
  });

  const { options } = useSelect({
    resource: "categories",
    // optionLabel: "title", // Default value is "title" so we don't need to provide it.
    // optionValue: "id", // Default value is "id" so we don't need to provide it.
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.target).entries());
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" step=".01" />

      <label htmlFor="material">Material</label>
      <input type="text" id="material" name="material" />

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

const EditProductTsxCode = /* tsx */ `
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  const { onFinish, mutationResult, queryResult } = useForm({
    action: "edit",
    resource: "products",
    id: "123"
  });

  const record = queryResult.data?.data;

  const { options } = useSelect({
    resource: "categories",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.target).entries());
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" defaultValue={record?.name} />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        defaultValue={record?.description}
      />

      <label htmlFor="price">Price</label>
      <input
        type="text"
        id="price"
        name="price"
        pattern="\d*\.?\d*"
        defaultValue={record?.price}
      />

      <label htmlFor="material">Material</label>
      <input
        type="text"
        id="material"
        name="material"
        defaultValue={record?.material}
      />

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option key={option.value} value={option.value}
            selected={record?.category.id == option.value}
            >
            {option.label}
          </option>
        ))}
      </select>

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

const AppTsxWithListProductsTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./data-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}
`.trim();

const ListProductsWithUseTableTsxCode = /* tsx */ `
import { useTable } from "@refinedev/core";

export const ListProducts = () => {
  const { tableQueryResult: { data, isLoading } } = useTable({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Material</th>
          <th>Price</th>
        </tr>
        {data.data?.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.category?.id}</td>
            <td>{product.material}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
`.trim();

const ListProductsWithUseTableAndUseManyTsxCode = /* tsx */ `
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { data: categories } = useMany({
    resource: "categories",
    ids: data?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Material</th>
          <th>Price</th>
        </tr>
        {data.data?.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>
              {
                categories?.data?.find(
                  (category) => category.id == product.category?.id,
                )?.title
              }
            </td>
            <td>{product.material}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
`.trim();

const DataProviderWithGetManyMethodTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    const response = await fetch(
      \`\${API_URL}/\${resource}?\${params.toString()}\`,
    );
    const data = await response.json();

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);
    const data = await response.json();

    return { data };
  },
  create: async ({ resource, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}\`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return { data };
  },
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetch(\`\${API_URL}/\${resource}?\${params.toString()}\`);
    const data = await response.json();

    return {
        data,
        total: 0, // We'll cover this in the next chapters.
    };
  },
  /* ... */
};
`.trim();

const DataProviderWithTotalInGetListMethodTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetch(\`\${API_URL}/\${resource}?\${params.toString()}\`);
    const data = await response.json();

    const total = Number(response.headers.get("x-total-count"));

    return {
        data,
        total,
    };
  },
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    const response = await fetch(
      \`\${API_URL}/\${resource}?\${params.toString()}\`,
    );
    const data = await response.json();

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);
    const data = await response.json();

    return { data };
  },
  create: async ({ resource, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}\`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return { data };
  },
  /* ... */
};
`.trim();

const ListProductsWithPaginationTsxCode = /* tsx */ `
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
  } = useTable({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { data: categories } = useMany({
    resource: "categories",
    ids: data?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPrevious = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const onNext = () => {
    if (current < pageCount) {
      setCurrent(current + 1);
    }
  };

  const onPage = (page: number) => {
    setCurrent(page);
  };

  return (
    <div>
      <h1>Products</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Material</th>
          <th>Price</th>
        </tr>
        {data.data?.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>
              {
                categories?.data?.find(
                  (category) => category.id == product.category?.id,
                )?.title
              }
            </td>
            <td>{product.material}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </table>
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {current - 1 > 0 && <span onClick={() => onPage(current - 1)}>{current - 1}</span>}
          <span className="current">{current}</span>
          {current + 1 < pageCount && <span onClick={() => onPage(current + 1)}>{current + 1}</span>}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};
`.trim();

const ListProductsWithHeaderSortersTsxCode = /* tsx */ `
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { data: categories } = useMany({
    resource: "categories",
    ids: data?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPrevious = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const onNext = () => {
    if (current < pageCount) {
      setCurrent(current + 1);
    }
  };

  const onPage = (page: number) => {
    setCurrent(page);
  };

  const getSorter = (field: string) => {
    const sorter = sorters?.find((sorter) => sorter.field === field);

    if (sorter) {
      return sorter.order;
    }
  }

  const onSort = (field: string) => {
    const sorter = getSorter(field);
    setSorters(
        sorter === "desc" ? [] : [
        {
            field,
            order: sorter === "asc" ? "desc" : "asc",
        },
        ]
    );
  }

  const indicator = { asc: "⬆️", desc: "⬇️" };

  return (
    <div>
      <h1>Products</h1>
      <table>
        <tr>
          <th onClick={() => onSort("id")}>
            ID {indicator[getSorter("id")]}
          </th>
          <th onClick={() => onSort("name")}>
            Name {indicator[getSorter("name")]}
          </th>
          <th>
            Category
          </th>
          <th onClick={() => onSort("material")}>
            Material {indicator[getSorter("material")]}
          </th>
          <th onClick={() => onSort("price")}>
            Price {indicator[getSorter("price")]}
          </th>
        </tr>
        {data.data?.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>
              {
                categories?.data?.find(
                  (category) => category.id == product.category?.id,
                )?.title
              }
            </td>
            <td>{product.material}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </table>
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {current - 1 > 0 && <span onClick={() => onPage(current - 1)}>{current - 1}</span>}
          <span className="current">{current}</span>
          {current + 1 < pageCount && <span onClick={() => onPage(current + 1)}>{current + 1}</span>}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};
`.trim();

export const MountListProductsInAppTsx = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/App.tsx", AppTsxWithListProductsTsxCode);
                sandpack.setActiveFile("/App.tsx");
            }}
        />
    );
};

export const RefactorToUseTableInListProducts = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/list-products.tsx",
                    ListProductsWithUseTableTsxCode,
                );
                sandpack.setActiveFile("/list-products.tsx");
            }}
        />
    );
};

export const AddRelationHandlingToUseTableInListProducts = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/list-products.tsx",
                    ListProductsWithUseTableAndUseManyTsxCode,
                );
                sandpack.setActiveFile("/list-products.tsx");
            }}
        />
    );
};

export const AddGetManyMethodToDataProvider = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/data-provider.ts",
                    DataProviderWithGetManyMethodTsCode,
                );
                sandpack.setActiveFile("/data-provider.ts");
            }}
        />
    );
};

export const AddTotalToGetListMethodInDataProvider = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/data-provider.ts",
                    DataProviderWithTotalInGetListMethodTsCode,
                );
                sandpack.setActiveFile("/data-provider.ts");
            }}
        />
    );
};

export const AddPaginationToUseTableInListProducts = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/list-products.tsx",
                    ListProductsWithPaginationTsxCode,
                );
                sandpack.setActiveFile("/list-products.tsx");
            }}
        />
    );
};

export const AddHeaderSortersToUseTableInListProducts = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile(
                    "/list-products.tsx",
                    ListProductsWithHeaderSortersTsxCode,
                );
                sandpack.setActiveFile("/list-products.tsx");
            }}
        />
    );
};
