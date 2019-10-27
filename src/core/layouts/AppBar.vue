
<template>
  <v-app-bar color="#41326B" dark app>

    <v-toolbar-title>
      <span
        to="/"
        class=".font-weight-bold"
      >
        RefugeRestrooms
      </span>
    </v-toolbar-title>

    <v-text-field
      v-model="searchInput"
      v-on:keyup.enter="submitSearch"
      label="Search"
      class="ml-8 mr-4"
      flat
      hide-details
      solo-inverted
    >
    </v-text-field>

    <router-link
      to="/about"
    >
      <v-btn
        text
      >
        <span class="mr-2">About</span>
      </v-btn>
    </router-link>

    <router-link
      to="/contact"
    >
      <v-btn
        text
      >
        <span class="mr-2">Contact</span>
      </v-btn>
    </router-link>

  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBar',
  data() {
    return {
      searchInput: null,
    };
  },
  methods: {
    submitSearch() {
      this.$emit('search-input-update', { value: this.searchInput });
    },
  },
});
</script>
