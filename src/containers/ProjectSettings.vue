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
              <div class="ba b--black-20 br2"
                v-for="collaborator in project.collaborators">
                <div class="pa2">
                  {{collaborator.name}}
                </div>
              </div>
              <div class="flex mt3">
                <div class="flex-1"></div>
                <a class="button" v-on:click.prevent="toggleNewCollaboratorModal(true)">
                  Add new collaborator
                </a>
              </div>
            </div>
          </transition-height>
        </div>
      </div>
      <div class="mt3 flex">
        <div class="flex-1"></div>
        <a class="button --bad"
          v-on:click.prevent="toggleDeleteModal(true)">
          Delete
        </a>
      </div>
      <form v-on:submit.prevent="addNewCollaborator">
        <modal v-if="addNewCollaboratorModalShowing"
          v-on:close="toggleNewCollaboratorModal(false)">
          <div slot="header" class="pa3 bb b--black-20 bg-white">
            Add new collaborator
          </div>

          <div slot="content" class="pa3">
            <label class="mb1">
              Collaborator's email address
            </label>
            <input
              class="w-100 mb3"
              type="email"
              v-model="collaborator.email"
            />
          </div>

          <div slot="footer" class="pa3 flex items-center bt b--black-20 bg-white">
            <div class="flex-1"></div>
            <button type="submit" class="button" v-bind:disabled="newCollaboratorSubmitting">
              Add collaborator
            </button>
          </div>
        </modal>
      </form>
      <confirmation-modal
        v-bind:showing="deleteModalShowing"
        v-on:confirmed="deleteProject()"
        v-on:close="toggleDeleteModal(false)"
        v-bind:headerText="`Delete ` + project.name + `'s blueprint`">
        <div slot="message">
          <p class="mt0">Are you sure you want to delete {{project.name}}'s blueprint?</p>
          <p>After this there's no going back. {{project.name}}'s blueprint will be
          cast in to the abyss never to be seen again.</p>
          <p class="mb0">This'll break any apps using {{project.name}}'s blueprint. <b>You've been warned!</b></p>
        </div>
      </confirmation-modal>
    </div>
  </div>
</template>

<script>
  const Utils = require('../utils')
  export default {
    components: {
      TransitionHeight: require('../components/TransitionHeight.vue'),
      Modal: require('../components/Modal.vue'),
      ConfirmationModal: require('../components/ConfirmationModal.vue')
    },
    data () {
      return {
        collaborator: {
          email: ''
        }
      }
    },
    computed: {
      project () { return this.$store.state.project.project },
      deleteModalShowing () { return this.$store.state.ui.currentModal === 'deleteProject' && this.$store.state.ui.modalShowing },
      newCollaboratorSubmitting () { return this.$store.state.project.newCollaboratorSubmitting },
      addNewCollaboratorModalShowing () { return this.$store.state.ui.currentModal === 'addNewCollaborator' && this.$store.state.ui.modalShowing },
      throttledSaveProject () { return Utils.throttle(this.saveProject, 500) },
      usersHidden () { return this.$store.state.project.usersHidden }
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
        this.$store.dispatch('project/DELETE', this.$route.params.projectId).then(() => {
          this.toggleDeleteModal(false)
          this.$router.push('/')
        })
      },
      addNewCollaborator () {
        this.$store.dispatch('project/ADD_NEW_COLLABORATOR', {
          projectId: this.$route.params.projectId,
          collaborator: this.collaborator
        }).then(() => {
          this.toggleNewCollaboratorModal(false)
        })
      },
      toggleDeleteModal (showing) {
        this.$store.commit('ui/TOGGLE_MODAL', {
          name: 'deleteProject',
          showing
        })
      },
      toggleNewCollaboratorModal (showing) {
        this.$store.commit('ui/TOGGLE_MODAL', {
          name: 'addNewCollaborator',
          showing
        })
      }
    }
  }
</script>
