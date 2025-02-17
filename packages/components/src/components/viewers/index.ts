import { map } from './map'
import { markdown } from './markdown'
import { table } from './table'
import { text } from './text'
export { map } from './map'
export { MapViewer } from './map/viewer'
export { markdown } from './markdown'
export { MarkdownViewer } from './markdown/viewer'
export { table } from './table'
export { TableViewer } from './table/viewer'
export { text } from './text'
export { TextViewer } from './text/viewer'
export const viewers = { markdown, text, map, table } as const
export const viewerIds = Object.keys(viewers) as ViewerId[]
export type ViewerId = keyof typeof viewers
