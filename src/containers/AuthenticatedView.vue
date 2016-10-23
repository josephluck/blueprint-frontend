<template>
  <div class="flex h-100">
    <div class="left-bar flex flex-column">
      <div class="flex-1 pv4">
        <div class="flex items-center mb3 mr3">
          <h2 class="ph3 white db flex-1">
            Projects
          </h2>
          <a class="add-new-button"
            v-on:click="newProjectFormShowing = true">
            <span class="icon ss-plus"></span>
          </a>
        </div>
        <projects-list class="section active"></projects-list>
      </div>
    </div>
    <div class="flex-1 pt4 mh4">
      <div class="flex mb4">
        <breadcrumbs class="flex-1"></breadcrumbs>
        <a v-on:click.prevent="logout">
          Logout
        </a>
      </div>
      <transition v-bind:name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
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
    data () {
      return {
        transitionName: 'slide-left',
        newProjectFormShowing: false,
        newProjectName: ''
      }
    },
    components: {
      ProjectsList: require('../containers/ProjectsList.vue'),
      Breadcrumbs: require('../containers/Breadcrumbs.vue'),
      Modal: require('../components/Modal.vue')
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout/ON_SUBMIT').then(() => {
          this.$router.replace({
            path: 'login'
          })
        })
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
