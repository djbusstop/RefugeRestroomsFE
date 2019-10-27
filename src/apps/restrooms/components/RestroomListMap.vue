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
  },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  watch: {
    userCoords(value) {
      if (value) {
        this.map.setView(value, 14);
      }
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
