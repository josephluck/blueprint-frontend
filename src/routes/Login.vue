<template>
  <form
    class="login-form"
    v-on:submit.prevent="submitLogin"
  >
    <h1>
      Login to Blueprint
    </h1>

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
    computed: {
      submitting () {
        return this.$store.state.login.submitting
      }
    },
    methods: {
      submitLogin () {
        this.$store.dispatch('login/ON_SUBMIT', {
          email: 'joseph.luck@local.co',
          password: '12345678'
        })
      }
    }
  }
</script>
