<template>
  <div id="mapChart"></div>
</template>

<script>
import * as mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import axios from "axios";
export default {
  name: "MapChart",
  data() {
    return {
      loading: true,
      chinaData: null,
      emotionData: null,
    };
  },
  create() {},
  mounted() {
    this.map = "";
    this.mapInit(this);
    this.mapLoadGeojson(this);
    this.mapInterctionSetting(this);
  },
  computed: {

  },
  watch: {
      
  },
  methods: {
    mapInit(that) {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoid2pzMjIyIiwiYSI6ImNreGVkYnBlbDBtMnoyb3BlM2Jib3dxcDAifQ.GKErleh4uNcXyGpxdQa-og";
      let hoveredStateId = null;
      that.map = new mapboxgl.Map({
        container: "mapChart",
        style: "mapbox://style/mapbox/light-v10",
        center: [104.946465, 35.347269],
        zoom: 3,
      });
      that.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans",
        })
      );
    },
    mapLoadGeojson(that) {
      this.map.on("load", function () {
        axios
          .get("http://localhost:3000/china")
          .then((response) => {
            that.chinadata = response.data;
            that.mapAddChinaSilhouette(that.chinadata);
          })
          .catch((error) => {
            that.loading = false;
          });
        axios
          .get("http://localhost:3000/location")
          .then((response) => {
            that.emotionData = response.data;
            that.mapAddHeatMap(that.emotionData);
          })
          .catch((error) => {
            that.loading = false;
          });
      });
    },
    mapAddChinaSilhouette(features) {
      this.map.addSource("china", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: features.features,
        },
      });
      this.map.addLayer({
        id: "china-fills",
        type: "fill",
        source: "china",
        layout: {},
        paint: {
          "fill-color": "#627BC1",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.5,
            0,
          ],
        },
      });
      this.map.addLayer({
        id: "state-borders",
        type: "line",
        source: "china",
        layout: {},
        paint: {
          "line-color": "#627BC1",
          "line-width": 2,
        },
      });
    },
    mapAddHeatMap(features) {
      this.map.addSource("xi", {
        type: "geojson",
        data: features[0],
      });
      this.map.addSource("ai", {
        type: "geojson",
        data: features[1],
      });
      this.map.addSource("si", {
        type: "geojson",
        data: features[2],
      });
      this.map.addLayer(
        {
          id: "xi-heat",
          type: "heatmap",
          source: "xi",
          maxzoom: 9,
          layout: {
            visibility: "visible",
          },
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0,
              0,
              6,
              1,
            ],
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              1,
              "rgb(178,24,43)",
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              4,
              1,
              9,
              0,
            ],
          },
        },
        "waterway-label"
      );
      this.map.addLayer(
        {
          id: "ai-heat",
          type: "heatmap",
          source: "ai",
          maxzoom: 9,
          layout: {
            visibility: "visible",
          },
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0,
              0,
              6,
              1,
            ],
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              1,
              "rgb(13,79,213)",
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              4,
              1,
              9,
              0,
            ],
          },
        },
        "waterway-label"
      );
      this.map.addLayer(
        {
          id: "si-heat",
          type: "heatmap",
          source: "si",
          maxzoom: 9,
          layout: {
            visibility: "visible",
          },
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0,
              0,
              6,
              1,
            ],
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0,0,0,0)",
              1,
              "rgb(253,249,4)",
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              4,
              1,
              9,
              0,
            ],
          },
        },
        "waterway-label"
      );
    },
    mapInterctionSetting(that) {
      
    },
  },
};
</script>

<style>
#mapChart {
  height: 100%;
  width: 100%;
}
.mapboxgl-control-container {
  visibility: hidden;
}
</style>