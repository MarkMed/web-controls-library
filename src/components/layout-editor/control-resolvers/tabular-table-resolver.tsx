import controlResolver from "../layout-editor-control-resolver";

export default function tabularTableResolver({ table }, context) {
  const modelRows = Array.isArray(table.row) ? table.row : [table.row];
  const nonEmptyRows = modelRows.filter(
    r => (Array.isArray(r.cell) && r.cell.length) || r.cell
  );
  const maxCols = nonEmptyRows.reduce(
    (acc, row) => Math.max(acc, Array.isArray(row.cell) ? row.cell.length : 1),
    0
  );
  let rowsCount = 0;
  const rows = nonEmptyRows.map((row, i) => {
    rowsCount++;
    const rowCells = Array.isArray(row.cell) ? row.cell : [row.cell];

    let colStart = 0;
    const renderedCells = rowCells.map(cell => {
      colStart += parseInt(cell["@colSpan"], 10);
      return renderCell(cell, row["@id"], i, colStart, context);
    });

    return renderedCells;
  });

  return (
    <gx-table {...getTableStyle(rowsCount, maxCols)} data-gx-le-container>
      {[...rows, ...renderEmptyRows(nonEmptyRows, maxCols)]}
    </gx-table>
  );
}

function getTableStyle(rowsCount, colsCount) {
  const baseRowsTemplate = new Array(rowsCount).fill("1fr", 0, rowsCount);
  const baseColsTemplate = new Array(colsCount).fill("1fr", 0, colsCount);

  return {
    "columns-template": baseColsTemplate.join(" "),
    "rows-template": intercalateArray(
      baseRowsTemplate,
      "var(--gx-le-table-placeholder-height)"
    ).join(" ")
  };
}

function renderEmptyRows(nonEmptyRows, maxCols) {
  const emptyRowFn = (i, nextRow) => {
    const emptyCellStyle = {
      gridColumn: `1 / span ${maxCols}`,
      gridRow: `${i * 2 + 1} / span 1`
    };
    return (
      <gx-layout-editor-placeholder
        data-gx-le-placeholder="row"
        style={emptyCellStyle}
        data-gx-le-next-row-id={nextRow ? nextRow["@id"] : ""}
      />
    );
  };

  return [
    emptyRowFn(0, nonEmptyRows[0]),
    nonEmptyRows.map((...parms) => {
      const [, i] = parms;
      return emptyRowFn(
        i + 1,
        nonEmptyRows.length > i ? nonEmptyRows[i + 1] : null
      );
    })
  ];
}

function renderCell(cell, rowId, rowIndex, colStart, context) {
  const rowSpan = (parseInt(cell["@rowSpan"], 10) - 1) * 2 + 1;
  const colSpan = cell["@colSpan"];
  const rowStart = (rowIndex + 1) * 2;

  return (
    <gx-table-cell
      data-gx-le-cell-id={cell["@id"]}
      data-gx-le-drop-area
      data-gx-le-row-id={rowId}
      style={{
        gridColumn: `${colStart} / span ${colSpan}`,
        gridRow: ` ${rowStart} / span ${rowSpan}`
      }}
      data-gx-le-selected={context.selectedControlId === cell["@id"]}
    >
      {controlResolver(cell, context)}
    </gx-table-cell>
  );
}

function intercalateArray(arr, item) {
  return arr.reduce((acc, o) => (o ? acc.concat(o, item) : acc), [item]);
}
