<template>
  <form v-on:submit.prevent="saveNewProject">
    <modal v-if="newProjectModalShowing"
      v-on:close="setNewProjectModalShowing(false)">
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
        <a v-on:click.prevent="setNewProjectModalShowing(false)"
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
</template>

<script>
  export default {
    components: {
      Modal: require('../components/Modal.vue')
    },
    data () {
      return {
        newProjectName: ''
      }
    },
    computed: {
      newProjectModalShowing () {
        return this.$store.state.ui.currentModal === 'newProject' && this.$store.state.ui.modalShowing
      }
    },
    methods: {
      saveNewProject () {
        if (this.newProjectName) {
          this.$store.dispatch('projects/ADD_NEW', {
            name: this.newProjectName,
            resources: [{
              supportedMethods: {},
              model: [{}]
            }]
          }).then((projectId) => {
            this.newProjectName = '' // Reset the form
            this.setNewProjectModalShowing(false)
            this.$router.replace({
              name: 'projectEdit',
              params: { projectId }
            })
          })
        }
      },
      setNewProjectModalShowing (showing) {
        this.$store.commit('ui/TOGGLE_MODAL', {
          name: 'newProject',
          showing
        })
      }
    }
  }
</script>
