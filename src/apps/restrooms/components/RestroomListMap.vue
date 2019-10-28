<template>
  <v-card>
    <div id="map"></div>
  </v-card>
</template>

<script>
import Map from '@/core/models/map';

export default {
  name: 'restroom-list-map',
  props: {
    data: {
      type: undefined,
    },
    userCoords: {
      type: undefined,
    },
    mapCenter: {
      type: undefined,
    },
  },
  data() {
    return {
      map: null,
      userLocationPoint: null,
    };
  },
  mounted() {
    this.initMap();
  },
  watch: {
    userCoords(value) {
      if (this.userLocationPoint) {
        this.map.removeLayer(this.userLocationPoint);
      }
      this.map.setView(value, 13);
      this.userLocationPoint = L.circle(value).addTo(this.map);
    },
    mapCenter(value) {
      this.map.setView(value, 18);
    },
    data(value) {
      this.map.drawPoints(value);
      const point = value.features[5].geometry.coordinates;
      const bounds = [this.userCoords, point.reverse()];
      this.map.fitZoom(bounds);
    },
  },
  methods: {
    initMap() {
      this.$nextTick(() => {
        this.map = new Map('map', { zoomControl: false });
      });
    },
  },
};
</script>

<style>
#map {
  height: 90vh;
}
</style>
