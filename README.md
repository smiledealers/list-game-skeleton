# List Game Skeleton

## Getting Started

To get started quickly run

```sh
$ npx degit smiledealers/list-game-skeleton my-list-game
```

or

```sh
$ yarn global add degit
$ degit smiledealers/list-game-skeleton my-list-game
```

then run

```sh
$ yarn install
$ yarn dev
```

## Development

Create a new private repo to develop in.

Your game is loaded from `src/pages/play.js`, it is loaded asynchronously, you
can provide a custom loader in `src/components/list_game/interface.js`,
or remove the lazy loading, and load a game shell that has a loader.

This skeleton loads `src/components/game.js` with an empty canvas, you can use
this as a starting point, or replace it entirely.

Your game is provided the following interface as React props from `src/components/list_game/interface.js`

```ts
ListGameProps {
  entered: Boolean,
  entryValues?: Array<OptionSetEntry>,
  optionSets: Array<OptionSet>,
  submit: Function(Array<OptionSetEntry>),
  submitting: Boolean,
  submitError: Boolean,
  wrapperElement: Ref
}
```

```ts
Option {
  id: String,
  title: String
}
```

```ts
OptionSet {
  id: String,
  options: Array<Option>
}
```

```ts
OptionSetEntry {
  optionSetId: String,
  optionId: String
}
```

## Delivery

You can either add a Smile Dealers team member to your repository if any
feedback or clarification is needed.

Otherwise ZIP up your direcotry without the dist/ or node\_modules/ directories
(make sure all dependencies for your code are in `package.json` and `yarn.lock`)
and send it to us.
