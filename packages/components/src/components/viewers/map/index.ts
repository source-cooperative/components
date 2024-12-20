import { FileProps, ViewerMetadata } from '../types'
import { MapViewer } from './viewer'

export const map: ViewerMetadata = {
  title: 'Map Viewer',
  description: 'A map viewer.',
  compatibilityCheck: (props: FileProps) => {
    return ['.pmtiles', '.geojson'].some((key) => props.filename.toLowerCase().endsWith(key) )
  },
  viewer: MapViewer,
}
