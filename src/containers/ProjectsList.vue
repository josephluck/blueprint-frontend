<template>
  <div>
    <transition-group name="list-transition">
      <div v-for="project in projects"
        v-bind:key="project._id"
        class="list-transition-item pb3">
        <router-link class="white db pb0 transition pointer"
          v-bind:to="getProjectLink(project._id)"
          v-bind:class="{
            'pb2': projectMenuItemOpen === project._id
          }">
          {{ project.name }}
        </router-link>
        <transition-height
          v-if="projectMenuItemOpen === project._id">
          <div class="silver pl2">
            <transition-group name="list-transition">
              <div class="list-transition-item mb2">
                customers
              </div>
              <div>
                invoices
              </div>
            </transition-group>
          </div>
        </transition-height>
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    components: {
      TransitionHeight: require('../components/TransitionHeight.vue')
    },
    computed: {
      projects () {
        return this.$store.state.projects.projects
      },
      count () {
        return this.$store.state.projects.count
      },
      loading () {
        return this.$store.state.projects.loading
      },
      projectMenuItemOpen () {
        return this.$route.params.projectId
      },
      currentTab () {
        let currentTab = 'edit'
        if (this.$route.matched[2].name === 'projectDocs') {
          currentTab = 'docs'
        }
        return currentTab
      }
    },
    created () {
      this.getProjects()
      this.setUpSockets()
    },
    methods: {
      getProjectLink (projectId) {
        return `/${projectId}/${this.currentTab}`
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
