# @refinedev/rest

## 2.0.1

### Patch Changes

- [#7047](https://github.com/refinedev/refine/pull/7047) [`f1085a350344fb5264099fc46123a8b05944154b`](https://github.com/refinedev/refine/commit/f1085a350344fb5264099fc46123a8b05944154b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `getMany` `mapResponse` return value is wrong.

  Now `getMany` properly handles both array and object response formats by checking if the response is an array and returning the appropriate data structure.
