---
id: contributing
title: Contributing
---

We follow a [code of conduct][CODE_OF_CONDUCT] when participating in community. Please read it before you make contributions.

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

One caveat here, since examples aren't [Lerna][Lerna] packages, if you want to run one of them, you should delete the `package-lock.json` and run `npm install` in the example's directory you work on:

```bash
cd examples/base
rm -rf package-lock.json
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

[Lerna]: https://github.com/lerna/lerna
[Docusaurus]: https://docusaurus.io/
[Issues]: https://github.com/pankod/refine/issues
[CODE_OF_CONDUCT]: https://github.com/pankod/refine/CODE_OF_CONDUCT.md
[Discord Channel]: https://discord.gg/fRhtCgPA
