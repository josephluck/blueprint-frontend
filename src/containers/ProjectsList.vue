<template>
  <div>
    <div v-for="project in projects">
      <a class="white mb3 db"
        v-on:click.prevent="toggleProjectMenuOpen(project)">
        {{ project.name }}
      </a>
      <transition-height
        v-if="project.menuOpened === true">
        <div>
          Resources list
        </div>
      </transition-height>
    </div>
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
