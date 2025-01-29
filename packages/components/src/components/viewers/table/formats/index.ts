import type { DSVRowArray } from 'd3-dsv'
import { csv, tsv } from 'd3-fetch'
import { FileProps } from '../../types'

export async function fetchRows({
  url,
  filename,
}: FileProps): Promise<DSVRowArray> {
  // TODO(SL): stream the first rows instead of downloading the whole CSV (https://observablehq.com/@mbostock/streaming-csv)
  const lower = filename.toLowerCase()
  if (lower.endsWith('.csv')) {
    return await csv(url)
  }
  if (lower.endsWith('.tsv')) {
    return await tsv(url)
  }
  throw new Error('Unsupported file format.')
}
