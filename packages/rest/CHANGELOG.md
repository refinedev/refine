# @refinedev/rest

## 2.0.3

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 2.0.2

### Patch Changes

- [#7049](https://github.com/refinedev/refine/pull/7049) [`f36f0a6cca47013365d32c261416e8558d41b265`](https://github.com/refinedev/refine/commit/f36f0a6cca47013365d32c261416e8558d41b265) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `getMany` method now returns the complete response body

  Previously, `getMany` method was returning `body.records` which assumed a specific response structure. Now it returns the complete response body directly, providing more flexibility for different API response formats.

## 2.0.1

### Patch Changes

- [#7047](https://github.com/refinedev/refine/pull/7047) [`f1085a350344fb5264099fc46123a8b05944154b`](https://github.com/refinedev/refine/commit/f1085a350344fb5264099fc46123a8b05944154b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `getMany` `mapResponse` return value is wrong.

  Now `getMany` properly handles both array and object response formats by checking if the response is an array and returning the appropriate data structure.
