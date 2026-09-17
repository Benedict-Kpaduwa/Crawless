# Crawless

A desktop workflow editor for building and running web crawlers, built with Electron and React.

Crawless gives you a code-editor-style workspace — write a crawler's logic in a Monaco/CodeMirror-based editor, run it, and preview the result in an embedded browser panel, all without leaving the app.

## Tech stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) for the UI
- [Electron](https://www.electronjs.org/) for the desktop shell
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [CodeMirror 6](https://codemirror.net/) for the code editor
- [pnpm](https://pnpm.io/) as the package manager

## Features

- **Home** — a dashboard overview of your crawlers and stats
- **Projects** — browse and open crawler workflows, each in its own editor tab
- **Editor** — write crawler code with syntax highlighting and a live browser preview
- Store, Documentation, and Settings screens (in progress)

## Getting started

```bash
pnpm install
```

Run the app in the browser only (no Electron shell):

```bash
pnpm dev
```

Run the full desktop app (Vite dev server + Electron window):

```bash
pnpm electron
```

## Building

Build the web assets:

```bash
pnpm build
```

Package the desktop app for distribution:

```bash
pnpm electron:build
```
