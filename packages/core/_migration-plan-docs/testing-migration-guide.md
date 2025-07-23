# Refine v5 Testing Migration Guide

## Overview

This guide helps you update your test suites for Refine v5 compatibility. While Refine v5 maintains 100% backward compatibility for application code, some testing patterns may need updates to work optimally with the new internal architecture.

### Key Testing Changes

- 🔄 **TanStack Query v5**: Updated testing utilities and patterns
- 🧪 **Enhanced Mocking**: Better mock support for v5 features
- ⚡ **Improved Performance**: Faster test execution
- 🛠️ **Better Debugging**: Enhanced testing debugging capabilities

---

## Quick Start

### Most Tests Don't Need Changes

The majority of your existing tests should continue to work without modifications:

```typescript
// This test continues to work in v5
import { renderHook, waitFor } from "@testing-library/react";
import { useList } from "@refinedev/core";

test("should fetch posts", async () => {
  const { result } = renderHook(() => useList({ resource: "posts" }));

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.data).toBeDefined();
});
```

### Common Updates Needed

Some tests may need minor updates for optimal v5 compatibility:

```typescript
// v4 test pattern
test("should handle loading state", async () => {
  const { result } = renderHook(() => useList({ resource: "posts" }));

  expect(result.current.isLoading).toBe(true);

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });
});

// v5 enhanced test pattern
test("should handle loading state", async () => {
  const { result } = renderHook(() => useList({ resource: "posts" }));

  // Both isLoading and isPending work (backward compatibility)
  expect(result.current.isLoading).toBe(true);
  expect(result.current.isPending).toBe(true);

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPending).toBe(false);
  });
});
```

---

## Testing Environment Updates

### Update Test Dependencies

Update your testing-related dependencies to work optimally with v5:

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@tanstack/react-query": "^5.81.5",
    "@tanstack/react-query-devtools": "^5.81.5",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0"
  }
}
```

### Update Jest Configuration

Enhance your Jest configuration for v5 compatibility:

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapping: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/setupTests.ts",
  ],
  // Enhanced for v5
  maxWorkers: "50%",
  workerIdleMemoryLimit: "512MB",
};
```

### Update Test Setup

Update your test setup file for v5 compatibility:

```typescript
// src/setupTests.ts
import "@testing-library/jest-dom";
import { QueryClient } from "@tanstack/react-query";

// Enhanced QueryClient for testing
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0, // v5 uses gcTime instead of cacheTime
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: () => {},
      warn: () => {},
      error: () => {},
    },
  });

// Global test utilities
global.createTestQueryClient = createTestQueryClient;
```

---

## Test Wrapper Updates

### Enhanced Test Wrapper

Update your test wrapper for v5 compatibility:

```typescript
// src/test-utils.tsx
import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Refine } from "@refinedev/core";

// Enhanced test wrapper for v5
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Refine
          dataProvider={{
            getList: () => Promise.resolve({ data: [], total: 0 }),
            getOne: () => Promise.resolve({ data: {} }),
            getMany: () => Promise.resolve({ data: [] }),
            create: () => Promise.resolve({ data: {} }),
            update: () => Promise.resolve({ data: {} }),
            deleteOne: () => Promise.resolve({ data: {} }),
            getApiUrl: () => "http://localhost:3000",
          }}
          resources={[{ name: "posts" }]}
        >
          {children}
        </Refine>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
```

### Enhanced Hook Testing

Update your hook testing utilities:

```typescript
// src/test-utils/hooks.tsx
import { renderHook, RenderHookOptions } from "@testing-library/react";
import { AllTheProviders } from "./test-utils";

export const renderRefineHook = <TProps, TResult>(
  hook: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>,
) => {
  return renderHook(hook, {
    wrapper: AllTheProviders,
    ...options,
  });
};
```

---

## Hook Testing Patterns

### Data Hook Testing

#### useList Hook Testing

```typescript
// Enhanced useList testing
import { renderRefineHook } from "../test-utils/hooks";
import { useList } from "@refinedev/core";

describe("useList", () => {
  test("should fetch list data", async () => {
    const { result } = renderRefineHook(() => useList({ resource: "posts" }));

    // Test initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Test loaded state
    expect(result.current.data).toBeDefined();
    expect(result.current.isSuccess).toBe(true);
  });

  test("should handle error state", async () => {
    // Mock error response
    const errorDataProvider = {
      getList: () => Promise.reject(new Error("Network error")),
      // ... other methods
    };

    const { result } = renderRefineHook(() => useList({ resource: "posts" }), {
      wrapper: ({ children }) => (
        <AllTheProviders dataProvider={errorDataProvider}>
          {children}
        </AllTheProviders>
      ),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  test("should handle success callback", async () => {
    const onSuccess = jest.fn();

    const { result } = renderRefineHook(() =>
      useList({
        resource: "posts",
        onSuccess,
      }),
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(onSuccess).toHaveBeenCalledWith(result.current.data);
  });
});
```

