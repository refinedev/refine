# Refine v5 Troubleshooting Guide

## Overview

This guide helps you resolve common issues when migrating to or using Refine v5. While the migration maintains 100% backward compatibility, this guide covers potential issues and their solutions.

### Common Issue Categories

- 🔧 **Installation & Dependencies**
- 📦 **Bundle & Build Issues**
- 🔄 **Query & Data Issues**
- 🧪 **Testing Problems**
- ⚛️ **React Compatibility**
- 🚀 **Performance Issues**

---

## Installation & Dependencies

### Issue: Peer Dependency Warnings

**Problem**: Getting peer dependency warnings during installation.

```bash
npm WARN peer dep missing: @tanstack/react-query@^5.0.0
```

**Solution**: Install the correct TanStack Query version:

```bash
# Install TanStack Query v5
npm install @tanstack/react-query@^5.81.5

# Or update all Refine packages
npm install @refinedev/core@latest @refinedev/antd@latest @refinedev/mantine@latest
```

**Verification**:

```bash
npm ls @tanstack/react-query
```

### Issue: React Version Conflicts

**Problem**: Conflicting React versions in package.json.

```bash
Error: React version mismatch
```

**Solution**: Ensure consistent React versions:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

**For React 19**:

```json
{
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0"
  }
}
```

### Issue: TypeScript Compilation Errors

**Problem**: TypeScript errors after upgrading to v5.

```typescript
// Error: Property 'isPending' does not exist on type 'UseQueryResult'
const { isPending } = useList({ resource: "posts" });
```

**Solution**: Update TypeScript types:

```bash
# Update TypeScript types
npm install @types/react@latest @types/react-dom@latest
```

**Alternative**: Use backward-compatible properties:

```typescript
// Use isLoading instead of isPending (both work)
const { isLoading } = useList({ resource: "posts" });
```

---

## Bundle & Build Issues

### Issue: Bundle Size Increase

**Problem**: Bundle size increased after upgrading to v5.

**Solution**: Verify you're using the correct versions:

```bash
# Check bundle sizes
npm run build
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer build/static/js/*.js
```

**Expected**: Bundle size should be 10-15% smaller with v5.

**If bundle is larger**:

1. Clear node_modules and reinstall
2. Verify no duplicate dependencies
3. Check for outdated packages

```bash
rm -rf node_modules package-lock.json
npm install
npm dedupe
```

### Issue: Build Failures

**Problem**: Build fails with TanStack Query errors.

```bash
Error: Cannot resolve module '@tanstack/react-query'
```

**Solution**: Clear cache and reinstall:

```bash
# Clear all caches
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# For Yarn
yarn cache clean
rm -rf node_modules yarn.lock
yarn install
```

### Issue: Development Server Errors

**Problem**: Development server fails to start.

```bash
Error: Cannot find module '@tanstack/react-query'
```

**Solution**: Check your package.json and restart:

```bash
# Stop development server
# Clear cache
npm cache clean --force

# Reinstall dependencies
npm install

# Restart development server
npm start
```

---

## Query & Data Issues

### Issue: Queries Not Working

**Problem**: Data hooks not fetching data after upgrade.

```typescript
// Data is undefined or hooks seem broken
const { data, isLoading } = useList({ resource: "posts" });
console.log(data); // undefined
```

**Solution**: Check your data provider setup:

```typescript
// Ensure data provider is properly configured
const App = () => {
  return (
    <Refine
      dataProvider={dataProvider} // Make sure this is properly configured
      resources={[{ name: "posts" }]}
    >
      {/* Your app */}
    </Refine>
  );
};
```

**Debug**: Add logging to data provider:

```typescript
const dataProvider = {
  getList: async (params) => {
    console.log("getList called with:", params);
    const result = await apiClient.get("/posts");
    console.log("getList result:", result);
    return result;
  },
  // ... other methods
};
```

### Issue: Callbacks Not Firing

**Problem**: `onSuccess` or `onError` callbacks not being called.

```typescript
// Callbacks seem to not work
const { data } = useList({
  resource: "posts",
  onSuccess: (data) => console.log("Success:", data), // Not called
  onError: (error) => console.log("Error:", error), // Not called
});
```

**Solution**: Verify callback syntax and dependencies:

```typescript
// Ensure callbacks are properly memoized
const onSuccess = useCallback((data) => {
  console.log("Success:", data);
}, []);

const onError = useCallback((error) => {
  console.log("Error:", error);
}, []);

const { data } = useList({
  resource: "posts",
  onSuccess,
  onError,
});
```

**Debug**: Add logging to verify hook behavior:

```typescript
const { data, isLoading, isSuccess, isError } = useList({
  resource: "posts",
  onSuccess: (data) => {
    console.log("Success callback called:", data);
  },
  onError: (error) => {
    console.log("Error callback called:", error);
  },
});

// Log state changes
useEffect(() => {
  console.log("Hook state:", { isLoading, isSuccess, isError, data });
}, [isLoading, isSuccess, isError, data]);
```

### Issue: Cache Not Working

**Problem**: Data not being cached properly.

