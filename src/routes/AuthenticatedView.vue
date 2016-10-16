<template>
  <div class="flex">
    <div class="mr2">
      <projects-list></projects-list>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      ProjectsList: require('../containers/ProjectsList.vue')
    }
  }
</script>
