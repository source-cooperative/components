import { FileProps, ViewerMetadata } from '../types'
import { MapViewer } from './viewer'

export const map: ViewerMetadata = {
  title: 'Map Viewer',
  description: 'A map viewer.',
  compatibilityCheck: (props: FileProps) => {
    if (props.filename.toLowerCase().endsWith('.pmtiles')) {
      return true
    }

    if (props.filename.toLowerCase().endsWith('.geojson')) {
      return true
    }

    return false
  },
  viewer: MapViewer,
}
