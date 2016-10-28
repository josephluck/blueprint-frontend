<template>
  <div>
    <transition-group name="list-transition">
      <div v-for="project in projects"
        v-bind:key="project._id"
        class="list-transition-item pb3">
        <a class="white db pb0 transition pointer"
          v-bind:class="{
            'pb2': projectMenuItemOpen === project._id
          }"
          v-on:click.prevent="toggleProjectMenuOpen(project)">
          {{ project.name }}
        </a>
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
        return this.$store.state.projects.projectMenuItemOpen
      }
    },
    created () {
      this.getProjects()
      this.setUpSockets()
    },
    methods: {
      toggleProjectMenuOpen (project) {
        this.$store.commit('projects/TOGGLE_MENU_SHOWING', project._id)
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
