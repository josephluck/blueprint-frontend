<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  const Utils = require('../utils')
  export default {
    mounted (el) {
      // Bind window scroll listener
      const elm = Utils.getScrollParent(this.$el)
      if (elm) {
        elm.addEventListener('scroll', this.throttledOnScroll)
      }
    },
    destroyed (el) {
      // Remove window scroll listener
      const elm = Utils.getScrollParent(this.$el)
      if (elm) {
        elm.removeEventListener('scroll', this.throttledOnScroll)
      }
    },
    computed: {
      throttledOnScroll () {
        return Utils.throttle(this.onScroll, 500)
      }
    },
    methods: {
      isElementVisible (el) {
        let rect = el.getBoundingClientRect()
        let vWidth = window.innerWidth || document.documentElement.clientWidth
        let vHeight = window.innerHeight || document.documentElement.clientHeight
        let efp = function (x, y) {
          return document.elementFromPoint(x, y)
        }

        // Return false if it's not in the viewport
        if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) {
          return false
        }

        // Return true if any of its four corners are visible
        return (
          el.contains(efp(rect.left, rect.top)) ||
          el.contains(efp(rect.right, rect.top)) ||
          el.contains(efp(rect.right, rect.bottom)) ||
          el.contains(efp(rect.left, rect.bottom))
        )
      },
      onScroll (e) {
        if (!this.visible && this.isElementVisible(this.$el)) {
          this.$emit('enter')
          this.visible = true
        } else {
          this.visible = false
        }
      }
    }
  }
</script>
