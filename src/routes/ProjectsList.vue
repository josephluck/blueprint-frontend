<template>
  <div>
    <div class="flex items-center">
      <h2 class="flex-1">
        Projects
      </h2>
      <div>
        <a class="button"
          v-on:click="newProjectFormShowing = true">
          New project
        </a>
      </div>
    </div>

    {{ loading ? 'Loading' : null }}

    <div class="mt3 list mb3">
      <div class="list-item"
        v-for="project in projects">
        <router-link
          v-bind:to="{
            name: 'project',
            params: {
              projectId: project._id
            }
          }">
          {{ project.name }}
        </router-link>
      </div>
    </div>
    <div class="flex">
      <div class="flex-1"></div>
      <pagination for="projects" :records="count" :per-page="5"></pagination>
    </div>

    <form v-on:submit.prevent="saveNewProject">
      <modal v-if="newProjectFormShowing">
        <div slot="header"
          class="pa3 bb b--black-20 bg-white">
          New project
        </div>
        <div slot="content"
          class="pa3">
          <label class="dib w-100 mb1">
            Project name
          </label>
          <input class="w-100"
            v-model="newProjectName" />
        </div>

        <div slot="footer"
          class="pa3 flex items-center bt b--black-20 bg-white">
          <div class="flex-1"></div>
          <a v-on:click.prevent="newProjectFormShowing = false"
            class="mr3">
            Close
          </a>
          <button type="submit"
            class="button">
            Save
          </button>
        </div>
      </modal>
    </form>
  </div>
</template>

<script>
  export default {
    components: {
      Modal: require('../components/Modal.vue')
    },
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
      this.setBreadcrumbs()
    },
    methods: {
      setBreadcrumbs () {
        this.$store.dispatch('breadcrumbs/SET', [
          { name: 'Projects' }
        ])
      },
      getProjects () {
        this.$store.dispatch('projects/PAGINATE', 1)
      },
      setUpSockets () {
        this.$store.dispatch('projects/SETUP_SOCKETS')
      },
      saveNewProject () {
        if (this.newProjectName) {
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
  }
</script>
