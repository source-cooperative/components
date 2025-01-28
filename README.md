# Source Cooperative React Components

This repository contains a collection of reusable React components. They require React and Next.js, since some use Next.js (`next/link`, `next/router`).

## Components

See https://github.com/source-cooperative/viewers.source.coop/ for an example of how to use these components.

The code for the reusable components is in the [`packages/components`](./packages/components) directory.

## Creating or improving a component

For more information on how to contribute to this project, see the [contribution guide](CONTRIBUTING.md).

## Demo

See the demo at https://source-cooperative.github.io/components/.

The code for the demo is in the [`apps/components-demo`](./apps/components-demo) directory.

## viewers.source.coop

See the webapp at https://viewers.source.coop.

The code is in the [`apps/viewers`](./apps/viewers) directory.

## Monorepo

This is a monorepo managed with [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces). It contains three workspaces: `@source-cooperative/components`, and two other that depend on it: `@source-cooperative/components-demo` and `@source-cooperative/viewers` .

To install:

```sh
npm install
```

To build the workspaces:

```sh
npm run build -ws
```

To build only the components:

```sh
npm run build -w @source-cooperative/components
```

To run the demo locally:

```sh
npm run dev -w @source-cooperative/components-demo
```

To run the viewer app locally:

```sh
npm run dev -w @source-cooperative/viewers
```
