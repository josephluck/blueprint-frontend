<template>
  <div>
    <div v-for="project in projects"
      class="mb3">
      <a class="white db pb0 transition pointer"
        v-bind:class="{
          'pb2 b': projectMenuItemOpen === project._id
        }"
        v-on:click.prevent="toggleProjectMenuOpen(project)">
        {{ project.name }}
      </a>
      <transition-height
        v-if="projectMenuItemOpen === project._id">
        <div class="silver pl2">
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
    data: () => {
      return {
        projectMenuItemOpen: null
      }
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
        if (this.projectMenuItemOpen === project._id) {
          this.projectMenuItemOpen = null
        } else {
          this.projectMenuItemOpen = project._id
        }
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
