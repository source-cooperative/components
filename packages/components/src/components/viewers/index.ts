import { map } from './map'
import { markdown } from './markdown'
import { table } from './table'
import { text } from './text'
export const viewers = { markdown, text, map, table } as const
export const viewerIds = Object.keys(viewers) as ViewerId[]
export type ViewerId = keyof typeof viewers