#### useOne Hook Testing

```typescript
// Enhanced useOne testing
describe("useOne", () => {
  test("should fetch single resource", async () => {
    const { result } = renderRefineHook(() =>
      useOne({ resource: "posts", id: "1" }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.id).toBe("1");
  });

  test("should handle disabled state", () => {
    const { result } = renderRefineHook(() =>
      useOne({
        resource: "posts",
        id: undefined, // Disabled when no id
        queryOptions: { enabled: false },
      }),
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
```

### Mutation Hook Testing

#### useCreate Hook Testing

```typescript
// Enhanced useCreate testing
describe("useCreate", () => {
  test("should create resource", async () => {
    const { result } = renderRefineHook(() => useCreate({ resource: "posts" }));

    const newPost = { title: "Test Post", content: "Test Content" };

    act(() => {
      result.current.mutate(newPost);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
  });

  test("should handle optimistic updates", async () => {
    const queryClient = createTestQueryClient();
    const onMutate = jest.fn();

    const { result } = renderRefineHook(() =>
      useCreate({
        resource: "posts",
        onMutate,
      }),
    );

    const newPost = { title: "Test Post" };

    act(() => {
      result.current.mutate(newPost);
    });

    expect(onMutate).toHaveBeenCalledWith(newPost);
  });

  test("should handle error with rollback", async () => {
    const errorDataProvider = {
      create: () => Promise.reject(new Error("Create failed")),
      // ... other methods
    };

    const onError = jest.fn();

    const { result } = renderRefineHook(
      () => useCreate({ resource: "posts", onError }),
      {
        wrapper: ({ children }) => (
          <AllTheProviders dataProvider={errorDataProvider}>
            {children}
          </AllTheProviders>
        ),
      },
    );

    act(() => {
      result.current.mutate({ title: "Test Post" });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(onError).toHaveBeenCalled();
  });
});
```

### Auth Hook Testing

#### useLogin Hook Testing

```typescript
// Enhanced useLogin testing
describe("useLogin", () => {
  test("should login successfully", async () => {
    const authProvider = {
      login: jest.fn().mockResolvedValue({ success: true }),
      // ... other methods
    };

    const { result } = renderRefineHook(() => useLogin(), {
      wrapper: ({ children }) => (
        <AllTheProviders authProvider={authProvider}>
          {children}
        </AllTheProviders>
      ),
    });

    const loginData = { email: "test@example.com", password: "password" };

    act(() => {
      result.current.mutate(loginData);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(authProvider.login).toHaveBeenCalledWith(loginData);
  });

  test("should handle login error", async () => {
    const authProvider = {
      login: jest.fn().mockRejectedValue(new Error("Invalid credentials")),
      // ... other methods
    };

    const onError = jest.fn();

    const { result } = renderRefineHook(() => useLogin({ onError }), {
      wrapper: ({ children }) => (
        <AllTheProviders authProvider={authProvider}>
          {children}
        </AllTheProviders>
      ),
    });

    act(() => {
      result.current.mutate({ email: "test@example.com", password: "wrong" });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(onError).toHaveBeenCalled();
  });
});
```

---

## Component Testing

### Enhanced Component Testing

```typescript
// Enhanced component testing
import { render, screen, waitFor } from "../test-utils";
import { PostList } from "../components/PostList";

describe("PostList", () => {
  test("should render posts", async () => {
    const mockPosts = [
      { id: "1", title: "Post 1" },
      { id: "2", title: "Post 2" },
    ];

    const dataProvider = {
      getList: () => Promise.resolve({ data: mockPosts, total: 2 }),
      // ... other methods
    };

    render(<PostList />, {
      wrapper: ({ children }) => (
        <AllTheProviders dataProvider={dataProvider}>
          {children}
        </AllTheProviders>
      ),
    });

    // Test loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
    });

    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  test("should handle error state", async () => {
    const dataProvider = {
      getList: () => Promise.reject(new Error("Network error")),
      // ... other methods
    };

    render(<PostList />, {
      wrapper: ({ children }) => (
        <AllTheProviders dataProvider={dataProvider}>
          {children}
        </AllTheProviders>
      ),
    });

    await waitFor(() => {
      expect(screen.getByText("Error loading posts")).toBeInTheDocument();
    });
  });
});
```

