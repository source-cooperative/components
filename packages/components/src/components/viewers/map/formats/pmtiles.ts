import { PMTilesVectorSource } from 'ol-pmtiles'
import VectorTileLayer from 'ol/layer/VectorTile'
import { Style } from 'ol/style'
import { getFeatureColor } from '../utils'

interface PMTilesLayerArgs {
    url: string;
    style?: Style;
    onTileLoadError: () => void;
  }
export function getPMTilesLayer({ url, style, onTileLoadError }: PMTilesLayerArgs) {
  const source = new PMTilesVectorSource({
    url: url,
  })

  source.on('tileloaderror', onTileLoadError)

  return new VectorTileLayer({
    declutter: true,
    source: source,
    style: (feature) => {
      style?.getFill().setColor(getFeatureColor(feature) ?? null) // TODO(SL): move this code elsewhere
      return style
    },
  })
}
