### Downloading OpenStreetMap data

Use [Overpass Turbo](http://overpass-turbo.eu/), an interface for the OpenStreetMap database.
You can run queries using [Overpass QL](https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL)
and export results in `.geojson` format.

The following query was used to create `map-sources/africa.json`:
```
area["ISO3166-1"~"GA|NG|CM|CG|CD|GQ"]->.a;
(
  nwr(area.a)[boundary=administrative][admin_level=2];
  nwr(area.a)[boundary=national_park];
  nwr(area.a)[boundary=protected_area];
);
out geom;
```

### DEPRECATED: old instructions

Install requirements:

```
npm install -g osmtogeojson
npm install -g @mapbox/geojson-merge
```

1. Go to http://overpass-turbo.eu/ - interface for downloading data from Open Street Maps
2. Paste query [1]. Select bbox for each area you want included in detail. Run the query, then go to "Export" and download raw OSM data.
3. Paste query [2]. Select area inside Gabon to have all Gabon boundaries downloaded. Download raw OSM data.
4. Convert each of these to geojson with `osmtogeojson -m export.json > [area_name].json`
5. Combine geojsons using `geojson-merge export_*.json > gabon_parks_map.json`
6. To include new features in queries, use https://wiki.openstreetmap.org/wiki/Map_Features

https://help.openstreetmap.org/questions/19063/get-city-nodes-within-a-country-using-overpass-api
https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example#The_Taginfo_Example
https://wiki.openstreetmap.org/wiki/Node

#### Overpass - Query 1

This query gets all details that we care about from a selected bounding box.

```
[out:json][timeout:25][bbox:{{bbox}}];
(
  way["natural"];
  relation["natural"];
  way["waterway"];
  relation["waterway"];
  way["place"];
  relation["place"];
  way["land_use"];
  relation["land_use"];
  way["boundary"="protected_area"]["protected_area"];
  relation["boundary"="protected_area"]["protected_area"];
  way["boundary"="national_park"];
  relation["boundary"="national_park"];
);
out body;
>;
out skel qt;
```

Approximate bboxes for reference

```
10.8847,-1.1425,12.0053,0.0673 // Lope
13.7563,-2.5260,14.3152,-1.8673 // Bateke
10.9341,-1.5448,11.2665,-1.0890 // Waka
9.3205,-2.4794,9.9179,-1.8756    // Loango
```

#### Overpass - Query 2

This query gets just the basic administrative borders, so can be used on entire country.

```
[out:json][timeout:25][bbox:{{bbox}}];
// gather results
(
  relation["boundary"="administrative"]
    ["admin_level"="2"];

);
// print results
out body;
>;
out skel qt;
```
