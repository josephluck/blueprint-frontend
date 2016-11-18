<template>
  <div class="flex flex-1 flex-column">
    <div v-if="project._id"
      class="flex flex-1 flex-column">
      <div class="flex-0 ph4 flex items-center">
        <div class="flex flex-1 items-center">
          <span class="f3 mr3">{{project.name}}</span>
          <span class="f6 tooltip-bottom" v-if="project.updatedByUser"
            v-bind:data-tooltip="project.updatedByUser.name + ` at ` + formatDate(project.updatedAtDateTime, 'hh:mma on Do MMMM YYYY')">
            <div class="green">
              <span class="icon ss-check"></span>
              Last edit was {{formatDate(project.updatedAtDateTime, 'MMM Do YY')}}
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
        this.$nextTick(() => {
          this.scrollToElm(this.$route.hash)
        })
        return this.$store.state.project.project
      }
    },
    watch: {
      '$route' (to, from) {
        let elmScrollId = to.hash.substring(1)
        this.$store.commit('ui/SET_CURRENTLY_VIEWING', elmScrollId)
        if (to.matched[1].name === 'project' && to.params.projectId !== from.params.projectId) {
          this.getProject(to.params.projectId)
        }
      }
    },
    created () {
      this.getProject(this.$route.params.projectId)
    },
    methods: {
      scrollToElm (elmScrollId) {
        if (elmScrollId) {
          let elm = this.$el.querySelectorAll(`[data-scroll-id='${elmScrollId}']`)
          if (elm.length) {
            elm[0].scrollIntoView({
              behavior: 'smooth'
            })
          }
        }
      },
      getProject (projectId) {
        this.$store.dispatch('project/GET_PROJECT', projectId).then(() => {}, () => {
          this.$router.replace({
            path: '/'
          })
        })
      },
      formatDate (date, format) {
        return moment(date).format(format)
      }
    }
  }
</script>
