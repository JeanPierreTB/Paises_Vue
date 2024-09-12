<template>
  <div>
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from './components/SlidebarComponent.vue';

export default {
  name: 'App',
  components: {
    Sidebar
  }
};
</script>

<style>

</style>
