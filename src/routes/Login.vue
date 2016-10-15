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
    methods: {
      submitLogin () {
        console.log('Fire login')
      }
    }
  }
</script>
