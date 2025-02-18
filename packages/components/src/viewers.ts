import map from './map/metadata'
import markdown from './markdown/metadata'
import table from './table/metadata'
import text from './text/metadata'

export const viewers = { markdown, text, map, table } as const
export const viewerIds = Object.keys(viewers) as ViewerId[]
export type ViewerId = keyof typeof viewers
