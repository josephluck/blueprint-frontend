<template>
  <div class="breadcrumbs">
    <span
      v-for="(breadcrumb, index) in breadcrumbs"
      class="breadcrumb"
    >
      <router-link
        v-if="breadcrumb.to"
        v-bind:to="breadcrumb.to"
      >
        {{ breadcrumb.name }}
      </router-link>
      <span
        v-else
        class="gray"
      >
        {{ breadcrumb.name }}
      </span>
      <span
        v-if="index !== breadcrumbs.length - 1"
        class="icon ss-navigateright light-silver ph1"
      ></span>
    </span>
  </div>
</template>

<script>
  export default {
    computed: {
      breadcrumbs () {
        return this.$store.state.breadcrumbs.breadcrumbs
      }
    }
  }
</script>
