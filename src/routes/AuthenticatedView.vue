<template>
  <div class="ph4">
    <div class="top-bar mv4">
      <breadcrumbs></breadcrumbs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    components: {
      Breadcrumbs: require('../containers/Breadcrumbs.vue')
    }
  }
</script>
