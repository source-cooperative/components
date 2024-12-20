declare module 'ol-pmtiles' {
  import DataTile, { Options as DataTileOptions } from 'ol/source/DataTile.js'
  declare class PMTilesRasterSource extends DataTile {
    constructor(options: DataTileOptions & { url: string, headers?: HeadersInit }): PMTilesRasterSource
  }

  import VectorTile, { Options as VectorTileOptions } from 'ol/source/VectorTile.js'
  export class PMTilesVectorSource extends VectorTile {
    constructor(options: VectorTileOptions & { url: string, headers?: HeadersInit }): PMTilesVectorSource
  }
}
