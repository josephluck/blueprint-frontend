<template>
  <div>
    <div class="flex items-center">
      <h1 class="flex-1">
        Projects
      </h1>
      <div>
        <a
          class="button"
          v-on:click="newProjectFormShowing = true"
        >
          New project
        </a>
      </div>
    </div>
    {{ loading ? 'Loading' : null }}
    <div>
      <div
        class="pb1"
        v-for="project in projects"
      >
        <router-link
          v-bind:to="{
            name: 'project',
            params: {
              projectId: project._id
            }
          }"
        >
          {{ project.name }}
        </router-link>
      </div>
    </div>

    <div v-if="newProjectFormShowing">
      <form
        v-on:submit.prevent="saveNewProject"
      >
        <input
          v-model="newProjectName"
        />
        <a
          v-on:click.prevent="newProjectFormShowing = false"
        >
          Cancel
        </a>
        <button
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        newProjectFormShowing: false,
        newProjectName: ''
      }
    },
    computed: {
      projects () {
        return this.$store.state.projects.projects
      },
      loading () {
        return this.$store.state.projects.loading
      }
    },
    created () {
      this.getResources()
      this.setUpSockets()
      this.setBreadcrumbs()
    },
    methods: {
      setBreadcrumbs () {
        this.$store.dispatch('breadcrumbs/SET', [
          { name: 'Projects' }
        ])
      },
      getResources () {
        this.$store.dispatch('projects/GET_PROJECTS')
      },
      setUpSockets () {
        this.$store.dispatch('projects/SETUP_SOCKETS')
      },
      saveNewProject () {
        this.$store.dispatch('projects/ADD_NEW', {
          name: this.newProjectName
        }).then((projectId) => {
          this.newProjectFormShowing = false
          this.$router.replace({
            name: 'project',
            params: {
              projectId
            }
          })
        })
      }
    }
  }
</script>
