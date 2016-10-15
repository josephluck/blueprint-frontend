<template>
  <div class="resources">
    List of resources
    {{ loading ? 'Loading' : null }}
    <div v-for="resource in resources">
      <span>
        {{ resource.name }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
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
    },
    methods: {
      getResources () {
        this.$store.dispatch('resources/GET_RESOURCES')
      }
    }
  }
</script>
