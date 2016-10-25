<template>
  <transition
    name="transition-height"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:before-leave="beforeLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
  export default {
    methods: {
      enter: function (el) {
        console.log(el)
        el.style.height = 'auto'
        var endHeight = window.getComputedStyle(el).height
        el.style.height = '1px'
        el.offsetHeight // force repaint
        el.style.height = endHeight
      },
      afterEnter: function (el) {
        el.style.height = 'auto'
      },
      beforeLeave: function (el) {
        el.style.height = window.getComputedStyle(el).height
        el.offsetHeight // force repaint
        el.style.height = '0px'
      }
    }
  }
</script>
