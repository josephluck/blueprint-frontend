<template>
  <div class="flex h-100">
    <div class="flex h-100 flex-vertical mr2">
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
