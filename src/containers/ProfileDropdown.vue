<template>
  <div>
    <callout
      class="on-right"
      v-bind:open="profileMenuOpen"
      v-on:clickOutside="toggleProfileMenuOpen(false)">
      <img
        v-bind:src="user.avatar + `?s=30`"
        v-on:click="toggleProfileMenuOpen(true)"
        class="br-100 pointer"
        slot="toggle"
      />
      <div slot="content" class="mt2 pv2 ph3 ba b--black-20 bg-white br2 shadow-1">
        <a class="pointer db"
          v-on:click.prevent="logout">
          Logout
        </a>
      </div>
    </callout>
  </div>
</template>

<script>
  export default {
    components: {
      Callout: require('../components/Callout.vue')
    },
    data () {
      return {
        profileMenuOpen: false
      }
    },
    computed: {
      user () {
        return this.$store.state.user.details
      }
    },
    methods: {
      toggleProfileMenuOpen (showing) {
        this.profileMenuOpen = showing
      },
      logout () {
        this.$store.dispatch('logout/ON_SUBMIT').then(() => {
          this.$router.replace({
            path: '/login'
          })
        })
      }
    }
  }
</script>
