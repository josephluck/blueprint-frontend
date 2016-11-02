<template>
  <div class="flex h-100">
    <div class="left-bar flex flex-column overflow-auto">
      <div class="flex-1 pv4 ph3">
        <projects-list></projects-list>
        <a class="white db mb3 mt3" v-on:click="newProjectFormShowing = true">
          New project
        </a>
        <a class="white db" v-on:click.prevent="logout">
          Logout
        </a>
      </div>
    </div>
    <div class="flex flex-column flex-1 pt4 overflow-auto">
      <transition v-bind:name="transitionName" mode="out-in">
        <router-view class="child-view"></router-view>
      </transition>
    </div>

    <form v-on:submit.prevent="saveNewProject">
      <modal v-if="newProjectFormShowing"
        v-on:close="newProjectFormShowing = false">
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
        newProjectName: '',
        showProjectsList: true
      }
    },
    components: {
      ProjectsList: require('../containers/ProjectsList.vue'),
      Modal: require('../components/Modal.vue'),
      TransitionHeight: require('../components/TransitionHeight.vue')
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    methods: {
      toggleMenuItem (name) {
        this[name] = !this[name]
      },
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
            this.newProjectName = '' // Reset the form
            this.newProjectFormShowing = false
            this.$router.replace({
              name: 'projectEdit',
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
