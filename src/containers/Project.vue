<template>
  <div class="project">
    {{ loading ? 'Loading' : null }}
    <span>
      {{ project.name }}
    </span>
  </div>
</template>

<script>
  export default {
    computed: {
      project () {
        return this.$store.state.project.project
      },
      loading () {
        return this.$store.state.project.loading
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.matched[1].name === 'project' && to.path !== from.path) {
          this.getProject(to.params.projectId)
          this.setUpSockets(to.params.projectId)
        }
      }
    },
    created () {
      this.getProject(this.$route.params.projectId)
      this.setUpSockets(this.$route.params.projectId)
    },
    methods: {
      getProject (projectId) {
        this.$store.dispatch('project/GET_PROJECT', projectId).then((project) => {
          this.$store.dispatch('breadcrumbs/SET', [
            { name: 'Projects', to: '/projects' },
            { name: project.name }
          ])
        })
      },
      setUpSockets (projectId) {
        this.$store.dispatch('project/SETUP_SOCKETS', projectId)
      }
    }
  }
</script>
