<template>
  <div class="projects pl2 pr2">
    <button
      v-on:click="addNewProject"
    >
      New project
    </button>
    {{ loading ? 'Loading' : null }}
    <div v-for="project in projects">
      <span>
        {{ project.name }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      projects () {
        return this.$store.state.projects.projects
      },
      loading () {
        return this.$store.state.projects.loading
      }
    },
    created () {
      this.getResources()
      this.setUpSockets()
    },
    methods: {
      getResources () {
        this.$store.dispatch('projects/GET_PROJECTS')
      },
      setUpSockets () {
        this.$store.dispatch('projects/SETUP_SOCKETS')
      },
      addNewProject () {
        this.$store.dispatch('projects/ADD_NEW')
      }
    }
  }
</script>
