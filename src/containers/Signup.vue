<template>
  <form
    class="signup-form"
    v-on:submit.prevent="submitLogin"
  >
    <h1>
      Signup for Blueprint
    </h1>

    <div v-if="error">
      {{ errorMessage }}
    </div>

    <input
      type="company_name"
      v-model="company_name"
    />

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
      Signup
    </button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        email: 'joseph@local.co',
        password: '12345678',
        company_name: 'Joseph Luck LTD'
      }
    },
    computed: {
      submitting () { return this.$store.state.signup.submitting },
      error () { return this.$store.state.signup.error },
      errorMessage () { return this.$store.state.signup.errorMessage }
    },
    methods: {
      submitLogin () {
        this.$store.dispatch('signup/ON_SUBMIT', {
          email: this.email,
          password: this.password,
          company_name: this.company_name
        }).then(() => {
          this.$router.replace({
            path: 'login'
          })
        })
      }
    }
  }
</script>
