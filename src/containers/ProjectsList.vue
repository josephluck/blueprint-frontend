<template>
  <div>
    <transition-group name="list-transition">
      <div v-for="project in projects"
        v-bind:key="project._id"
        class="list-transition-item pb3">
        <router-link class="gray db pb0 transition pointer"
          v-bind:to="getProjectLink(project._id)"
          active-class="pb2 orange fw5">
          {{ project.name }}
        </router-link>
        <transition-height
          v-if="projectMenuItemOpen === project._id && currentTab !== 'settings'">
          <div class="light-silver">
            <transition-group name="list-transition">
              <div class="list-transition-item fw3"
                v-for="(resource, resourceIndex) in project.resources"
                v-bind:key="resourceIndex">
                {{resource.name}}
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
        if (this.$route.matched.length > 1) {
          if (this.$route.matched[2].name === 'projectDocs') {
            currentTab = 'docs'
          }
          if (this.$route.matched[2].name === 'projectSettings') {
            currentTab = 'settings'
          }
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
