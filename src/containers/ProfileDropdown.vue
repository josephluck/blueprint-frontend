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
        class="mt2 pa3 ba b--black-20 bg-white br2"
        style="width: 160px">
        <a class="pointer db mb2"
          v-on:click.prevent="setUpdateProfileModalShowing(true)">
          Update profile
        </a>
        <a class="pointer db mb2"
          v-on:click.prevent="setDeleteProfileModalShowing(true)">
          Delete account
        </a>
        <a class="pointer db"
          v-on:click.prevent="logout">
          Logout
        </a>
      </div>
    </callout>

    <form v-on:submit.prevent="saveUpdateProfile">
      <modal v-if="updateProfileDetailsModalShowing"
        v-on:close="setUpdateProfileModalShowing(false)">
        <div slot="header" class="pa3 bb b--black-20 bg-white">
          Update profile
        </div>

        <div slot="content" class="pa3">

          <div class="db red mb2">You must enter your password to save any changes</div>

          <label class="mb1">
            Name
          </label>
          <input
            class="w-100 mb3"
            type="text"
            v-bind:value="user.name"
            v-on:change="updateProfileDetails('name', $event)"
          />

          <label class="mb1">
            Email
          </label>
          <input
            class="w-100 mb3"
            type="email"
            v-bind:value="user.email"
            v-on:change="updateProfileDetails('email', $event)"
          />

          <label class="mb1">
            Password
          </label>
          <input
            class="w-100"
            type="password"
            v-bind:value="user.password"
            v-on:change="updateProfileDetails('password', $event)"
          />
        </div>

        <div slot="footer" class="pa3 flex items-center bt b--black-20 bg-white">
          <div class="flex-1"></div>
          <a v-on:click.prevent="setUpdateProfileModalShowing(false)"
            class="mr3">
            Close
          </a>
          <button type="submit" class="button">
            Save details
          </button>
        </div>
      </modal>
    </form>

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
      Modal: require('../components/Modal.vue'),
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
      deleteProfileModalShowing () { return this.$store.state.ui.openModalName === 'deleteProfile' },
      updateProfileDetailsModalShowing () { return this.$store.state.ui.openModalName === 'updateProfile' }
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
      },
      setUpdateProfileModalShowing (showing) {
        this.toggleProfileMenuOpen(false)
        this.$store.commit('ui/SET_MODAL_NAME', showing === true ? 'updateProfile' : null)
      },
      deleteProfile () {
        this.$store.dispatch('user/DELETE').then(() => {
          this.setDeleteProfileModalShowing(false)
          this.$router.replace({
            path: '/signup'
          })
        })
      },
      updateProfileDetails (name, e) {
        this.$store.commit('user/form/UPDATE_DETAILS', {
          name,
          value: e.target.value
        })
      },
      saveUpdateProfile (details) {
        this.$store.dispatch('user/UPDATE').then(() => {
          this.setUpdateProfileModalShowing(false)
        })
      }
    }
  }
</script>
