<template>
  <transition name="modal">
    <div class="modal-mask"
      v-on:click="handleModalMaskClicked($event)">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Default header
            </slot>
          </div>

          <div class="modal-content">
            <slot name="content">
              Default content
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div class="pa3 flex">
              <div class="flex-1"></div>
              <a v-on:click.prevent="$emit('close')">
                Close
              </a>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    methods: {
      handleModalMaskClicked (e) {
        const modalInnerElm = this.$el.querySelector('.modal-container')
        const shouldCloseModal = e.target.contains(modalInnerElm)
        if (shouldCloseModal) {
          this.$emit('close')
        }
      }
    }
  }
</script>