```typescript
// Data refetches every time
const { data } = useList({ resource: "posts" });
```

**Solution**: Check QueryClient configuration:

```typescript
// Ensure QueryClient is properly configured
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (v5 uses gcTime)
    },
  },
});

// Make sure QueryClient is provided
<QueryClientProvider client={queryClient}>
  <Refine>{/* Your app */}</Refine>
</QueryClientProvider>;
```

### Issue: Mutations Not Working

**Problem**: Create, update, or delete operations not working.

```typescript
// Mutations not working
const { mutate: createPost } = useCreate({ resource: "posts" });

createPost({ title: "Test" }); // Not working
```

**Solution**: Check mutation configuration:

```typescript
// Ensure data provider implements all required methods
const dataProvider = {
  getList: () => Promise.resolve({ data: [], total: 0 }),
  getOne: () => Promise.resolve({ data: {} }),
  create: async (params) => {
    console.log("Create called with:", params);
    // Your create logic
    return { data: { id: 1, ...params.variables } };
  },
  update: async (params) => {
    console.log("Update called with:", params);
    // Your update logic
    return { data: { id: params.id, ...params.variables } };
  },
  deleteOne: async (params) => {
    console.log("Delete called with:", params);
    // Your delete logic
    return { data: { id: params.id } };
  },
  // ... other methods
};
```

---

## Testing Problems

### Issue: Tests Failing After Upgrade

**Problem**: Tests that worked with v4 now fail with v5.

```bash
Error: Cannot read property 'isLoading' of undefined
```

**Solution**: Update test setup for v5:

```typescript
// Update test setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0, // v5 uses gcTime
      },
      mutations: {
        retry: false,
      },
    },
  });

// Update test wrapper
const TestWrapper = ({ children }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
);
```

### Issue: Mock Data Not Working

**Problem**: Mocked data providers not working in tests.

**Solution**: Update mock implementation:

```typescript
// Update mock data provider
const mockDataProvider = {
  getList: jest.fn().mockResolvedValue({
    data: [{ id: 1, title: "Test" }],
    total: 1,
  }),
  getOne: jest.fn().mockResolvedValue({
    data: { id: 1, title: "Test" },
  }),
  // ... other methods
};
```

### Issue: Async Tests Timing Out

**Problem**: Tests timing out with v5.

**Solution**: Increase timeout and improve async handling:

```typescript
// Increase timeout
jest.setTimeout(10000);

// Better async handling
test("should fetch data", async () => {
  const { result } = renderHook(() => useList({ resource: "posts" }));

  await waitFor(
    () => {
      expect(result.current.isLoading).toBe(false);
    },
    { timeout: 5000 },
  );

  expect(result.current.data).toBeDefined();
});
```

---

## React Compatibility

### Issue: React 19 Compatibility Problems

**Problem**: Issues when using React 19 with Refine v5.

**Solution**: Ensure all packages support React 19:

```bash
# Check React version
npm ls react

# Update to React 19
npm install react@^19.1.0 react-dom@^19.1.0
npm install @types/react@^19.1.0 @types/react-dom@^19.1.0
```

### Issue: Concurrent Features Not Working

**Problem**: React concurrent features not working as expected.

**Solution**: Enable concurrent features properly:

```typescript
// Enable concurrent features
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**With Suspense**:

```typescript
// Use Suspense boundaries
import { Suspense } from "react";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Refine>{/* Your app */}</Refine>
    </Suspense>
  );
};
```

---

## Performance Issues

### Issue: Slow Query Performance

**Problem**: Queries are slower than expected.

**Solution**: Optimize query configuration:

```typescript
// Optimize query settings
const { data } = useList({
  resource: "posts",
  queryOptions: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
});
```

**Enable query deduplication**:

```typescript
// Queries with same key are automatically deduplicated
const { data: posts1 } = useList({ resource: "posts" });
const { data: posts2 } = useList({ resource: "posts" });
// Only one request is made
```

### Issue: Memory Leaks

**Problem**: Application consuming too much memory.

**Solution**: Implement proper cleanup:

```typescript
// Proper cleanup in components
useEffect(() => {
  // Your effect
  return () => {
    // Cleanup
  };
}, []);

// Configure garbage collection
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

### Issue: Bundle Size Too Large

**Problem**: Bundle size larger than expected.

**Solution**: Enable tree shaking and optimization:

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false,
  },
  resolve: {
    alias: {
      "@refinedev/core": path.resolve(
        __dirname,
        "node_modules/@refinedev/core",
      ),
    },
  },
};
```

---

## Development Issues

### Issue: Hot Reload Not Working

**Problem**: Hot reload not working after upgrade.

**Solution**: Clear cache and restart development server:

```bash
# Clear cache
rm -rf node_modules/.cache
npm cache clean --force

# Restart development server
npm start
```

### Issue: TypeScript Intellisense Problems

**Problem**: TypeScript intellisense not working properly.

**Solution**: Update TypeScript and restart language server:

```bash
# Update TypeScript
npm install -D typescript@latest

# Restart TypeScript server in VS Code
# Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

