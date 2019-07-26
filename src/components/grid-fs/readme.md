# gx-grid-fs

Container to include repetitive element list. 
It provides two slots:
- 'grid-content' slot: Include the grid content here
- 'grid-content-empty' slot: This slot will be shown, only if the grid is empty. 

When grid is empty, a CSS Class name 'gx-grid-empty' is added to the host element. 
When grid is loading, a CSS Class name 'gx-grid-loading' is added to the host element. 
<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Type                         | Default      |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------ |
| `invisibleMode` | `invisible-mode` | This attribute lets you specify how this element will behave when hidden.  \| Value        \| Details                                                                     \| \| ------------ \| --------------------------------------------------------------------------- \| \| `keep-space` \| The element remains in the document flow, and it does occupy space.         \| \| `collapse`   \| The element is removed form the document flow, and it doesn't occupy space. \|                                                                                                                                | `"collapse" \| "keep-space"` | `"collapse"` |
| `loadingState`  | `loading-state`  | Grid loading State. It's purpose is to know rather the Grid Loading animation or the Grid Empty placeholder should be shown.  \| Value        \| Details                                                                                        \| \| ------------ \| ---------------------------------------------------------------------------------------------- \| \| `loading` \| The grid is waiting the server for the grid data. Grid loading mask will be shown.                \| \| `loaded`   \| The grid data has been loaded. If the grid has no records, the empty place holder will be shown. \| | `"loaded" \| "loading"`      | `undefined`  |
| `recordCount`   | `record-count`   | Grid current row count. This property is used in order to be able to re-render the Grid every time the Grid data changes. If not specified, then grid empty and loading placeholders will not work correctly.                                                                                                                                                                                                                                                                                                                                                                                                     | `number`                     | `undefined`  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*