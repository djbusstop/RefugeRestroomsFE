<template>
  <v-container>
    <v-row>
      <!-- Left col -->
      <v-col
        v-if="restrooms"
        cols="6"
        md="6"
        xs="12"
        sm="12"
      >
        <!-- Toolbar for filter -->
        <v-toolbar
          flat
          dense
        >
          <v-toolbar-title>Filter</v-toolbar-title>
        </v-toolbar>

        <!-- List of cards -->
        <restroom-list-card
          v-for="restroom in restrooms"
          :restroom="restroom"
          :key="restroom.id"
        />

      </v-col>
      <!-- Map col -->
      <v-col
        cols="6"
        md="6"
        xs="12"
        sm="12"
      >
        <restroom-list-map />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Restroom from '../models/restroom';
import RestroomListCard from '../components/RestroomListCard.vue';
import RestroomListMap from '../components/RestroomListMap.vue';
import WebApi from '../webapi';

export default {
  name: 'restroom-list',
  components: {
    RestroomListCard,
    RestroomListMap,
  },
  data() {
    return {
      restrooms: null,
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
    async getBathrooms() {
      const restrooms = await WebApi.getRestrooms({ query: this.$route.query.search });
      if (restrooms.length > 0) {
        this.restrooms = restrooms.map(restroom => new Restroom(restroom, {
          lat: 51.52,
          lng: -0.25,
        }));
      }
    },
  },
};
</script>
