<template>
  <form v-on:submit.prevent="submitLogin">
    <modal>
      <div slot="header" class="pa3 bb b--black-20 bg-white">
        Sign up
      </div>

      <div slot="content" class="pa3">
        <label class="mb1">
          Your name
        </label>
        <input
          class="w-100 mb3"
          type="text"
          v-model="name"
        />

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
        <router-link to="/login">
          I've already got an account
        </router-link>
        <div class="flex-1"></div>
        <button type="submit" class="button">
          Sign up
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
        name: 'Joseph Luck',
        password: '12345678'
      }
    },
    computed: {},
    methods: {
      submitLogin () {
        this.$store.dispatch('signup/ON_SUBMIT', {
          email: this.email,
          password: this.password,
          name: this.name
        }).then(() => {
          this.$router.replace({
            path: '/login'
          })
        })
      }
    }
  }
</script>
