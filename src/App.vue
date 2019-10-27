<template>
  <v-app>
    <app-bar @search-input-update="updateSearch" />
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/core/layouts/AppBar.vue';
import router from './router';

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
  },
  methods: {
    updateSearch(searchInput: {value: string}) {
      router.push({ path: '/restrooms', query: { search: searchInput.value } });
    },
  },
});
</script>
