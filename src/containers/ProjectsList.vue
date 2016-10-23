<template>
  <div>
    <div v-for="project in projects">
      <router-link class="white pv3 db ph3"
        v-bind:to="{
          name: 'project',
          params: {
            projectId: project._id
          }
        }">
        {{ project.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      projects () {
        return this.$store.state.projects.projects
      },
      count () {
        return this.$store.state.projects.count
      },
      loading () {
        return this.$store.state.projects.loading
      }
    },
    created () {
      this.getProjects()
      this.setUpSockets()
      this.setBreadcrumbs()
    },
    methods: {
      setBreadcrumbs () {
        this.$store.dispatch('breadcrumbs/SET', [
          { name: 'Projects' }
        ])
      },
      getProjects () {
        this.$store.dispatch('projects/PAGINATE', 1)
      },
      setUpSockets () {
        this.$store.dispatch('projects/SETUP_SOCKETS')
      }
    }
  }
</script>
