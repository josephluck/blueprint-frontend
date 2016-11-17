<template>
  <form v-on:submit.prevent="handleSave">
    <modal v-if="showing" v-on:close="close">
      <div slot="header"
        class="pa3 bb b--black-20 bg-white">
        {{headerText || "Confirm"}}
      </div>
      <div slot="content"
        class="pa3">
        <slot name="message">
          Are you sure?
        </slot>
      </div>

      <div slot="footer"
        class="pa3 flex items-center bt b--black-20 bg-white">
        <div class="flex-1"></div>
        <a v-on:click.prevent="close"
          class="mr3">
          Nope
        </a>
        <button type="submit"
          class="button">
          {{buttonText || "Yes, I'm sure"}}
        </button>
      </div>
    </modal>
  </form>
</template>

<script>
  export default {
    props: [
      'showing',
      'headerText',
      'withConfirmationInput',
      'buttonText'
    ],
    components: {
      Modal: require('./Modal.vue')
    },
    methods: {
      handleSave () {
        this.$emit('confirmed')
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>
