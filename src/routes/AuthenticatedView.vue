<template>
  <div>
    <div class="top-bar ph4 pv3 mb3 flex">
      <breadcrumbs class="flex-1"></breadcrumbs>
      <div>
        <a v-on:click.prevent="logout">
          Logout
        </a>
      </div>
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
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    components: {
      Breadcrumbs: require('../containers/Breadcrumbs.vue')
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout/ON_SUBMIT').then(() => {
          this.$router.replace({
            path: 'login'
          })
        })
      }
    }
  }
</script>
