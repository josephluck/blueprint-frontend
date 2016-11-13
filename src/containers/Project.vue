<template>
  <div class="flex flex-1 flex-column">
    <div v-if="!loading"
      class="flex flex-1 flex-column">
      <div class="flex-0 ph4 flex items-center">
        <div class="flex flex-1 items-center">
          <span class="f3 mr3">{{project.name}}</span>
          <span class="f6 tooltip-bottom" v-if="project.updated_by"
            v-bind:data-tooltip="project.updated_by.name + ` at ` + formatDate(project.updated_at, 'hh:mma on Do MMMM YYYY')">
            <div class="green">
              <span class="icon ss-check"></span>
              Last edit was {{formatDate(project.updated_at, 'MMM Do YY')}}
            </div>
          </span>
        </div>
        <router-link class="dib ml3" active-class="orange fw5"
          :to="{ name: 'projectEdit', params: {projectId: this.project._id} }">
          Edit
        </router-link>
        <router-link class="dib ml3" active-class="orange fw5"
          :to="{ name: 'projectDocs', params: {projectId: this.project._id} }">
          Docs
        </router-link>
        <router-link class="dib ml3" active-class="orange fw5"
          :to="{ name: 'projectSettings', params: {projectId: this.project._id} }">
          Settings
        </router-link>
      </div>
      <div class="flex flex-column flex-1 pt3 ph4">
        <transition name="slide-right" mode="out-in">
          <router-view class="child-view"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  const moment = require('moment')
  export default {
    computed: {
      project () {
        return this.$store.state.project.project
      },
      loading () {
        return this.$store.state.project.loading
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.matched[1].name === 'project' && to.params.projectId !== from.params.projectId) {
          this.getProject(to.params.projectId)
          this.setUpSockets(to.params.projectId)
        }
      }
    },
    created () {
      this.getProject(this.$route.params.projectId)
      this.setUpSockets(this.$route.params.projectId)
    },
    methods: {
      getProject (projectId) {
        this.$store.dispatch('project/GET_PROJECT', projectId).then((project) => {
          this.$store.dispatch('breadcrumbs/SET', [
            { name: 'Projects', to: '/projects' },
            { name: project.name }
          ])
        })
      },
      setUpSockets (projectId) {
        this.$store.dispatch('project/SETUP_SOCKETS', projectId)
      },
      formatDate (date, format) {
        return moment(date).format(format)
      }
    }
  }
</script>
