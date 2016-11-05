<template>
  <div class="flex flex-1 flex-column">
    <div class="flex-1 overflow-auto">
      <div v-for="(resource, resourceIndex) in project.resources"
        class="mb3 pa3 ba b--black-20 bg-white br2">
        <div class="flex items-center">
          <a class="dib silver mr2 icon ss-gridlines"></a>
          <div class="flex-1">
            <span v-if="resource.hidden">{{resource.name}}</span>
          </div>
          <a class="dib silver ml2 icon ss-hyphen pointer"
            v-on:click.prevent="toggleResourceHidden(resourceIndex)"></a>
          <a class="dib silver ml2 icon ss-delete pointer"></a>
        </div>
        <transition-height v-if="!resource.hidden">
          <div>
            <div class="mt3 form-input mb3">
              <label class="db mb1">Name</label>
              <input type="text" class="w-100" v-bind:value="resource.name" v-on:input="updateResource(resourceIndex, 'name', $event)" />
            </div>
            <div class="form-input mb3">
              <label class="db mb1">Type</label>
              <select class="w-100" v-bind:value="resource.type" v-on:change="updateResource(resourceIndex, 'type', $event)">
                <option></option>
                <option value="collection">Collection</option>
                <option value="record">Single record</option>
              </select>
            </div>
            <div v-if="resource.type === 'collection'"
              class="form-input mb3">
              <label class="db mb1">Number of records</label>
              <input type="text" class="w-100" v-bind:value="resource.numberOfRecords" v-on:input="updateResource(resourceIndex, 'numberOfRecords', $event)" />
            </div>
            <div class="form-input flex">
              <div class="flex-1 mr3">
                <label class="mb3 db">
                  <input type="checkbox" class="mr1" v-bind:checked="resource.supportedMethods.get" v-on:change="updateResourceSupportedMethods(resourceIndex, 'get', $event)" />
                  Supports GET method
                </label>
                <label class="mb3 db" v-if="resource.type === 'collection'">
                  <input type="checkbox" class="mr1" v-bind:checked="resource.supportedMethods.post" v-on:change="updateResourceSupportedMethods(resourceIndex, 'post', $event)" />
                  Supports POST method
                </label>
              </div>
              <div class="flex-1">
                <label class="mb3 db">
                  <input type="checkbox" class="mr1" v-bind:checked="resource.supportedMethods.put" v-on:change="updateResourceSupportedMethods(resourceIndex, 'put', $event)" />
                  Supports PUT method
                </label>
                <label class="mb3 db" v-if="resource.type === 'collection'">
                  <input type="checkbox" class="mr1" v-bind:checked="resource.supportedMethods.delete" v-on:change="updateResourceSupportedMethods(resourceIndex, 'delete', $event)" />
                  Supports DELETE method
                </label>
              </div>
            </div>
            <div>
              <label class="db mb1">Model</label>
              <div v-for="(model, modelIndex) in resource.model"
                class="bg-near-white ba b--black-10 pa3 br2"
                v-bind:class="{
                  'mb3': modelIndex !== resource.model.length - 1
                }">
                <div class="flex items-center">
                  <a class="dib silver mr2 icon ss-gridlines"></a>
                  <div class="flex-1">
                    <span v-if="model.hidden">{{model.key}}</span>
                  </div>
                  <a class="dib silver ml2 icon ss-hyphen pointer"
                    v-on:click.prevent="toggleModelHidden(resourceIndex, modelIndex)"></a>
                  <a class="dib silver ml2 icon ss-delete pointer"></a>
                </div>
                <transition-height v-if="!model.hidden">
                  <div>
                    <div class="mt3 form-input mb3">
                      <label class="db mb1">Key</label>
                      <input type="text" class="w-100" v-bind:value="model.key" v-on:input="updateModel(resourceIndex, modelIndex, 'key', $event)" />
                    </div>
                    <div class="form-input mb3">
                      <label class="db mb1">Type</label>
                      <select class="w-100" v-bind:value="model.type" v-on:input="updateModel(resourceIndex, modelIndex, 'type', $event)">
                        <option></option>
                        <option value="random">Random</option>
                        <option value="preDefined">Pre defined</option>
                        <option value="nestedJson">JSON</option>
                        <option value="anotherResource">From another resource</option>
                      </select>
                    </div>
                    <div class="form-input mb3" v-if="model.type === 'random'">
                      <label class="db mb1">Category</label>
                      <select class="w-100" v-bind:value="model.randomCategory" v-on:change="updateModel(resourceIndex, modelIndex, 'randomCategory', $event)">
                        <option></option>
                        <option v-for="category in randomCategories"
                          v-bind:value="category.value">{{category.name}}</option>
                      </select>
                    </div>
                    <div class="form-input mb3" v-if="model.type === 'random'">
                      <label class="db mb1">Sub category</label>
                      <select class="w-100" v-bind:value="model.randomSubcategory" v-on:change="updateModel(resourceIndex, modelIndex, 'randomSubcategory', $event)">
                        <option></option>
                        <option v-for="subcategory in randomSubcategories[model.randomCategory]"
                          v-bind:value="subcategory.value">{{subcategory.name}}</option>
                      </select>
                    </div>
                  </div>
                </transition-height>
              </div>
            </div>
          </div>
        </transition-height>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      TransitionHeight: require('../components/TransitionHeight.vue')
    },
    data () {
      return {
        randomCategories: require('../data/randomCategories'),
        randomSubcategories: require('../data/randomSubcategories')
      }
    },
    computed: {
      project () {
        return this.$store.state.project.project
      }
    },
    created () {
      this.$store.dispatch('project/SETUP_SOCKETS', this.$route.params.projectId)
    },
    methods: {
      toggleResourceHidden (resourceIndex) {
        this.$store.commit('project/form/TOGGLE_RESOURCE_HIDDEN', resourceIndex)
      },
      toggleModelHidden (resourceIndex, modelIndex) {
        this.$store.commit('project/form/TOGGLE_MODEL_HIDDEN', {
          resourceIndex,
          modelIndex
        })
      },
      saveProject () {
        this.$store.dispatch('project/SAVE', this.$route.params.projectId)
      },
      updateResource (resourceIndex, name, e) {
        this.$store.commit('project/form/UPDATE_RESOURCE', {
          resourceIndex, name, value: e.target.value
        })
        this.saveProject()
      },
      updateResourceSupportedMethods (resourceIndex, name, e) {
        this.$store.commit('project/form/UPDATE_RESOURCE_SUPPORTED_METHODS', {
          resourceIndex, name, value: e.target.checked
        })
        this.saveProject()
      },
      updateModel (resourceIndex, modelIndex, name, e) {
        this.$store.commit('project/form/UPDATE_MODEL', {
          resourceIndex, modelIndex, name, value: e.target.value
        })
        this.saveProject()
      }
    }
  }
</script>
