<template>
  <div>
    <div v-for="(resource, resourceIndex) in project.resources"
      class="mb3 pa3 ba b--black-20 bg-white br2">
      <div class="flex items-center">
        <a class="dib silver mr2 icon ss-gridlines"></a>
        <div class="flex-1">
          <span v-if="!resource.showing">{{resource.name}}</span>
        </div>
        <a class="dib silver ml2 icon ss-hyphen"
          v-on:click.prevent="toggleResourceShowing(resourceIndex)"></a>
        <a class="dib silver ml2 icon ss-delete"></a>
      </div>
      <transition-height v-if="resource.showing">
        <div>
          <div class="mt3 form-input mb3">
            <label class="db mb1">Name</label>
            <input type="text" class="w-100" v-bind:value="resource.name" />
          </div>
          <div class="form-input mb3">
            <label class="db mb1">Type</label>
            <select class="w-100" v-bind:value="resource.type">
              <option></option>
              <option value="collection">Collection</option>
              <option value="record">Single record</option>
            </select>
          </div>
          <div v-if="resource.type === 'collection'"
            class="form-input mb3">
            <label class="db mb1">Number of records</label>
            <input type="text" class="w-100" v-bind:value="resource.numberOfRecords" />
          </div>
          <div class="form-input flex">
            <div class="flex-1 mr3">
              <label class="mb3 db">
                <input type="checkbox" class="mr1" v-bind:value="resource.supportedMethods.get" />
                Supports GET method
              </label>
              <label class="mb3 db" v-if="resource.type === 'collection'">
                <input type="checkbox" class="mr1" v-bind:value="resource.supportedMethods.post" />
                Supports POST method
              </label>
            </div>
            <div class="flex-1">
              <label class="mb3 db">
                <input type="checkbox" class="mr1" v-bind:value="resource.supportedMethods.put" />
                Supports PUT method
              </label>
              <label class="mb3 db" v-if="resource.type === 'collection'">
                <input type="checkbox" class="mr1" v-bind:value="resource.supportedMethods.delete" />
                Supports DELETE method
              </label>
            </div>
          </div>
          <div>
            <label class="db mb1">Model</label>
            <div v-for="(model, index) in resource.model"
              class="bg-near-white ba b--black-10 pa3 br2"
              v-bind:class="{
                'mb3': index !== resource.model.length - 1
              }">
              <div class="mb3 flex items-center">
                <a class="dib silver mr2 icon ss-gridlines"></a>
                <div class="flex-1">
                  <span v-if="model.showing">{{model.key}}</span>
                </div>
                <a class="dib silver ml2 icon ss-hyphen"></a>
                <a class="dib silver ml2 icon ss-delete"></a>
              </div>
              <div>
                <div class="form-input mb3">
                  <label class="db mb1">Key</label>
                  <input type="text" class="w-100" v-bind:value="model.key" />
                </div>
                <div class="form-input mb3">
                  <label class="db mb1">Type</label>
                  <select class="w-100" v-bind:value="model.type">
                    <option></option>
                    <option value="random">Random</option>
                    <option value="preDefined">Pre defined</option>
                    <option value="nestedJson">JSON</option>
                    <option value="anotherResource">From another resource</option>
                  </select>
                </div>
                <div class="form-input mb3">
                  <label class="db mb1">Category</label>
                  <select class="w-100" v-bind:value="model.randomCategory">
                    <option></option>
                    <option v-for="category in randomCategories"
                      v-bind:value="category.value">{{category.name}}</option>
                  </select>
                </div>
                <div class="form-input mb3">
                  <label class="db mb1">Sub category</label>
                  <select class="w-100" v-bind:value="model.randomSubcategory">
                    <option></option>
                    <option v-for="subcategory in randomSubcategories[model.randomCategory]"
                      v-bind:value="subcategory.value">{{subcategory.name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-height>
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
        console.log('Fired')
        return this.$store.state.project.project
      }
    },
    methods: {
      toggleResourceShowing (resourceIndex) {
        this.$store.commit('project/TOGGLE_RESOURCE_SHOWING', resourceIndex)
      }
    }
  }
</script>
