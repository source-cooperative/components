# Overture - Fused-partitioned

## Overview

This is the Overture 2024-11-13.0 dataset, geo-partitioned with Fused for convenient access. This dataset adheres to the [Overture Data Schema](https://docs.overturemaps.org/).

<img src="https://data.source.coop/fused/overture/docs/banner.png" alt="Banner image showing London, UK" width="100%"/>

## Quickstart

Access to this dataset is facilitated by the [Fused](https://www.fused.io/) platform. The [Overture Maps Example](https://github.com/fusedio/udfs/tree/main/public/Overture_Maps_Example) UDF shows an example of how to access the data using Fused: 

```python
import fused

udf = fused.load(
    "https://github.com/fusedio/udfs/tree/bdb541b/public/Overture_Maps_Example"
)

gdf = fused.run(udf, x=2622, y=6333, z=14)
gdf.plot()
```

You can query the data visually using our [notebook](https://github.com/fusedio/notebooks/blob/main/public/overture.ipynb). 

<a target="_blank" href="https://colab.research.google.com/github/fusedio/notebooks/blob/main/public/overture.ipynb">
<img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

## Partitioning

This dataset is geospatially partitioned following Open GeoParquet standards, using Fused.

For technical reasons, the release is named `2024-11-13-0` in S3 (note the dash instead of a period at the end).

Under each release, the data is divided into themes: [admins](https://docs.overturemaps.org/themes/admins/), [base](https://docs.overturemaps.org/themes/base/), [buildings](https://docs.overturemaps.org/themes/buildings/building), [places](https://docs.overturemaps.org/themes/places/place), and [transportation](https://docs.overturemaps.org/themes/transportation/). Each theme contains one or more tables, which is a collection of GeoParquet files (`0.parquet`, `1.parquet`, etc.), Parquet metadata (`_metadata`), and Parquet sample (`_sample`).

The older release, 2024-03-12-alpha-0, has the following themes:

- `theme=admins/type=administrative_boundary/` - Administrative boundaries such as country borders
- `theme=base/type=land_use/` - Land use
- `theme=base/type=water/` - Water boundaries
- `theme=buildings/type=building/` - Building footprints. Because of the size of this table, it is further subdivided into multiple parts. There is no semantic meaning to these parts, they are subdivisions to help partitioning.
    - `theme=buildings/type=building/part=0/`
    - `theme=buildings/type=building/part=1/`
    - `theme=buildings/type=building/part=2/`
    - `theme=buildings/type=building/part=3/`
    - `theme=buildings/type=building/part=4/`
- `theme=places/type=place/` - Places (POIs) such as restaurants and other businesses.
- `theme=transportation/type=connector/` - Points where transportation segments, below, are connected.
- `theme=transportation/type=segment/` - Line strings of how human movement is organized, such as roads and walkways.

There are older releases, 2024-03-12-alpha-0 and 2024-02-15-alpha-0 that have slightly different folder structures, where types are named in camel-case. (E.g. administrativeBoundary, landUse.)

## Original dataset

The original Overture datasets are downloadable from the [Overture website](https://overturemaps.org/download/). See the Overture [GitHub repo](https://github.com/OvertureMaps/data) for more information.
