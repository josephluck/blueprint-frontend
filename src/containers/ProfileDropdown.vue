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
      <div slot="content"
        class="mt2 pv2 ph3 ba b--black-20 bg-white br2 shadow-1"
        style="width: 160px">
        <a class="pointer db mb1"
          v-on:click.prevent="showChangeDetails">
          Change details
        </a>
        <a class="pointer db mb1"
          v-on:click.prevent="setDeleteProfileModalShowing(true)">
          Delete account
        </a>
        <a class="pointer db"
          v-on:click.prevent="logout">
          Logout
        </a>
      </div>
    </callout>

    <confirmation-modal
      v-bind:showing="deleteProfileModalShowing"
      v-on:confirmed="deleteProfile()"
      v-on:close="setDeleteProfileModalShowing(false)"
      headerText="Delete account">
      <div slot="message">
        <p class="mt0">Are you sure you want to delete your account?</p>
        <p class="mb0">After this there's no going back. You will no longer be able to access Blueprint.</p>
      </div>
    </confirmation-modal>
  </div>
</template>

<script>
  export default {
    components: {
      Callout: require('../components/Callout.vue'),
      ConfirmationModal: require('../components/ConfirmationModal.vue')
    },
    data () {
      return {
        profileMenuOpen: false
      }
    },
    computed: {
      user () { return this.$store.state.user.details },
      deleteProfileModalShowing () { return this.$store.state.ui.openModalName === 'deleteProfile' }
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
      },
      setDeleteProfileModalShowing (showing) {
        this.toggleProfileMenuOpen(false)
        this.$store.commit('ui/SET_MODAL_NAME', showing === true ? 'deleteProfile' : null)
      }
    }
  }
</script>
