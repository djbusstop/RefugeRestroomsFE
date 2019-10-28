<template>
  <v-container>
    <v-row>
      <!-- Left col -->
      <v-col
        cols="6"
      >
        <v-alert
          v-if="loading"
          color="primary lighten-2"
          dark
        >
          <v-progress-circular
            :indeterminate="loading"
          />
          <span class="ml-6"> Results Loading...</span>
        </v-alert>

        <!-- List of cards -->
        <restroom-list-card
          v-for="restroom in restrooms"
          @hover="handleHover"
          :restroom="restroom"
          :key="restroom.id"
        />

      </v-col>
      <!-- Map col -->
      <v-col
        cols="6"
      >
        <restroom-list-map
          :userCoords="userCoords"
          :mapCenter="mapCenter"
          :data="mapData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { OPENCAGE_API_KEY } from '../../../constants';
import Restroom from '../models/restroom';
import RestroomListCard from '../components/RestroomListCard.vue';
import RestroomListMap from '../components/RestroomListMap.vue';
import WebApi from '../webapi';

export default {
  name: 'restroouserLocationPointm-list',
  components: {
    RestroomListCard,
    RestroomListMap,
  },
  data() {
    return {
      loading: false,
      messages: [],
      restrooms: null,
      mapCenter: null,
      mapData: null,
      userCoords: null,
    };
  },
  created() {
    this.getBathrooms();
  },
  watch: {
    // call again the method if the route changes
    $route: 'getBathrooms',
  },
  methods: {
    handleHover(hoverState: any) {
      // get item from hover
      this.mapCenter = hoverState.latLng;
    },
    async getUserCoords(address: string) {
      try {
        const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${address}&key=${OPENCAGE_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        const coords = json.features[0].geometry.coordinates;
        return coords.reverse();
      } catch {
        this.messages.push({
          type: 'error',
          content: 'Could not find location for address',
        });
      }
      return null;
    },
    async getBathrooms() {
      this.loaduserLocationPointing = true;
      // Get Address
      const searchString = this.$route.query.search;
      const userCoords = await this.getUserCoords(searchString);
      // Center Map
      this.userCoords = userCoords;
      // Get Restrooms at address
      const restroomsResp = await WebApi.getRestroomsByLocation({
        lat: userCoords[0],
        lng: userCoords[1],
      });
      if (restroomsResp.length > 0) {
        this.restrooms = restroomsResp.map(restroom => new Restroom(restroom, {
          lat: userCoords[0],
          lng: userCoords[1],
        }));
        this.mapData = Restroom.toGeoJsonFeatureSet(this.restrooms);
      }
      this.loading = false;
    },
  },
};
</script>
