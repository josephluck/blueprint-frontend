<template>
  <div class="resources">
    List of resources
    {{ loading ? 'Loading' : null }}
    <div v-for="resource in resources">
      <span>
        {{ resource.name }}
      </span>
    </div>

    <form
      v-on:submit.prevent="saveNewResource"
    >
      <input v-model="resourceName" />
      <button
        type="submit"
      >
        Save new resource
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        resourceName: 'Blueprint'
      }
    },
    computed: {
      resources () {
        return this.$store.state.resources.resources
      },
      loading () {
        return this.$store.state.resources.loading
      }
    },
    created () {
      this.getResources()
      this.setUpSockets()
    },
    methods: {
      getResources () {
        this.$store.dispatch('resources/GET_RESOURCES')
      },
      setUpSockets () {
        this.$store.dispatch('resources/SETUP_SOCKETS')
      },
      saveNewResource () {
        this.$store.dispatch('resources/SAVE_NEW_RESOURCE', {
          name: this.resourceName
        })
      }
    }
  }
</script>
