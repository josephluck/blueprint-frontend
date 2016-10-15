<template>
  <form
    class="login-form"
    v-on:submit.prevent="submitLogin"
  >
    <h1>
      Login to Blueprint
    </h1>

    <div v-if="error">
      {{ errorMessage }}
    </div>

    <input
      type="email"
      v-model="email"
    />

    <input
      type="password"
      v-model="password"
    />

    <button
      type="submit"
      v-bind:disabled="submitting"
    >
      Login
    </button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        email: 'joseph.luck@local.co',
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
            path: 'todos'
          })
        })
      }
    }
  }
</script>
