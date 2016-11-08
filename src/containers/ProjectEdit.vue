<template>
  <div class="flex flex-1 flex-column">
    <div class="flex-1 overflow-auto">
      <div v-for="(resource, resourceIndex) in project.resources"
        class="mb3 pa3 ba b--black-20 bg-white br2">
        <div class="flex items-center">
          <a class="dib silver mr2 icon ss-gridlines"></a>
          <div class="flex-1">
            <span v-if="hiddenResources[resourceIndex]">{{resource.name}}</span>
          </div>
          <a class="dib silver ml2 icon ss-hyphen pointer"
            v-on:click.prevent="toggleResourceHidden(resourceIndex)"></a>
          <a class="dib silver ml2 icon ss-delete pointer"
            v-on:click.prevent="removeResource(resourceIndex)"></a>
        </div>
        <transition-height v-if="!hiddenResources[resourceIndex]">
          <div>
            <div class="pt3 form-input mb3">
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
              <div>
                <div v-for="(model, modelIndex) in resource.model"
                  v-bind:key="modelIndex"
                  class="bg-near-white ba b--black-10 pa3 br2"
                  v-bind:class="{
                    'mb3': modelIndex !== resource.model.length - 1
                  }">
                  <div class="flex items-center">
                    <a class="dib silver mr2 icon ss-gridlines"></a>
                    <div class="flex-1">
                      <span v-if="isModelHidden(resourceIndex, modelIndex)">{{model.key}}</span>
                    </div>
                    <a class="dib silver ml2 icon ss-hyphen pointer"
                      v-on:click.prevent="toggleModelHidden(resourceIndex, modelIndex)"></a>
                    <a class="dib silver ml2 icon ss-delete pointer"
                      v-on:click.prevent="removeModelKey(resourceIndex, modelIndex)"></a>
                  </div>
                  <transition-height v-if="!isModelHidden(resourceIndex, modelIndex)">
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
                          <option value="predefined">Pre defined</option>
                          <option value="nestedJson">JSON</option>
                          <option value="anotherResource">From another resource</option>
                        </select>
                      </div>
                      <div v-if="model.type === 'random'">
                        <div class="form-input mb3">
                          <label class="db mb1">Category</label>
                          <select class="w-100" v-bind:value="model.randomCategory" v-on:change="updateModel(resourceIndex, modelIndex, 'randomCategory', $event)">
                            <option></option>
                            <option v-for="category in randomCategories"
                              v-bind:value="category.value">{{category.name}}</option>
                          </select>
                        </div>
                        <div class="form-input mb3">
                          <label class="db mb1">Sub category</label>
                          <select class="w-100" v-bind:value="model.randomSubcategory" v-on:change="updateModel(resourceIndex, modelIndex, 'randomSubcategory', $event)">
                            <option></option>
                            <option v-for="subcategory in randomSubcategories[model.randomCategory]"
                              v-bind:value="subcategory.value">{{subcategory.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div v-if="model.type === 'predefined'">
                        <div class="form-input mb3">
                          <label class="db mb1">Type</label>
                          <select class="w-100"
                            v-bind:value="model.predefinedType"
                            v-on:change="updateModel(resourceIndex, modelIndex, 'predefinedType', $event)">
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="date">Date</option>
                          </select>
                        </div>
                        <div class="form-input mb3" v-if="model.predefinedType === 'string'">
                          <label class="db mb1">Value</label>
                          <input type="text" class="w-100" v-bind:value="model.predefinedValue" v-on:input="updateModel(resourceIndex, modelIndex, 'predefinedValue', $event)" />
                        </div>
                        <div class="form-input mb3" v-if="model.predefinedType === 'number'">
                          <label class="db mb1">Value</label>
                          <input type="number" class="w-100" v-bind:value="model.predefinedValue" v-on:input="updateModel(resourceIndex, modelIndex, 'predefinedValue', $event)" />
                        </div>
                        <div class="form-input mb3" v-if="model.predefinedType === 'boolean'">
                          <label class="db mb1">Value</label>
                          <select class="w-100"
                            v-bind:value="model.predefinedValue"
                            v-on:change="updateModel(resourceIndex, modelIndex, 'predefinedValue', $event)">
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>
                        <div class="form-input mb3" v-if="model.predefinedType === 'date'">
                          <label class="db mb1">Value</label>
                          <input type="date" class="w-100" v-bind:value="model.predefinedValue" v-on:input="updateModel(resourceIndex, modelIndex, 'predefinedValue', $event)" />
                        </div>
                      </div>

                      <div v-if="model.type === 'anotherResource'">
                        <div class="form-input mb3">
                          <label class="db mb1">Resource</label>
                          <select class="w-100"
                            v-bind:value="model.otherResourceName"
                            v-on:change="updateModel(resourceIndex, modelIndex, 'otherResourceName', $event)">
                            <option></option>
                            <option v-for="nestedResource in project.resources"
                              v-if="nestedResource.name !== resource.name"
                              v-bind:value="nestedResource.name">
                              {{nestedResource.name}}
                            </option>
                          </select>
                        </div>
                        <div class="form-input mb3">
                          <label class="db mb1">Method</label>
                          <select class="w-100"
                            v-bind:value="model.anotherResourceMethod"
                            v-on:change="updateModel(resourceIndex, modelIndex, 'anotherResourceMethod', $event)">
                            <option></option>
                            <option value="collection">
                              Array of {{model.otherResourceName}}
                            </option>
                            <option value="record">
                              Single, randomly selected object from {{model.otherResourceName}}
                            </option>
                            <option value="id">
                              Single, randomly selected id from {{model.otherResourceName}}
                            </option>
                          </select>
                        </div>
                    </div>
                  </transition-height>
                </div>
              </div>
              <div class="flex mt3">
                <div class="flex-1"></div>
                <a class="button" v-on:click.prevent="addModelKey(resourceIndex)">
                  Add new key
                </a>
              </div>
            </div>
          </div>
        </transition-height>
      </div>
      <div class="flex mv3">
        <div class="flex-1"></div>
        <a class="button" v-on:click.prevent="addResource()">
          Add new resource
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  const Utils = require('../utils')
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
      },
      throttledSaveProject () {
        return Utils.throttle(this.saveProject, 500)
      },
      hiddenResources () {
        return this.$store.state.project.hiddenResources
      },
      hiddenModels () {
        return this.$store.state.project.hiddenModels
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
      isModelHidden (resourceIndex, modelIndex) {
        return this.hiddenModels[`${resourceIndex}-${modelIndex}`]
      },
      saveProject () {
        this.$store.dispatch('project/SAVE', this.$route.params.projectId)
      },
      updateResource (resourceIndex, name, e) {
        this.$store.commit('project/form/UPDATE_RESOURCE', {
          resourceIndex, name, value: e.target.value
        })
        this.throttledSaveProject()
      },
      updateResourceSupportedMethods (resourceIndex, name, e) {
        this.$store.commit('project/form/UPDATE_RESOURCE_SUPPORTED_METHODS', {
          resourceIndex, name, value: e.target.checked
        })
        this.throttledSaveProject()
      },
      updateModel (resourceIndex, modelIndex, name, e) {
        this.$store.commit('project/form/UPDATE_MODEL', {
          resourceIndex, modelIndex, name, value: e.target.value
        })
        this.throttledSaveProject()
      },
      removeModelKey (resourceIndex, modelIndex) {
        this.$store.commit('project/form/REMOVE_MODEL_KEY', {
          resourceIndex, modelIndex
        })
        this.throttledSaveProject()
      },
      addModelKey (resourceIndex) {
        this.$store.commit('project/form/ADD_MODEL_KEY', {
          resourceIndex
        })
        this.throttledSaveProject()
      },
      removeResource (resourceIndex) {
        this.$store.commit('project/form/REMOVE_RESOURCE', {
          resourceIndex
        })
        this.throttledSaveProject()
      },
      addResource () {
        this.$store.commit('project/form/ADD_RESOURCE')
        this.throttledSaveProject()
      }
    }
  }
</script>
