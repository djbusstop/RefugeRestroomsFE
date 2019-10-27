<template>
  <v-container>
    <v-row>
      <!-- Left col -->
      <v-col
        v-if="restrooms"
        cols="6"
      >
        <!-- Toolbar for filter -->
        <v-toolbar
          flat
          dense
        >
          <v-toolbar-title>Filter</v-toolbar-title>
        </v-toolbar>

        <!-- List of cards -->
        <restroom-card
          v-for="restroom in restrooms"
          :restroom="restroom"
          :key="restroom.id"
        />

      </v-col>
      <!-- Map col -->
    </v-row>
  </v-container>
</template>

<script>
import Restroom from '../models/restroom';
import RestroomCard from '../components/RestroomCard.vue';
import WebApi from '../webapi';

export default {
  name: 'restroom-list',
  components: {
    RestroomCard,
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