### Issue: DevTools Not Working

**Problem**: React Query DevTools not showing.

**Solution**: Update DevTools configuration:

```typescript
// Update DevTools import
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Add to your app
const App = () => {
  return (
    <div>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};
```

---

## Error Messages & Solutions

### Common Error Messages

#### "Cannot read property 'isLoading' of undefined"

**Cause**: Hook not properly initialized or QueryClient not provided.

**Solution**: Ensure QueryClient is provided:

```typescript
// Ensure QueryClient is provided
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Refine>{/* Your app */}</Refine>
    </QueryClientProvider>
  );
};
```

#### "Query key must be an array"

**Cause**: Invalid query key format.

**Solution**: Ensure query keys are arrays:

```typescript
// Correct query key format
const { data } = useCustom({
  url: "/api/data",
  method: "get",
  queryOptions: {
    queryKey: ["custom", "data"], // Must be array
  },
});
```

#### "Mutation function is required"

**Cause**: Mutation function not properly configured.

**Solution**: Ensure data provider implements required methods:

```typescript
const dataProvider = {
  // ... other methods
  create: async (params) => {
    // Implementation required
    return { data: { id: 1, ...params.variables } };
  },
};
```

---

## Debugging Tools

### Query Debugging

```typescript
// Debug query state
const { data, isLoading, error, status } = useList({
  resource: "posts",
  queryOptions: {
    onSuccess: (data) => {
      console.log("Query success:", data);
    },
    onError: (error) => {
      console.log("Query error:", error);
    },
  },
});

// Log query state
useEffect(() => {
  console.log("Query state:", { isLoading, status, data, error });
}, [isLoading, status, data, error]);
```

### Network Debugging

```typescript
// Debug network requests
const dataProvider = {
  getList: async (params) => {
    console.log("getList params:", params);

    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      console.log("getList response:", data);
      return data;
    } catch (error) {
      console.error("getList error:", error);
      throw error;
    }
  },
};
```

### Performance Debugging

```typescript
// Debug performance
const { data } = useList({
  resource: "posts",
  queryOptions: {
    onSuccess: (data) => {
      console.log("Query completed in:", performance.now() - startTime, "ms");
    },
  },
});

// Monitor memory usage
useEffect(() => {
  const memoryUsage = (performance as any).memory?.usedJSHeapSize;
  console.log("Memory usage:", memoryUsage);
}, [data]);
```

---

## Getting Help

### Community Resources

1. **Discord**: [Refine Discord Community](https://discord.gg/refine)
2. **GitHub Issues**: [Report Issues](https://github.com/refinedev/refine/issues)
3. **Stack Overflow**: [Ask Questions](https://stackoverflow.com/questions/tagged/refine)

### Documentation

1. **Migration Guide**: [User Migration Guide](./user-migration-guide.md)
2. **API Reference**: [API Changes Reference](./api-changes-reference.md)
3. **Testing Guide**: [Testing Migration Guide](./testing-migration-guide.md)

### Creating Bug Reports

When reporting issues, include:

1. **Environment**:

   - Node.js version
   - React version
   - Refine version
   - Browser (if applicable)

2. **Reproduction Steps**:

   - Minimal code example
   - Steps to reproduce
   - Expected vs actual behavior

3. **Error Details**:
   - Error messages
   - Stack traces
   - Console logs

```typescript
// Example bug report template
{
  "environment": {
    "node": "18.17.0",
    "react": "18.2.0",
    "refine": "5.0.0",
    "browser": "Chrome 118.0.5993.70"
  },
  "reproduction": {
    "code": "const { data } = useList({ resource: 'posts' });",
    "steps": [
      "1. Install Refine v5",
      "2. Use useList hook",
      "3. Data is undefined"
    ]
  },
  "error": {
    "message": "Cannot read property 'isLoading' of undefined",
    "stack": "...",
    "console": "..."
  }
}
```

---

## Frequently Asked Questions

### Q: Is Refine v5 compatible with my existing code?

**A**: Yes! Refine v5 maintains 100% backward compatibility. Your existing code should work without changes.

### Q: Should I upgrade to React 19?

**A**: It's optional. Refine v5 works with both React 18 and 19. You can upgrade React when you're ready.

### Q: Why are my tests failing?

**A**: Most likely due to TanStack Query v5 changes. Update your test setup as described in the [Testing Migration Guide](./testing-migration-guide.md).

### Q: How do I optimize performance?

**A**: Use proper query options, enable caching, and implement query deduplication. See the [Performance Benchmarks](./performance-benchmarks.md) for details.

### Q: My bundle size increased. Is this normal?

**A**: No, bundle size should decrease by 10-15%. Check for duplicate dependencies and clear your cache.

---

## Conclusion

Most issues with Refine v5 are related to:

1. **Dependency conflicts** - Ensure correct versions
2. **Cache issues** - Clear cache and reinstall
3. **Test setup** - Update test configuration
4. **TypeScript** - Update types and restart language server

The troubleshooting steps in this guide should resolve the majority of issues. If problems persist, don't hesitate to reach out to the community for help!
