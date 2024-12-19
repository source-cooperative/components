import type VectorSource from 'ol/source/Vector'
import type { Style } from 'ol/style'
import { getGeoJSONLayer } from './geojson'
import { getPMTilesLayer } from './pmtiles'

interface LayerProps {
  url: string
  filename: string
  style?: Style
  onError: () => void
  onLoadStart: () => void
  onLoadEnd: (source: VectorSource) => void
}
export function getLayer({
  url,
  filename,
  style,
  onError,
  onLoadStart,
  onLoadEnd,
}: LayerProps) {
  const lower = filename.toLowerCase()

  if (lower.endsWith('.pmtiles')) {
    return getPMTilesLayer({
      url,
      style,
      onTileLoadError: () => { onError() } })
  }
  if (lower.endsWith('.geojson')) {
    return getGeoJSONLayer({
      url,
      style,
      onFeaturesLoadError: () => { onError()},
      onFeaturesLoadStart: () => { onLoadStart() },
      onFeaturesLoadEnd: (source) => { onLoadEnd(source) },
    })
  }
}
