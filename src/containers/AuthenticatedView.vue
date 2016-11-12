<template>
  <div class="flex flex-column h-100">
    <div class="flex items-center bg-white ph4 pv3 bb b--black-10">
      <div class="flex-1">
        <!-- <span class="icon blue ss-compasstool dib mr1"></span> -->
        <span class="ttu tracked fw5 blue">Blueprint</span>
      </div>
      <a class="db ml3" v-on:click="newProjectFormShowing = true">
        New project
      </a>
      <a class="db ml3" v-on:click.prevent="logout">
        Logout
      </a>
    </div>
    <div class="flex flex-1 h-100 overflow-hidden">
      <div class="mt1 flex flex-column overflow-auto">
        <div class="flex-1 pa3 pl4">
          <projects-list></projects-list>
        </div>
      </div>
      <div class="flex flex-column flex-1 pt3 overflow-auto">
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
            name: this.newProjectName,
            resources: [{
              supportedMethods: {},
              model: [{}]
            }]
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
