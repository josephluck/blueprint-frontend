<template>
  <div class="todo">
    <h1>
      {{ todo.text }}
    </h1>
    <button
      v-if="todo.completed"
      v-on:click="toggleTodo"
    >
      Mark as not completed
    </button>
    <button
      v-else
      v-on:click="toggleTodo"
    >
      Mark as completed
    </button>
  </div>
</template>

<script>
  export default {
    computed: {
      todo () {
        const todoId = parseInt(this.$route.params.todoId, 10)
        return this.$store.state.todos.find(todo => todo.id === todoId)
      }
    },
    methods: {
      toggleTodo () {
        this.$store.dispatch('toggleTodo', this.todo)
      }
    }
  }
</script>