### Form Component Testing

```typescript
// Enhanced form testing
import { render, screen, fireEvent, waitFor } from "../test-utils";
import { PostForm } from "../components/PostForm";

describe("PostForm", () => {
  test("should submit form successfully", async () => {
    const onCreate = jest.fn();
    const dataProvider = {
      create: onCreate.mockResolvedValue({ data: { id: "1" } }),
      // ... other methods
    };

    render(<PostForm />, {
      wrapper: ({ children }) => (
        <AllTheProviders dataProvider={dataProvider}>
          {children}
        </AllTheProviders>
      ),
    });

    // Fill form
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Post" },
    });
    fireEvent.change(screen.getByLabelText("Content"), {
      target: { value: "Test Content" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onCreate).toHaveBeenCalledWith({
        resource: "posts",
        variables: {
          title: "Test Post",
          content: "Test Content",
        },
      });
    });
  });
});
```

---

## Mock Data and Providers

### Enhanced Mock Data Provider

```typescript
// src/test-utils/mockDataProvider.ts
import { DataProvider } from "@refinedev/core";

export const createMockDataProvider = (
  overrides?: Partial<DataProvider>,
): DataProvider => ({
  getList: jest.fn().mockResolvedValue({
    data: [
      { id: "1", title: "Post 1" },
      { id: "2", title: "Post 2" },
    ],
    total: 2,
  }),
  getOne: jest.fn().mockResolvedValue({
    data: { id: "1", title: "Post 1" },
  }),
  getMany: jest.fn().mockResolvedValue({
    data: [
      { id: "1", title: "Post 1" },
      { id: "2", title: "Post 2" },
    ],
  }),
  create: jest.fn().mockResolvedValue({
    data: { id: "3", title: "New Post" },
  }),
  update: jest.fn().mockResolvedValue({
    data: { id: "1", title: "Updated Post" },
  }),
  deleteOne: jest.fn().mockResolvedValue({
    data: { id: "1" },
  }),
  getApiUrl: jest.fn().mockReturnValue("http://localhost:3000"),
  custom: jest.fn().mockResolvedValue({
    data: {},
  }),
  ...overrides,
});
```

### Enhanced Mock Auth Provider

```typescript
// src/test-utils/mockAuthProvider.ts
import { AuthProvider } from "@refinedev/core";

export const createMockAuthProvider = (
  overrides?: Partial<AuthProvider>,
): AuthProvider => ({
  login: jest.fn().mockResolvedValue({ success: true }),
  logout: jest.fn().mockResolvedValue({ success: true }),
  check: jest.fn().mockResolvedValue({ authenticated: true }),
  onError: jest.fn().mockResolvedValue({}),
  getIdentity: jest.fn().mockResolvedValue({
    id: "1",
    name: "Test User",
    email: "test@example.com",
  }),
  getPermissions: jest.fn().mockResolvedValue(["admin"]),
  ...overrides,
});
```

---

## Integration Testing

### Enhanced Integration Testing

```typescript
// src/test-utils/integration.tsx
import { render, screen, waitFor } from "../test-utils";
import { App } from "../App";

describe("App Integration", () => {
  test("should render complete application", async () => {
    render(<App />);

    // Test initial loading
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for app to load
    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    // Test navigation
    fireEvent.click(screen.getByText("Posts"));

    await waitFor(() => {
      expect(screen.getByText("Post List")).toBeInTheDocument();
    });
  });

  test("should handle authentication flow", async () => {
    const authProvider = createMockAuthProvider({
      check: jest.fn().mockResolvedValue({ authenticated: false }),
    });

    render(<App />, {
      wrapper: ({ children }) => (
        <AllTheProviders authProvider={authProvider}>
          {children}
        </AllTheProviders>
      ),
    });

    // Should redirect to login
    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });
});
```

---

## Performance Testing

### Enhanced Performance Testing

