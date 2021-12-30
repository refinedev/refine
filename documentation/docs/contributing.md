---
id: contributing
title: Contributing
---

We follow a [code of conduct][CODE_OF_CONDUCT] when participating in the community. Please read it before you make any contributions.

* If you plan to work on an issue, mention so in the issue page before you start working on it.
* If you plan to work on a new feature, create an issue and discuss it with other community members/maintainers.
* Ask for help in our [community room][Discord Channel].

## Running in development mode

This project has multiple packages and uses [Lerna][Lerna] to manage all of the packages under `packages/`.

First, install dependencies:

```sh
npm install
```

From now on, depending on the packages you plan to work on, (they are located under `packages/` and `examples/` directories - see [lerna.json][lerna.json]) you will need to bootstrap them and start them in watch mode. Instead of running `lerna bootstrap` directly, read on to see how **refine** team handles it.

[Refer to **lerna** docs to learn more about it. &#8594][Lerna]

[Refer to **lerna** docs to learn more about `lerna bootstrap`. &#8594][Lerna Bootstrap]

### Starting the packages you work in watch mode

To bootstrap the packages, you should run:

```bash
npm run bootstrap
npm run build
```

At this point, all packages are bootstrapped. Now you can start the packages you plan to work on in development mode. If you don't want to start all packages in development mode, you should filter them:

```bash
npm run start -- --scope @pankod/refine --scope refine-use-select-example
```

This command only starts the packages named `@pankod/refine` and `refine-use-select-example` in dev mode. The value of the flag `--scope` is the name that is defined in it's `package.json` file. Note that `--scope` flag should be used for every package that should be filtered.

Now all filtered packages are running in watch mode. They should re-compile when you make a change in any of them.

### Starting documentation in watch mode

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
[Lerna Bootstrap]: https://lerna.js.org/#command-bootstrap
[package.json]: https://github.com/pankod/refine/blob/master/package.json
[Docusaurus]: https://docusaurus.io/
[Issues]: https://github.com/pankod/refine/issues
[CODE_OF_CONDUCT]: https://github.com/pankod/refine/blob/master/CODE_OF_CONDUCT.md
[Discord Channel]: https://discord.gg/UuU3XCc3J5
[lerna.json]: https://github.com/pankod/refine/blob/master/lerna.json
