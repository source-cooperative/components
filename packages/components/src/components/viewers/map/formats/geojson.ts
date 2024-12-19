import GeoJSON from 'ol/format/GeoJSON.js'
import VectorLayer from 'ol/layer/Vector.js'
import VectorSource from 'ol/source/Vector'
import { Style } from 'ol/style'

interface GeoJSONLayerArgs {
    url: string;
    style?: Style;
    onFeaturesLoadError: () => void;
    onFeaturesLoadStart: () => void;
    onFeaturesLoadEnd: (source: VectorSource) => void;
  }
export function getGeoJSONLayer({ url, style, onFeaturesLoadError, onFeaturesLoadStart, onFeaturesLoadEnd }: GeoJSONLayerArgs) {
  const source = new VectorSource({
    url: url,
    format: new GeoJSON(),
  })

  source.on('featuresloadstart', onFeaturesLoadStart)
  source.on('featuresloadend', () => { onFeaturesLoadEnd(source) })
  source.on('featuresloaderror', onFeaturesLoadError)

  return new VectorLayer({
    declutter: true,
    source: source,
    style,
  })
}
