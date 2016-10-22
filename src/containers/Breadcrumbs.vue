<template>
  <div class="breadcrumbs">
    <transition-group name="breadcrumb" tag="div">
      <span
        v-for="(breadcrumb, index) in breadcrumbs"
        v-bind:key="index"
        class="breadcrumb"
      >
        <span
          v-if="index !== 0"
          class="icon ss-navigateright light-silver ph1"
        ></span>
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
      </span>
    </transition-group>
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
