import { FeatureLike } from 'ol/Feature'

export function getFeatureColor(feature: FeatureLike): string | undefined {
  /// TODO(SL): is it a convention to store a color in field 'COLOR'?
  /// Also: should we support gradient? see ColorLike
  return 'COLOR' in feature && typeof feature.COLOR === 'string' ? feature.COLOR : undefined
}

export function parseColor(color: unknown): string | undefined {
  return typeof color === 'string' ? color : undefined
}
