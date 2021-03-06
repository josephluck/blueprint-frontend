<template>
  <div class="flex flex-1 flex-column">
    <div class="flex-1 overflow-auto">
      <div v-for="(resource, resourceIndex) in project.resources"
        v-bind:data-scroll-id="resource.name"
        v-if="resource.supportedMethods.get || resource.supportedMethods.post || resource.supportedMethods.put || resource.supportedMethods.delete"
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
            <div v-if="resource.supportedMethods.get" class="mb5" v-bind:data-scroll-id="resource.name + `-get`">
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '-get')">
                <div>
                  <div class="f3">Retrieve {{resource.name}}</div>
                  <div class="mt3">
                    <label class="dib mb1">Request URL</label>
                    <div class="code pa3 ba b--black-10 br2">
                      <a v-bind:href="projectApiUrl(resource)" target="_blank">
                        {{projectApiUrl(resource)}}
                      </a>
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Method</label>
                    <div class="code pa3 ba b--black-10 br2">GET</div>
                  </div>
                  <div class="mt3" v-if="resource.type === 'collection'">
                    <label class="dib mb1">Query parameters</label>
                    <div class="ph3 ba b--black-10 br2">
                      <div class="pv3 b--black-10 bb"
                        v-for="(model, modelIndex) in getParentResources(resource.model)"
                        v-bind:key="modelIndex">
                        <div class="fw5 mb2 code">Include parent {{model.otherResourceName | deplural}}</div>
                        <div class="silver">
                          Include parent {{model.otherResourceName | deplural}} object in the {{resource.name}} response. For example
                          <a v-bind:href="projectApiUrl(resource) + '?_expand=' + deplural(model.otherResourceName)" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_expand={{model.otherResourceName | deplural}}</code>
                          </a>
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb"
                        v-for="(childResource, childResourceIndex) in getChildResources(resource, project.resources)"
                        v-bind:key="childResourceIndex">
                        <div class="fw5 mb2 code">Include child {{childResource.name}}</div>
                        <div class="silver">
                          Include {{childResource.name}} that relate to {{childResource.name}} response. For example
                          <a v-bind:href="projectApiUrl(resource) + '?_embed=' + childResource.name" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_embed={{childResource.name}}</code>
                          </a>
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Exact search</div>
                        <div class="silver">
                          Search {{resource.name}} by attribute. For example
                          <a v-bind:href="projectApiUrl(resource) + '?' + resource.model[0].key + '=lorem'" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}=lorem</code>
                          </a>
                          Note that the query has to be an exact match for the attribute.
                          You can access deeply nested properties, for example
                          <a v-bind:href="projectApiUrl(resource) + '?' + resource.model[0].key + '.name=lorem'" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}.name=lorem</code>
                          </a>
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Partial search</div>
                        <div class="silver">
                          Search {{resource.name}} by attributes. For example
                          <a v-bind:href="projectApiUrl(resource) + '?' + resource.model[0].key + '_like=lorem'" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}_like=lorem</code>
                          </a>
                          Note that this is a partial search (so will return an array of {{resource.name}} that contain
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">lorem</code>
                          in the {{resource.model[0].key}} attribute).
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Paginate</div>
                        <div class="silver">
                          Paginate {{resource.name}}. For example
                          <a v-bind:href="projectApiUrl(resource) + '?_page=3' " target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_page=3</code>
                          </a>
                          Note that you can adjust the number of records returned per page using the
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_limit</code>
                          query. For example
                          <a v-bind:href="projectApiUrl(resource) + '?_page=3&_limit=15' " target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_page=3&_limit=15</code>
                          </a>
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
                          <a v-bind:href="projectApiUrl(resource) + '?_sort=' + resource.model[0].key" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_sort={{resource.model[0].key}}</code>
                          </a>
                          You can choose between ascending or descending order using the
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_order</code>
                          query. For example
                          <a v-bind:href="projectApiUrl(resource) + '?_sort=' + resource.model[0].key + '&_order=DESC'" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_sort={{resource.model[0].key}}&_order=DESC</code>
                          </a>
                          The default order is ASC.
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Slice</div>
                        <div class="silver">
                          Slice {{resource.name}} for pagination. For example
                          <a v-bind:href="projectApiUrl(resource) + '?_start=10&_end=20'" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_start=10&_end=20</code>
                          </a>
                          You can use
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_limit</code>
                          instead of
                          <code class="dib bg-near-white pa1 br2 ba b--black-10">?_end</code>
                          for example
                          <a v-bind:href="projectApiUrl(resource) + '?_start=10&_limit=20'" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_start=10&_limit=20</code>
                          </a>
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb">
                        <div class="fw5 mb2 code">Less / greater than</div>
                        <div class="silver">
                          Query {{resource.name}} by attribute greater / less than. For example
                          <a v-bind:href="projectApiUrl(resource) + '?' + resource.model[0].key + '_gte10&' + resource.model[0].key + '_lte=50'" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}_gte=10&{{resource.model[0].key}}_lte=50</code>
                          </a>
                        </div>
                      </div>
                      <div class="pv3">
                        <div class="fw5 mb2 code">Exclude</div>
                        <div class="silver">
                          Exclude {{resource.name}} that contain a particular attribute value. For example
                          <a v-bind:href="projectApiUrl(resource) + '?' + resource.model[0].key + '_ne=lorem'" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?{{resource.model[0].key}}_ne=lorem</code>
                          </a>
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
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '-get')">
                <div>
                  <div class="f3">Retrieve a {{resource.name | deplural}}</div>
                  <div class="mt3">
                    <label class="dib mb1">Request URL</label>
                    <div class="code pa3 ba b--black-10 br2">
                      <a v-bind:href="projectApiUrl(resource) + '/1'" target="_blank">
                        {{projectApiUrl(resource)}}/1
                      </a>
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Method</label>
                    <div class="code pa3 ba b--black-10 br2">GET</div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Query parameters</label>
                    <div class="ph3 ba b--black-10 br2">
                      <div class="pv3 b--black-10 bb"
                        v-for="(model, modelIndex) in getParentResources(resource.model)"
                        v-bind:key="modelIndex">
                        <div class="fw5 mb2 code">Include parent {{model.otherResourceName | deplural}}</div>
                        <div class="silver">
                          Include parent {{model.otherResourceName | deplural}} object in the {{resource.name}} response. For example
                          <a v-bind:href="projectApiUrl(resource) + '?_expand=' + deplural(model.otherResourceName)" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_expand={{model.otherResourceName | deplural}}</code>
                          </a>
                        </div>
                      </div>
                      <div class="pv3 b--black-10 bb"
                        v-for="(childResource, childResourceIndex) in getChildResources(resource, project.resources)"
                        v-bind:key="childResourceIndex">
                        <div class="fw5 mb2 code">Include child {{childResource.name}}</div>
                        <div class="silver">
                          Include {{childResource.name}} that relate to {{childResource.name}} response. For example
                          <a v-bind:href="projectApiUrl(resource) + '?_embed=' + childResource.name" target="_blank">
                            <code class="silver dib bg-near-white pa1 br2 ba b--black-10">?_embed={{childResource.name}}</code>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </scroll-container>
            </div>


            <div v-if="resource.supportedMethods.post"
              v-bind:data-scroll-id="resource.name + `-post`"
              v-bind:class="{
                'mb5': resource.supportedMethods.get || resource.supportedMethods.put || resource.supportedMethods.delete
              }">
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '-post')">
                <div>
                  <div class="f3">Create a {{resource.name | deplural}}</div>
                  <div class="mt3">
                    <label class="dib mb1">Request URL</label>
                    <div class="code pa3 ba b--black-10 br2">
                      {{projectApiUrl(resource)}}
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Method</label>
                    <div class="code pa3 ba b--black-10 br2">POST</div>
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
              v-bind:data-scroll-id="resource.name + `-put`"
              v-bind:class="{
                'mb5': resource.supportedMethods.delete
              }">
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '-put')">
                <div>
                  <div class="f3" v-if="resource.type === 'collection'">Update a {{resource.name | deplural}}</div>
                  <div class="f3" v-else>Update {{resource.name}}</div>
                  <div class="mt3">
                    <label class="dib mb1">Request URL</label>
                    <div class="code pa3 ba b--black-10 br2">
                      {{projectApiUrl(resource)}}<span v-if="resource.type === 'collection'">/1</span>
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Method</label>
                    <div class="code pa3 ba b--black-10 br2">PUT</div>
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

            <div v-if="resource.supportedMethods.delete"
              v-bind:data-scroll-id="resource.name + `-delete`">
              <scroll-container v-on:enter="setCurrentlyViewing(resource.name + '-delete')">
                <div>
                  <div class="f3">Delete a {{resource.name | deplural}}</div>
                  <div class="mt3">
                    <label class="dib mb1">Request URL</label>
                    <div class="code pa3 ba b--black-10 br2">
                      {{projectApiUrl(resource)}}/1
                    </div>
                  </div>
                  <div class="mt3">
                    <label class="dib mb1">Method</label>
                    <div class="code pa3 ba b--black-10 br2">DELETE</div>
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
        apiRoot: require('../api/urls.js').publicApiRoot
      }
    },
    filters: {
      deplural (val) { return Inflection.singularize(val) }
    },
    computed: {
      project () { return this.$store.state.project.project },
      hiddenResources () { return this.$store.state.project.hiddenResources }
    },
    methods: {
      toggleResourceHidden (resourceIndex) {
        this.$store.commit('project/form/TOGGLE_RESOURCE_HIDDEN', resourceIndex)
      },
      setCurrentlyViewing (elm) {
        this.$store.commit('ui/SET_CURRENTLY_VIEWING', elm)
      },
      getParentResources (model) {
        let parentResources = []
        model.forEach((attr) => {
          if (attr.type === 'anotherResource' && attr.anotherResourceMethod === 'id') {
            parentResources.push(attr)
          }
        })
        return parentResources
      },
      getChildResources (resource, resources) {
        let childResources = []
        let keyNameThatEmbedUsesInOtherResources = Inflection.singularize(resource.name) + 'Id'
        resources.map((otherResource) => {
          otherResource.model.map((otherResourceAttr) => {
            if (otherResourceAttr.key === keyNameThatEmbedUsesInOtherResources) {
              childResources.push(otherResource)
            }
          })
        })
        return childResources
      },
      projectApiUrl (resource) {
        return this.apiRoot + `/` + this.project._id + `/` + resource.name
      },
      deplural (val) { return Inflection.singularize(val) }
    }
  }
</script>
