<template>
  <div>
    <div class="top-bar pa4 mb4">
      <breadcrumbs></breadcrumbs>
    </div>
    <div class="ph4">
      <transition v-bind:name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      Breadcrumbs: require('../containers/Breadcrumbs.vue')
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }
</script>
