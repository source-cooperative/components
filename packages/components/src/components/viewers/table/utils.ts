import type { DSVRowArray } from 'd3-dsv'

export interface TruncatedData<Columns extends string = string> {
  /// Truncated data rows.
  rows: DSVRowArray<Columns>,
  /// Number of rows in the original data.
  originalLength: number;
}

interface TruncateArgs<Columns extends string = string> {
  rows: DSVRowArray<Columns>,
  maxNumRows: number,
  maxCellLength: number,
}
export function truncate({ rows, maxNumRows, maxCellLength }: TruncateArgs): TruncatedData {
  const originalLength = rows.length
  rows.splice(maxNumRows)
  const truncatedData = { rows, originalLength }
  /// Only show a preview of the data
  for (const row of rows) {
    for (const key in row) {
      /// Truncate cells that are too long
      row[key] = row[key].toString().slice(0, maxCellLength + 1)
      if (row[key].length === maxCellLength + 1) {
        row[key] = row[key].slice(0, maxCellLength) + '…'
      }
    }
  }
  return truncatedData
}

export function printNumRows(numRows: number): string {
  if (numRows <= 0) {
    return 'No rows'
  }
  if (numRows === 1) {
    return '1 row'
  }
  return numRows.toLocaleString('en-US') + ' rows'
}
