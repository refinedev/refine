---
id: contributing
title: Contributing
---

We follow a [code of conduct][CODE_OF_CONDUCT] when participating with community. Please read it before you make any contributions.

* If you plan to work on an issue, mention so in the issue page before you start working on it.
* If you plan to work on a new feature, create an issue and discuss it with other community members/maintainers.
* Ask for help in our [community room][Discord Channel].

## Running in development mode

This project has multiple packages and uses [Lerna][Lerna] to manage all of the packages under `packages/`.

First, install dependencies:

```sh
npm install
```

Then, start all the packages in watch mode:

```bash
npm run lerna bootstrap
npm run start
```

Now all packages run in watch mode. You can start one of the example projects in `/examples/*` or `/example` directories and when you change a file in any of the packages in `/packages/*`, it should re-compile and example gets automatically reloaded.

```bash
cd examples/base
npm install
npm run start
```

## Starting Documentation in Development Mode

Our documentation is built with [Docusaurus][Docusaurus]. To start it in development mode, run:

```bash
cd documentation
npm install
npm run start
```

## Running tests

`npm run test` command runs tests for all packages. If you're working on a package (e.g. `/packages/core`), you can run tests only for that package:

```bash
cd packages/core
npm run test
```

Or you can do it for a specific file:

```bash
npm run test -- /src/hooks/export/index.spec.ts
```

Also, to run a specific file's tests in watch mode:

```bash
npm run test -- --watch /src/hooks/export/index.spec.ts
```

Get coverage report for that file:

```bash
npm run test -- --coverage /src/hooks/export/index.spec.ts
```

When you run the command that produces coverage report, go to `/coverage/lcov-report/index.html` file to see coverage results. If you run this command in `/packages/core` directory, then coverage report will be generated in `/packages/core/coverage`.

Please make sure you contribute well tested code.

## Known Issues

- If the interface changes are not reflected in the project when the interface changes under the packages, delete the `dist` folder in the project and try again.

[Lerna]: https://github.com/lerna/lerna
[Docusaurus]: https://docusaurus.io/
[Issues]: https://github.com/pankod/refine/issues
[CODE_OF_CONDUCT]: https://github.com/pankod/refine/blob/master/CODE_OF_CONDUCT.md
[Discord Channel]: https://discord.gg/UuU3XCc3J5
