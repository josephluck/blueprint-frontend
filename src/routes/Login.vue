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
        this.$store.dispatch('login/SUBMIT_LOGIN')
      }
    }
  }
</script>
