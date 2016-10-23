<template>
  <form
    class="login-form"
    v-on:submit.prevent="submitLogin"
  >
    <modal>
      <div slot="header" class="pa3 bb b--black-20 bg-white">
        Login
      </div>

      <div slot="content" class="pa3">
        <div v-if="error">
          {{ errorMessage }}
        </div>

        <label class="mb1">
          Email
        </label>
        <input
          class="w-100 mb3"
          type="email"
          v-model="email"
        />

        <label class="mb1">
          Password
        </label>
        <input
          class="w-100"
          type="password"
          v-model="password"
        />
      </div>

      <div slot="footer" class="pa3 flex items-center bt b--black-20 bg-white">
        <div class="flex-1"></div>
        <button type="submit" class="button" v-bind:disabled="submitting">
          Login
        </button>
      </div>
    </modal>
  </form>
</template>

<script>
  export default {
    components: {
      Modal: require('../components/Modal.vue')
    },
    data () {
      return {
        email: 'joseph@local.co',
        password: '12345678'
      }
    },
    computed: {
      submitting () { return this.$store.state.login.submitting },
      error () { return this.$store.state.login.error },
      errorMessage () { return this.$store.state.login.errorMessage }
    },
    methods: {
      submitLogin () {
        this.$store.dispatch('login/ON_SUBMIT', {
          email: this.email,
          password: this.password
        }).then(() => {
          this.$router.replace({
            path: 'projects'
          })
        })
      }
    }
  }
</script>
