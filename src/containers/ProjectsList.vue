<template>
  <div>
    <transition-group name="list-transition">
      <div v-for="project in projects"
        v-bind:key="project._id"
        class="list-transition-item">
        <router-link class="gray db pb0 transition pointer"
          v-bind:to="getProjectLink(project._id)"
          active-class="orange fw5">
          {{ project.name }}
        </router-link>
        <transition-height
          v-if="projectMenuItemOpen === project._id && currentTab !== 'settings'">
          <div class="light-silver mt2" v-if="project.resources.length">
            <transition-group name="list-transition">
              <div class="list-transition-item mb2 ml2"
                v-for="(resource, resourceIndex) in project.resources"
                v-bind:key="resourceIndex">
                <div class="transition"
                  v-bind:class="{
                    'fw5 orange': currentlyViewing.includes(resource.name)
                  }">
                  {{resource.name}}
                </div>
                <transition-height v-if="currentTab === 'docs'">
                  <div>
                    <div class="mt1 fw2 ml2 transition"
                      v-bind:class="{
                        'fw5 orange': currentlyViewing === resource.name + '_get'
                      }"
                      v-if="resource.supportedMethods.get">
                      GET
                    </div>
                    <div class="fw2 ml2 transition"
                      v-bind:class="{
                        'fw5 orange': currentlyViewing === resource.name + '_post'
                      }"
                      v-if="resource.supportedMethods.post">
                      POST
                    </div>
                    <div class="fw2 ml2 transition"
                      v-bind:class="{
                        'fw5 orange': currentlyViewing === resource.name + '_put'
                      }"
                      v-if="resource.supportedMethods.put">
                      PUT
                    </div>
                    <div class="fw2 ml2 transition"
                      v-bind:class="{
                        'fw5 orange': currentlyViewing === resource.name + '_delete'
                      }"
                      v-if="resource.supportedMethods.delete">
                      DELETE
                    </div>
                  </div>
                </transition-height>
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
      },
      currentlyViewing () {
        return this.$store.state.ui.currentlyViewing
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
        this.$store.dispatch('projects/GET_PROJECTS')
      },
      setUpSockets () {
        this.$store.dispatch('projects/SETUP_SOCKETS')
      }
    }
  }
</script>
