<template>
  <div class="callout">
    <slot name="toggle"></slot>
    <transition name="callout" v-if="open" appear>
      <div class="callout-content">
        <slot name="content"></slot>
      </div>
    </transition>
  </slot>
</template>

<script>
  export default {
    props: ['open'],
    mounted (el) {
      document.body.addEventListener('click', this.closeIfNeeded)
    },
    destroyed (el) {
      document.body.removeEventListener('click', this.closeIfNeeded)
    },
    methods: {
      closeIfNeeded (e) {
        let clickOutside = !this.$el.contains(e.target)
        if (clickOutside && this.open) {
          this.$emit('clickOutside')
        }
      }
    }
  }
</script>
