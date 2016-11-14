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
            <div v-if="resource.supportedMethods.get" class="mb5">
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '_get')">
                <div>
                  <div class="f3">Retrieve {{resource.name}}</div>
                  <div class="mt3">
                    <label class="dib mb1">Request URL</label>
                    <div class="code pa3 ba b--black-10 br2">
                      {{apiRoot}}/api/{{project._id}}/{{resource.name}}
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Method</label>
                    <div class="code pa3 ba b--black-10 br2">
                      GET
                    </div>
                  </div>
                  <div class="mt3" v-if="resource.type === 'collection'">
                    <label class="dib mb1">Query parameters</label>
                    <div class="ph3 ba b--black-10 br2">
                      <div class="pv3 b--black-10 bb"
                        v-for="(model, modelIndex) in resource.model"
                        v-bind:key="modelIndex"
                        v-if="model.type === 'anotherResource' && model.anotherResourceMethod === 'id'">
                        <div class="fw5 mb2 code">Include parent {{model.otherResourceName | deplural}}</div>
                        <div class="silver">
                          Include parent {{model.otherResourceName | deplural}} object in the {{resource.name}} response. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_expand={{model.otherResourceName | deplural}}</code>
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Exact search</div>
                        <div class="silver">
                          Search {{resource.name}} by attribute. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}=lorem</code>
                          Note that the query has to be an exact match for the attribute.
                          You can access deeply nested properties, for example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}.name=lorem</code>
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Partial search</div>
                        <div class="silver">
                          Search {{resource.name}} by attributes. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}_like=lorem</code>
                          Note that this is a partial search (so will return an array of {{resource.name}} that contain
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">lorem</code>
                          in the {{resource.model[0].key}} attribute).
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Paginate</div>
                        <div class="silver">
                          Paginate {{resource.name}}. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_page=3</code>
                          Note that you can adjust the number of records returned per page using the
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_limit</code>
                          query. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_page=3&limit=15</code>
                          The default limit is 10.
                          Note that you'll get
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">first</code>
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">prev</code>
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">next</code>
                          and
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">last</code>
                          links in the
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">Link</code>
                          response header.
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Sort</div>
                        <div class="silver">
                          Sort {{resource.name}} by attribute. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_sort={{resource.model[0].key}}</code>
                          You can choose between ascending or descending order using the
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_order</code>
                          query. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_sort={{resource.model[0].key}}&order=DESC</code>
                          The default order is ASC.
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Slice</div>
                        <div class="silver">
                          Slice {{resource.name}} for pagination. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_start=10&_end=20</code>
                          You can use
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_limit</code>
                          instead of
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_end</code>
                          for example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_start=10&_limit=20</code>
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Less / greater than</div>
                        <div class="silver">
                          Query {{resource.name}} by attribute greater / less than. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}_gte=10&{{resource.model[0].key}}_lte=50</code>
                        </div>
                      </div>
                      <div class="pv3">
                        <div class="fw5 mb2 code">Exclude</div>
                        <div class="silver">
                          Exclude {{resource.name}} that contain a particular attribute value. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}_ne=lorem</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </scroll-container>
            </div>

            <div v-if="resource.supportedMethods.get && resource.type === 'collection'"
              v-bind:class="{
                'mb5': resource.supportedMethods.put || resource.supportedMethods.delete
              }">
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '_get')">
                <div>
                  <div class="f3">Retrieve a {{resource.name | deplural}}</div>
                  <div class="mt3">
                    <label class="dib mb1">Request URL</label>
                    <div class="code pa3 ba b--black-10 br2">
                      {{apiRoot}}/api/{{project._id}}/{{resource.name}}/1
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Method</label>
                    <div class="code pa3 ba b--black-10 br2">
                      GET
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Query parameters</label>
                    <div class="ph3 ba b--black-10 br2">
                      <div class="pv3 b--black-10"
                        v-for="(model, modelIndex) in resource.model"
                        v-bind:key="modelIndex"
                        v-if="model.type === 'anotherResource' && model.anotherResourceMethod === 'id'"
                        v-bind:class="{
                          'bb': modelIndex !== resource.model.length - 1
                        }">
                        <div class="fw5 mb2 code">Include parent {{model.otherResourceName | deplural}}</div>
                        <div class="silver">
                          Include parent {{model.otherResourceName | deplural}} object in the {{resource.name}} response. For example
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_expand={{model.otherResourceName | deplural}}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </scroll-container>
            </div>


            <div v-if="resource.supportedMethods.post"
              v-bind:class="{
                'mb5': resource.supportedMethods.get || resource.supportedMethods.put || resource.supportedMethods.delete
              }">
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '_post')">
                <div>
                  <div class="f3">Create a {{resource.name | deplural}}</div>
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
                        <div class="flex items-center mb2">
                          <div class="flex-1 fw5 code">{{model.key}}</div>
                          <span v-if="model.required" class="ml2 red">Required</span>
                        </div>
                        <div class="silver">
                          {{model.documentation || "No description provided for this key."}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </scroll-container>
            </div>

            <div v-if="resource.supportedMethods.put"
              v-bind:class="{
                'mb5': resource.supportedMethods.delete
              }">
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '_put')">
                <div>
                  <div class="f3" v-if="resource.type === 'collection'">Update a {{resource.name | deplural}}</div>
                  <div class="f3" v-else>Update {{resource.name}}</div>
                  <div class="mt3">
                    <label class="dib mb1">Request URL</label>
                    <div class="code pa3 ba b--black-10 br2">
                      {{apiRoot}}/api/{{project._id}}/{{resource.name}}<span v-if="resource.type === 'collection'">/1</span>
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Method</label>
                    <div class="code pa3 ba b--black-10 br2">
                      PUT
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
                        <div class="flex items-center mb2">
                          <div class="flex-1 fw5 code">{{model.key}}</div>
                          <span v-if="model.required" class="ml2 red">Required</span>
                        </div>
                        <div class="silver">
                          {{model.documentation || "No description provided for this key."}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </scroll-container>
            </div>

            <div v-if="resource.supportedMethods.delete">
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '_delete')">
                <div>
                  <div class="f3">Delete a {{resource.name | deplural}}</div>
                  <div class="mt3">
                    <label class="dib mb1">Request URL</label>
                    <div class="code pa3 ba b--black-10 br2">
                      {{apiRoot}}/api/{{project._id}}/{{resource.name}}/1
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Method</label>
                    <div class="code pa3 ba b--black-10 br2">
                      DELETE
                    </div>
                  </div>
                </div>
              </scroll-container>
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
      TransitionHeight: require('../components/TransitionHeight.vue'),
      ScrollContainer: require('../components/ScrollContainer.vue')
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
      },
      setCurrentlyViewing (elm) {
        this.$store.commit('ui/SET_CURRENTLY_VIEWING', elm)
      }
    }
  }
</script>
