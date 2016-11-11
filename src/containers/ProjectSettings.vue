<template>
  <div class="flex flex-1 flex-column">
    <div class="flex-1 overflow-auto">
      <div class="pa3 ba b--black-20 bg-white br2">
        <div class="form-input mb3">
          <label class="db mb1">Project name</label>
          <input type="text" class="w-100" v-bind:value="project.name" v-on:input="updateProject('name', $event)" />
        </div>

        <div class="mb0">
          <div class="flex">
            <label class="db mb1">Collaborators</label>
            <div class="flex-1"></div>
            <a class="dib silver ml2 icon ss-hyphen pointer"
              v-on:click.prevent="toggleUsersHidden()"></a>
          </div>
          <transition-height v-if="!usersHidden">
            <div>
              <div class="ba b--black-20 br2">
                <div class="pa2">
                  Joseph Luck
                </div>
              </div>
            </div>
          </transition-height>
        </div>
      </div>
      <div class="mt3 flex">
        <div class="flex-1"></div>
        <a class="button --bad"
          v-on:click.prevent="showDeleteConfirmation()">
          Delete project
        </a>
      </div>



      <form v-on:submit.prevent="deleteProject">
        <modal v-if="newProjectFormShowing"
          v-on:close="newProjectFormShowing = false">
        </modal>
      </form>
    </div>
  </div>
</template>

<script>
  const Utils = require('../utils')
  export default {
    components: {
      TransitionHeight: require('../components/TransitionHeight.vue')
    },
    computed: {
      project () {
        return this.$store.state.project.project
      },
      throttledSaveProject () {
        return Utils.throttle(this.saveProject, 500)
      },
      usersHidden () {
        return this.$store.state.project.usersHidden
      }
    },
    methods: {
      saveProject () {
        this.$store.dispatch('project/SAVE', this.$route.params.projectId)
      },
      updateProject (name, e) {
        this.$store.commit('project/form/UPDATE_PROJECT', {
          name, value: e.target.value
        })
        this.throttledSaveProject()
      },
      toggleUsersHidden () {
        this.$store.commit('project/form/TOGGLE_USERS_HIDDEN')
      },
      deleteProject () {
        console.log('Delete project')
      }
    }
  }
</script>