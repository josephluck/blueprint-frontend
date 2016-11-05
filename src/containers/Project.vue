<template>
  <div class="flex flex-1 flex-column">
    <div v-if="!loading"
      class="flex flex-1 flex-column">
      <div class="flex-0 ph4 flex items-center">
        <div class="flex-1 f2">
          {{project.name}}
        </div>
        <router-link class="b--black-20 dib ml3" active-class="b"
          :to="{ name: 'projectEdit', params: {projectId: this.project._id} }">
          Resources
        </router-link>
        <router-link class="b--black-20 dib ml3" active-class="b"
          :to="{ name: 'projectDocs', params: {projectId: this.project._id} }">
          Docs
        </router-link>
        <router-link class="b--black-20 dib ml3" active-class="b"
          :to="{ name: 'projectDocs', params: {projectId: this.project._id} }">
          Settings
        </router-link>
      </div>
      <div class="flex-1 overflow-auto pt4 ph4">
        <transition name="slide-right" mode="out-in">
          <router-view class="child-view"></router-view>
        </transition>
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
