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
          </div>
          <div class="ba b--black-20 br2">
            <div v-for="(collaborator, collaboratorIndex) in project.collaborators"
              v-bind:class="{
                'bb b--black-20': collaboratorIndex !== project.collaborators.length - 1
              }">
              <div class="flex pa2 items-center">
                <div class="flex-0 mr2">
                  <img v-bind:src="collaborator.user.avatar + `?s=30`"
                    class="br-100"
                  >
                </div>
                <div class="flex-1">
                  {{collaborator.user.name}}
                </div>
                <a class="dib silver ml2 icon ss-delete pointer"
                  v-on:click.prevent="setDeleteCollaboratorModalShowing(true, collaborator._id)"></a>
              </div>
            </div>
          </div>
          <div class="flex mt3">
            <div class="flex-1"></div>
            <a class="button" v-on:click.prevent="setNewCollaboratorModalShowing(true)">
              Add new collaborator
            </a>
          </div>
        </div>
      </div>
      <div class="mt3 flex">
        <div class="flex-1"></div>
        <a class="button --bad"
          v-on:click.prevent="setDeleteProjectModalShowing(true)">
          Delete
        </a>
      </div>
      <form v-on:submit.prevent="addNewCollaborator">
        <modal v-if="addNewCollaboratorModalShowing"
          v-on:close="setNewCollaboratorModalShowing(false)">
          <div slot="header" class="pa3 bb b--black-20 bg-white">
            Add new collaborator
          </div>

          <div slot="content" class="pa3">
            <div class="mb3 green">
              To give someone access to edit {{project.name}}'s blueprint, please enter
              their email address below. Note that they must have already signed up to blueprint before you add them. Here's the link to sign up:
              <router-link to="/signup">{{signupUrl}}</router-link>
            </div>
            <label class="mb1">
              Email address
            </label>
            <input
              class="w-100 mb3"
              type="email"
              v-model="collaborator.email"
            />
          </div>

          <div slot="footer" class="pa3 flex items-center bt b--black-20 bg-white">
            <div class="flex-1"></div>
            <a v-on:click.prevent="setNewCollaboratorModalShowing(false)"
              class="mr3">
              Close
            </a>
            <button type="submit" class="button">
              Add collaborator
            </button>
          </div>
        </modal>
      </form>
      <confirmation-modal
        v-bind:showing="deleteModalShowing"
        v-on:confirmed="deleteProject()"
        v-on:close="setDeleteProjectModalShowing(false)"
        v-bind:headerText="`Delete ` + project.name + `'s blueprint`">
        <div slot="message">
          <p class="mt0">Are you sure you want to delete {{project.name}}'s blueprint?</p>
          <p>After this there's no going back. {{project.name}}'s blueprint will be
          cast in to the abyss never to be seen again.</p>
          <p class="mb0">This'll break any apps using {{project.name}}'s blueprint. <b>You've been warned!</b></p>
        </div>
      </confirmation-modal>
      <confirmation-modal
        v-bind:showing="deleteCollaboratorModalShowing"
        v-on:confirmed="deleteCollaborator(currentlyDeletingCollaborator._id, currentlyDeletingCollaborator.userId)"
        v-on:close="setDeleteCollaboratorModalShowing(false)"
        v-bind:headerText="`Remove ` + currentlyDeletingCollaborator.user.name">
        <div slot="message">
          <p class="mt0">Are you sure you want to remove {{currentlyDeletingCollaborator.user.name}} from {{project.name}}'s blueprint?</p>
          <b v-if="user._id === currentlyDeletingCollaborator.userId">
            You're about to remove yourself from {{project.name}}'s blueprint!
          </b>
          <p class="mb0">{{currentlyDeletingCollaborator.user.name}} will no longer be able to edit {{project.name}}'s blueprint.</p>
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
        },
        signupUrl: `${window.location.origin}/signup`
      }
    },
    computed: {
      project () { return this.$store.state.project.project },
      deleteModalShowing () { return this.$store.state.ui.openModalName === 'deleteProject' },
      addNewCollaboratorModalShowing () { return this.$store.state.ui.openModalName === 'addNewCollaborator' },
      currentlyDeletingCollaborator () { return this.$store.state.project.currentlyDeletingCollaborator },
      deleteCollaboratorModalShowing () { return this.$store.state.ui.openModalName === 'deleteCollaborator' },
      throttledSaveProject () { return Utils.throttle(this.saveProject, 500) },
      user () { return this.$store.state.user.details }
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
      setDeleteProjectModalShowing (showing) {
        this.$store.commit('ui/SET_MODAL_NAME', showing === true ? 'deleteProject' : null)
      },
      deleteProject () {
        this.$store.dispatch('project/DELETE', this.$route.params.projectId).then(() => {
          this.setDeleteProjectModalShowing(false)
          this.$router.push('/')
        })
      },
      setNewCollaboratorModalShowing (showing) {
        this.$store.commit('ui/SET_MODAL_NAME', showing === true ? 'addNewCollaborator' : null)
      },
      addNewCollaborator () {
        this.$store.dispatch('project/ADD_NEW_COLLABORATOR', {
          projectId: this.$route.params.projectId,
          collaborator: this.collaborator
        }).then(() => {
          this.setNewCollaboratorModalShowing(false)
        })
      },
      setDeleteCollaboratorModalShowing (showing, collaboratorId) {
        if (showing === true) {
          this.$store.commit('project/form/SET_CURRENT_DELETE_COLLABORATOR', collaboratorId)
        }
        this.$store.commit('ui/SET_MODAL_NAME', showing === true ? 'deleteCollaborator' : null)
      },
      deleteCollaborator (collaboratorId, userId) {
        this.$store.dispatch('project/DELETE_COLLABORATOR', {
          collaboratorId
        }).then(() => {
          // Check if the current user has been deleted
          if (userId === this.user._id) {
            this.$router.push('/')
          }
          this.setDeleteCollaboratorModalShowing(false)
        })
      }
    }
  }
</script>
