<template>
  <div class="project">
    <div v-if="loading">
      Loading
    </div>
    <div v-if="!loading">
      <div>
        <router-link
          active-class="bb dib"
          :to="{
            name: 'projectEdit',
            params: {
              projectId: this.project._id
            }
          }"
        >
          Edit
        </router-link>
        <router-link
          active-class="bb dib"
          :to="{
            name: 'projectDocs',
            params: {
              projectId: this.project._id
            }
          }"
        >
          Docs
        </router-link>
      </div>
    </div>
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
        if (to.matched[1].name === 'project' && to.params.projectId !== from.params.projectId) {
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