```typescript
// src/test-utils/performance.test.tsx
import { render, screen, waitFor } from "../test-utils";
import { PostList } from "../components/PostList";

describe("Performance", () => {
  test("should handle large datasets efficiently", async () => {
    const largeMockData = Array.from({ length: 1000 }, (_, i) => ({
      id: String(i + 1),
      title: `Post ${i + 1}`,
    }));

    const dataProvider = createMockDataProvider({
      getList: jest.fn().mockResolvedValue({
        data: largeMockData,
        total: 1000,
      }),
    });

    const startTime = performance.now();

    render(<PostList />, {
      wrapper: ({ children }) => (
        <AllTheProviders dataProvider={dataProvider}>
          {children}
        </AllTheProviders>
      ),
    });

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render within reasonable time
    expect(renderTime).toBeLessThan(1000); // 1 second
  });

  test("should handle memory efficiently", async () => {
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

    const { unmount } = render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
    });

    unmount();

    // Allow garbage collection
    await new Promise((resolve) => setTimeout(resolve, 100));

    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const memoryDiff = finalMemory - initialMemory;

    // Should not have significant memory leaks
    expect(memoryDiff).toBeLessThan(10 * 1024 * 1024); // 10MB threshold
  });
});
```

---

## Debugging Tests

### Enhanced Test Debugging

```typescript
// src/test-utils/debug.ts
import { screen, prettyDOM } from "@testing-library/react";

export const debugTest = () => {
  console.log("Current DOM:", prettyDOM(screen.container));
};

export const debugQuery = (element: HTMLElement) => {
  console.log("Element:", prettyDOM(element));
};

export const debugQueries = () => {
  screen.debug();
};
```

### Test Debugging Utilities

```typescript
// Enhanced debugging in tests
describe("PostList", () => {
  test("should debug rendering issues", async () => {
    render(<PostList />);

    // Debug initial state
    console.log("Initial state:", screen.debug());

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    // Debug loading state
    console.log("Loading state:", screen.debug());

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
    });

    // Debug final state
    console.log("Final state:", screen.debug());
  });
});
```

---

## Common Testing Issues and Solutions

### Issue: Tests Are Slow

**Problem**: Tests take too long to execute.

**Solution**: Optimize test setup and cleanup:

```typescript
// Optimize test setup
beforeEach(() => {
  // Clear all mocks
  jest.clearAllMocks();

  // Reset query client
  queryClient.clear();
});

afterEach(() => {
  // Cleanup
  cleanup();
});
```

### Issue: Memory Leaks in Tests

**Problem**: Tests consume too much memory.

**Solution**: Proper cleanup and garbage collection:

```typescript
// Proper cleanup
afterEach(() => {
  // Clear query client
  queryClient.clear();

  // Force garbage collection in tests
  if (global.gc) {
    global.gc();
  }
});
```

### Issue: Flaky Tests

**Problem**: Tests pass/fail inconsistently.

**Solution**: Better async handling and waiting:

```typescript
// Better async handling
test("should handle async operations", async () => {
  const { result } = renderRefineHook(() => useList({ resource: "posts" }));

  // Wait for specific conditions
  await waitFor(
    () => {
      expect(result.current.isLoading).toBe(false);
    },
    { timeout: 5000 },
  );

  // Add additional assertions
  expect(result.current.data).toBeDefined();
  expect(result.current.isSuccess).toBe(true);
});
```

---

## Migration Checklist

### Testing Migration Steps

- [ ] Update test dependencies to v5 compatible versions
- [ ] Update Jest configuration for optimal v5 performance
- [ ] Update test setup files with enhanced QueryClient
- [ ] Update test wrappers for v5 compatibility
- [ ] Review and update hook tests for new patterns
- [ ] Update component tests for enhanced features
- [ ] Update integration tests for full application testing
- [ ] Implement performance testing for large datasets
- [ ] Add debugging utilities for better test development
- [ ] Run full test suite and fix any failing tests

### Test Validation

- [ ] All existing tests pass
- [ ] New v5 features are tested
- [ ] Performance tests show improvements
- [ ] Memory usage tests pass
- [ ] Integration tests cover full application flow
- [ ] Error handling tests are comprehensive
- [ ] Mock providers work correctly
- [ ] Debugging tools are functional

---

## Conclusion

The testing migration for Refine v5 is straightforward:

### ✅ **Minimal Changes Required**

- Most tests continue to work unchanged
- Simple updates for enhanced compatibility
- Better performance and debugging

### 🚀 **Enhanced Testing Experience**

- Faster test execution
- Better memory management
- Improved debugging tools
- Enhanced mock support

### 📊 **Better Test Coverage**

- Comprehensive testing patterns
- Performance testing capabilities
- Enhanced integration testing
- Better error handling tests

Following this guide ensures your test suite is fully compatible with Refine v5 while taking advantage of the enhanced testing capabilities and performance improvements.
