# @pankod/refine-medusa

## 1.4.0

### Minor Changes

-   [#2688](https://github.com/pankod/refine/pull/2688) [`508045ac30`](https://github.com/pankod/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 1.3.0

### Minor Changes

-   Fixed payload data in delete on nestjsx data provider custom method.

## 1.2.0

### Minor Changes

-   [#2465](https://github.com/pankod/refine/pull/2465) [`4d07f33993`](https://github.com/pankod/refine/commit/4d07f33993fa5a6facaf33cd651ef94892d15dae) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed payload data in delete on nestjsx data provider custom method.

## 1.1.0

### Minor Changes

-   Updated `checkError` methods of `authProvider`

### Patch Changes

-   Removed api url `/store` suffix from `authProvider`.

*   Fix Medusa data provider return type

## 1.0.0

### Major Changes

-   [#2142](https://github.com/pankod/refine/pull/2142) [`dd00de215a`](https://github.com/pankod/refine/commit/dd00de215a869a11076a539227de9dc1de731a55) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `checkError` methods of `authProvider`

### Patch Changes

-   [#2142](https://github.com/pankod/refine/pull/2142) [`dd00de215a`](https://github.com/pankod/refine/commit/dd00de215a869a11076a539227de9dc1de731a55) Thanks [@ozkalai](https://github.com/ozkalai)! - Removed api url `/store` suffix from `authProvider`.

*   [#2142](https://github.com/pankod/refine/pull/2142) [`dd00de215a`](https://github.com/pankod/refine/commit/dd00de215a869a11076a539227de9dc1de731a55) Thanks [@ozkalai](https://github.com/ozkalai)! - Fix Medusa data provider return type

## 0.5.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 0.4.0

### Minor Changes

-   [#2440](https://github.com/pankod/refine/pull/2440) [`0150dcd070`](https://github.com/pankod/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 0.3.2

### Patch Changes

-   Fixed mismatch in `authProvider.login` for email and username

## 0.3.1

### Patch Changes

-   [#2242](https://github.com/pankod/refine/pull/2242) [`7ed5b7b05d`](https://github.com/pankod/refine/commit/7ed5b7b05dffdd4e29412f9a74097b2abdfa0017) Thanks [@ozkalai](https://github.com/ozkalai)! - Fixed mismatch in `authProvider.login` for email and username

## 0.3.0

### Minor Changes

-   Initialized [Medusa](https://medusajs.com/) data provider for Refine. Currently we're supporting Medusa's StoreFront API as a data provider and also auth provider.

## 0.2.0

### Minor Changes

-   [#2235](https://github.com/pankod/refine/pull/2235) [`488259bd38`](https://github.com/pankod/refine/commit/488259bd385ec8f659860a03367c2b5bad992912) Thanks [@ozkalai](https://github.com/ozkalai)! - Initialized [Medusa](https://medusajs.com/) data provider for Refine. Currently we're supporting Medusa's StoreFront API as a data provider and also auth provider.
