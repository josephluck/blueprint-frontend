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
                <div class="transition">
                  <router-link class="gray"
                    v-bind:class="{
                      'fw5 orange': currentlyViewing.includes(resource.name)
                    }"
                    v-bind:to="getProjectLink(project._id, [resource.name])">
                    {{resource.name}}
                  </router-link>
                </div>
                <transition-height v-if="currentTab === 'docs'">
                  <div>
                    <div class="mt1 fw2 ml2 transition"
                      v-if="resource.supportedMethods.get">
                      <router-link class="gray"
                        v-bind:class="{
                          'fw5 orange': currentlyViewing === resource.name + '-get'
                        }"
                        v-bind:to="getProjectLink(project._id, [resource.name, 'get'])">
                        GET
                      </router-link>
                    </div>
                    <div class="fw2 ml2 transition"
                      v-if="resource.supportedMethods.post">
                      <router-link class="gray"
                        v-bind:class="{
                          'fw5 orange': currentlyViewing === resource.name + '-post'
                        }"
                        v-bind:to="getProjectLink(project._id, [resource.name, 'post'])">
                        POST
                      </router-link>
                    </div>
                    <div class="fw2 ml2 transition"
                      v-if="resource.supportedMethods.put">
                      <router-link class="gray"
                        v-bind:class="{
                          'fw5 orange': currentlyViewing === resource.name + '-put'
                        }"
                        v-bind:to="getProjectLink(project._id, [resource.name, 'put'])">
                        PUT
                      </router-link>
                    </div>
                    <div class="fw2 ml2 transition"
                      v-if="resource.supportedMethods.delete">
                      <router-link class="gray"
                        v-bind:class="{
                          'fw5 orange': currentlyViewing === resource.name + '-delete'
                        }"
                        v-bind:to="getProjectLink(project._id, [resource.name, 'delete'])">
                        DELETE
                      </router-link>
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
    },
    methods: {
      getProjectLink (projectId, query) {
        let hash = ''
        if (query && query.length) {
          hash = '#'
          hash += query.join('-')
        }
        return `/${projectId}/${this.currentTab}${hash}`
      },
      getProjects () {
        this.$store.dispatch('projects/GET_PROJECTS')
      }
    }
  }
</script>
