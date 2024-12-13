# Source Cooperative React Components

This repository contains a collection of reusable React components. They require React and Next.js, since some use Next.js (`next/link`, `next/router`).

## Components

See https://github.com/source-cooperative/viewers.source.coop/ for an example of how to use these components.

The code for the reusable components is in the [`packages/components`](./packages/components) directory.

## Demo

See the demo at https://source-cooperative.github.io/components/.

The code for the demo is in the [`apps/demo`](./apps/components) directory.

## Monorepo

This is a monorepo managed with [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces). It contains two workspaces: `components`, and `components-demo` which depends on `components`.

To install:

```sh
npm install
```

To build the workspaces:

```sh
npm run build
```

To run the demo:

```sh
npm run dev -w components-demo
```
