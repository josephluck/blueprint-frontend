<template>
  <div class="projects pl2 pr2">
    {{ loading ? 'Loading' : null }}
    <div v-for="project in projects">
      <router-link
        v-bind:to="{
          name: 'project',
          params: {
            projectId: project._id
          }
        }"
      >
        {{ project.name }}
      </router-link>
    </div>
    <button
      v-on:click="addNewProject"
    >
      New project
    </button>
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
