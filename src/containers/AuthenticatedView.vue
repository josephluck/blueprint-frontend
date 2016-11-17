<template>
  <div class="flex flex-column h-100">
    <div class="flex items-center bg-white ph4 pv3 bb b--black-10">
      <div class="flex-1">
        <span class="ttu tracked fw5 blue">Blueprint</span>
      </div>
      <profile-dropdown></profile-dropdown>
    </div>
    <div class="flex flex-1 h-100 overflow-hidden">
      <div class="mt1 flex flex-column overflow-auto">
        <div class="flex-1 pt3 pb3 pl4">
          <projects-list></projects-list>
          <a class="button pointer db mt3" v-on:click="openNewProjectModal">
            New project
          </a>
        </div>
      </div>
      <div class="flex flex-column flex-1 pt3 overflow-auto">
        <transition v-bind:name="transitionName" mode="out-in">
          <router-view class="child-view"></router-view>
        </transition>
      </div>
      <new-project-modal></new-project-modal>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    components: {
      NewProjectModal: require('../containers/NewProjectModal.vue'),
      ProfileDropdown: require('../containers/ProfileDropdown.vue'),
      ProjectsList: require('../containers/ProjectsList.vue'),
      Modal: require('../components/Modal.vue'),
      TransitionHeight: require('../components/TransitionHeight.vue')
    },
    methods: {
      openNewProjectModal () {
        this.$store.commit('ui/SET_MODAL_NAME', 'newProject')
      }
    }
  }
</script>
