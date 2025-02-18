import { PMTilesVectorSource } from 'ol-pmtiles'
import Map from 'ol/Map.js'
import MapBrowserEvent from 'ol/MapBrowserEvent.js'
import Overlay from 'ol/Overlay.js'
import View from 'ol/View'
import VectorTileLayer from 'ol/layer/VectorTile'
import { Pixel } from 'ol/pixel'
import { useGeographic } from 'ol/proj'
import type VectorSource from 'ol/source/Vector'
import { Fill, Stroke, Style } from 'ol/style'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Flex, Text, useThemeUI } from 'theme-ui'
import { SxProp, cn } from '../sx'
import { FileProps } from '../types'
import { getLayer } from './formats'
import { getFeatureColor, parseColor } from './utils'

export default function MapViewer(props: FileProps & SxProp) {
  const { url, filename, sx, css, className } = props
  const { theme: { rawColors } } = useThemeUI()

  const mapElement = useRef()
  const popupRef = useRef()
  const [map, setMap] = useState<Map | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<Record<string, unknown> | undefined>(undefined)
  useGeographic()

  useEffect(() => {
    // Code here runs after the component has mounted
    const overlay = new Overlay({
      element: popupRef.current,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    })
    const newMap = new Map({
      target: mapElement.current,
      controls: [],
      layers: [
        /// empty layers for now
      ],
      overlays: [overlay],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    })
    setMap(newMap)
    return () => { newMap.setTarget() }
  }, [])

  useEffect(() => {
    if (!map) {
      return
    }
    const basemapStyle = new Style({
      stroke: new Stroke({
        color: parseColor(rawColors?.highlight),
        width: 1,
      }),
      fill: new Fill({
        color: parseColor(rawColors?.primary),
      }),
    })

    const baseLayer = new VectorTileLayer({
      source: new PMTilesVectorSource({
        url: 'https://r2-public.protomaps.com/protomaps-sample-datasets/protomaps-basemap-opensource-20230408.pmtiles',
      }),
      style: (feature) => {
        basemapStyle.getFill()?.setColor(getFeatureColor(feature) ?? parseColor(rawColors?.background) ?? null)
        return basemapStyle
      },
    })
    map.getLayers().insertAt(0, baseLayer) // insert at the bottom
    return () => { map.removeLayer(baseLayer) }
  }, [map, rawColors])

  useEffect(() => {
    if (!map ) {
      return
    }
    const style = new Style({
      stroke: new Stroke({
        color: parseColor(rawColors?.primary) ?? 'gray',
        width: 1,
      }),
      fill: new Fill({
        color: parseColor(rawColors?.primary) ?? 'rgba(20,20,20,0.9)',
      }),
    })
    const layer = getLayer({
      url,
      filename,
      style,
      onError: () => { setError(true) },
      onLoadStart: () => { setLoading(true) },
      onLoadEnd: (source: VectorSource) => {
        setLoading(false)
        map.getView().fit(source.getExtent())
      },
    })
    if (!layer) {
      return
    }
    const getFeatureInfo = async function(pixel: Pixel) {
      const features = await layer.getFeatures(pixel)
      setSelectedFeature(features.length > 0 ?
        { ...features[0].getProperties(), 'COLOR': parseColor(rawColors?.highlight) } :
        undefined,
      )
    }
    const onClick = async function(event: MapBrowserEvent<UIEvent>) {
      const { coordinate, pixel } = event
      const overlays = map.getOverlays()
      await getFeatureInfo(pixel)
      if (overlays.getLength() > 0) {
        overlays.item(0).setPosition(coordinate)
      }
    }

    map.addLayer(layer)
    map.on('click', onClick)
    return () => {
      map.un('click', onClick)
      map.removeLayer(layer)
    }
  }, [map, filename, url, rawColors])

  const zoom = useMemo(() => {
    function changeZoom(increment: number) {
      const view = map?.getView()
      const zoom = view?.getZoom()
      if (!view || zoom === undefined) {
        return
      }
      view.setZoom(zoom + increment)
    }
    return {
      increment: () => { changeZoom(1) },
      decrement: () => { changeZoom(-1) },
    }
  }, [map])

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '50vh',
          position: 'relative',
          p: 1,
          backgroundColor: 'primary',
          ...sx,
        }}
        css={css}
        ref={mapElement}
        className={cn('map-container', className)}
      >
        <Box sx={{ position: 'absolute', zIndex: 998, top: 2, left: 2 }}>
          <Box
            ref={popupRef}
            sx={{
              backgroundColor: 'background',
              color: 'text',
              fontFamily: 'mono',
              fontSize: 0,
              padding: 1,
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'primary',
            }}
          >
            {selectedFeature && Object.entries(selectedFeature).map(([k, v], i) => {
              return (
                <Box key={`prop-${i}`}>{k}:{`${v}`}</Box>
              )
            })
            }
          </Box>
          <Flex sx={{ flexDirection: 'column', gap: 1 }}>
            <Flex
              sx={{
                backgroundColor: 'background',
                fontFamily: 'mono',
                color: 'text',
                fontSize: 3,
                textAlign: 'center',
                cursor: 'pointer',
                width: '25px',
                height: '25px',
                userSelect: 'none',
                borderColor: 'text',
                borderWidth: 4,
                borderStyle: 'solid',
                justifyContent: 'center',
                alignItems: 'last baseline',
              }}
              onClick={zoom.increment}
            >
              <Text>+</Text>
            </Flex>
            <Flex
              sx={{
                backgroundColor: 'background',
                fontFamily: 'mono',
                color: 'text',
                fontSize: 3,
                textAlign: 'center',
                cursor: 'pointer',
                width: '25px',
                height: '25px',
                userSelect: 'none',
                borderColor: 'text',
                borderWidth: 4,
                borderStyle: 'solid',
                justifyContent: 'center',
                alignItems: 'end',
              }}
              onClick={zoom.decrement}
            >
              <Text>-</Text>
            </Flex>
          </Flex>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            opacity: '0.8',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            left: 1,
            right: 1,
            top: 1,
            bottom: 1,
            backgroundColor: 'background',
            display: loading || error ? 'flex' : 'none',
          }}
        >
          <Text
            sx={{
              fontFamily: 'mono',
              fontSize: 5,
              clipPath: !error ? 'inset(0 3ch 0 0)' : null,
              animation: !error ? 'l 1.5s steps(4) infinite' : null,
            }}
          >
            {error ? 'Error Loading File' : 'Loading...'}
          </Text>
        </Box>
      </Box>
    </>
  )
}
