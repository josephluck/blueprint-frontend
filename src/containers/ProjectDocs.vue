<template>
  <div class="project">
    {{project.name}} docs
  </div>
</template>

<script>
  export default {
    computed: {
      project () {
        return this.$store.state.project.project
      }
    },
    methods: {
    }
  }
</script>
