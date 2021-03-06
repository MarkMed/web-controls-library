import { EventEmitter } from "@stencil/core";

export interface IGridBase {
  el: HTMLElement;

  /**
   * This attribute lets you specify how this element will behave when hidden.
   *
   * | Value        | Details                                                                     |
   * | ------------ | --------------------------------------------------------------------------- |
   * | `keep-space` | The element remains in the document flow, and it does occupy space.         |
   * | `collapse`   | The element is removed form the document flow, and it doesn't occupy space. |
   */
  invisibleMode: "collapse" | "keep-space";

  /**
   * Grid loading State. It's purpose is to know rather the Grid Loading animation or the Grid Empty placeholder should be shown.
   *
   * | Value        | Details                                                                                        |
   * | ------------ | ---------------------------------------------------------------------------------------------- |
   * | `loading` | The grid is waiting the server for the grid data. Grid loading mask will be shown.                |
   * | `loaded`   | The grid data has been loaded. If the grid has no records, the empty place holder will be shown. |
   */
  loadingState: "loading" | "loaded";

  /**
   * This Handler will be called every time grid threshold is reached. Needed for infinite scrolling grids.
   */
  gxInfiniteThresholdReached: EventEmitter<void>;

  /**
   * Grid current row count. This property is used in order to be able to re-render the Grid every time the Grid data changes.
   * If not specified, then grid empty and loading placeholders will not work correctly.
   */
  recordCount: number;
}

export class GridBaseHelper {
  static hostData(cmp: IGridBase) {
    const emptyGridData = cmp.recordCount === 0;
    return {
      class: {
        "gx-grid-base": true,
        "gx-grid-empty": emptyGridData,
        "gx-grid-loading": cmp.loadingState === "loading"
      }
    };
  }
}
