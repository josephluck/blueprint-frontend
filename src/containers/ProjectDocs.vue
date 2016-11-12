<template>
  <div class="flex flex-1 flex-column">
    <div class="flex-1 overflow-auto">
      <div v-for="(resource, resourceIndex) in project.resources"
        class="mb3 pa3 ba b--black-20 bg-white br2">
        <div class="flex items-center">
          <div class="flex-1">
            <span v-if="hiddenResources[resourceIndex]">{{resource.name}}</span>
          </div>
          <a class="dib silver ml2 icon ss-hyphen pointer"
            v-on:click.prevent="toggleResourceHidden(resourceIndex)"></a>
        </div>
        <transition-height v-if="!hiddenResources[resourceIndex]">
          <div>
            <div v-if="resource.supportedMethods.post">
              <div class="f3">Create {{resource.name}}</div>

              <div class="mt3">
                <label class="dib mb1">Request URL</label>
                <div class="code pa3 ba b--black-10 br2">
                  {{apiRoot}}/api/{{project._id}}/{{resource.name}}
                </div>
              </div>

              <div class="mt3">
                <label class="dib mb1">Method</label>
                <div class="code pa3 ba b--black-10 br2">
                  POST
                </div>
              </div>

              <div class="mt3">
                <label class="dib mb1">Request body</label>
                <div class="ph3 ba b--black-10 br2">
                  <div v-for="(model, modelIndex) in resource.model"
                    class="pv3 b--black-10"
                    v-bind:class="{
                      'bb': modelIndex !== resource.model.length - 1
                    }"
                    v-bind:key="modelIndex">
                    <div class="fw5 mb2 code">{{model.key}}</div>
                    <div class="silver">
                      <div>
                        {{model.documentation || "No description provided for this key"}}
                      </div>
                      <div v-if="model.type === 'anotherResource' && model.anotherResourceMethod === 'id'"
                        class="mt2">
                        <div class="i">Used for <code class="dib bg-near-white pv1 ph2 br2 ba b--black-10">?_expand={{model.otherResourceName | deplural}}</code> query in GET methods</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-height>
      </div>
    </div>
  </div>
</template>

<script>
  const Inflection = require('inflection')
  export default {
    components: {
      TransitionHeight: require('../components/TransitionHeight.vue')
    },
    data () {
      return {
        apiRoot: 'http://localhost:3030'
      }
    },
    filters: {
      deplural (val) {
        return Inflection.singularize(val)
      }
    },
    computed: {
      project () {
        return this.$store.state.project.project
      },
      hiddenResources () {
        return this.$store.state.project.hiddenResources
      }
    },
    methods: {
      toggleResourceHidden (resourceIndex) {
        this.$store.commit('project/form/TOGGLE_RESOURCE_HIDDEN', resourceIndex)
      }
    }
  }
</script>
