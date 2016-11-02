<template>
  <div>
    <div v-for="resource in project.resources"
      class="mb3 pa3 ba b--black-20 bg-white br2">
      <div class="mb3 flex items-center">
        <a class="dib silver mr2 icon ss-gridlines"></a>
        <div class="flex-1">
          <span v-if="resource.showing">{{resource.name}}</span>
        </div>
        <a class="dib silver ml2 icon ss-hyphen"></a>
        <a class="dib silver ml2 icon ss-delete"></a>
      </div>
      <div>
        <div class="form-input mb3">
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
        <div class="form-input mb3">
          <label class="mb3 db">
            <input type="checkbox" class="mr1" v-bind:value="resource.supportedMethods.get" />
            Supports GET method
          </label>
          <label class="mb3 db" v-if="resource.type === 'collection'">
            <input type="checkbox" class="mr1" v-bind:value="resource.supportedMethods.post" />
            Supports POST method
          </label>
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
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      project () {
        return {
          name: 'goodlord',
          resources: [
            {
              name: 'customers',
              type: 'collection',
              numberOfRecords: 10,
              supportedMethods: {
                get: true,
                post: true,
                put: false,
                delete: false
              },
              model: [
                {
                  key: 'first_name',
                  type: 'random',
                  randomCategory: 'name',
                  randomSubcategory: 'firstName'
                }
              ]
            },
            {
              name: 'settings',
              type: 'record',
              model: [],
              supportedMethods: {}
            }
          ]
        }
      }
    },
    methods: {
    }
  }
</script>
