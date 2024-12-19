// Import your viewer and add it to the viewers object below with a unique ID

import { map } from './map'
// import { markdown } from './markdown'
// import { viewerMetadata as table } from './table'
import { text } from './text'

export const viewers = {
  // markdown,
  text,
  map,
  // table,
} as const
export type ViewerId = keyof typeof viewers
