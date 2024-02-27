# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Node/Yarn version

Before start the installation, check if your node/yarn versions are the recommended ones for this project:

##

```console
  "engines": {
    "node": ">=18",
    "yarn": ">=1.0.0"
  }
```

If you need to use different versions of node you can use a node version manager like [NVM](https://github.com/nvm-sh/nvm).

## Installation

```console
yarn install
```

## Local Development

```console
yarn dev
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
