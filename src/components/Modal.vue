<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
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
            Default footer

            <a v-on:click.prevent="$emit('close')">
              OK
            </a>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {}
</script>
