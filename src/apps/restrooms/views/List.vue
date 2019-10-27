<template>
  <div>
    <p>Ayayay</p>
  </div>
</template>

<script>

import WebApi from '../webapi';

// Make HTTP request with loader

// If fails, show failure alert

// If success,

export default {
  name: 'restroom-list',
  data() {
    return {
      searchData: null,
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
      this.searchData = await WebApi.getRestrooms({ query: this.$route.query.search });
    },
  },
};
</script>
