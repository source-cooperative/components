# Source Cooperative Monorepo

This is a monorepo for the Source Cooperative project. It contains the following packages and apps:

- `@source-cooperative/cli`: A command-line interface for administrating the Source Cooperative database. The code is in the [`packages/cli`](./packages/cli) directory.
- `@source-cooperative/components`: A collection of reusable React components. The code is in the [`packages/components`](./packages/components) directory. It require React and Next.js, since some use Next.js (`next/link`, `next/router`).
- `@source-cooperative/components-demo`: A demo app for the components. The code is in the [`apps/components-demo`](./apps/components-demo) directory.
- `@source-cooperative/viewers`: The https://viewers.source.coop webapp. It aims at exploring large remote files in the browser. The code is in the [`apps/viewers`](./apps/viewers) directory.

## Creating or improving a component

For more information on how to contribute to this project, see the [contribution guide](CONTRIBUTING.md).

<<<<<<< HEAD
## Monorepo
=======
Ensure the AWS CLI is configured (even if the values don't matter) by running, e.g.:
>>>>>>> 82d107e (New footer (#51))

The monorepo is managed with [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces). It contains three workspaces: `@source-cooperative/components`, and two other that depend on it: `@source-cooperative/components-demo` and `@source-cooperative/viewers` .

### Install

To install:

```sh
npm install
```

### Build

To build the workspaces:

```sh
npm run build -ws
```

To build only one workspace, launch one of the following commands:

```sh
npm run build -w @source-cooperative/components
npm run build -w @source-cooperative/components-demo
npm run build -w @source-cooperative/viewers
```

Note that using `-w` or `-ws` must be done from the root of the monorepo. Alternatively, you can use `npm run build` from the workspace directory, eg:

```sh
cd packages/components
npm i
npm run build
```

### Run

To run the demo locally:

```sh
npm run dev -w @source-cooperative/components-demo
```

To run the viewer app locally:

```sh
npm run dev -w @source-cooperative/viewers
```

To run the `sc` command-line interface:

```sh
npx sc
```