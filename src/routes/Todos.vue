<template>
  <div class="todos">
    <add-new-todo
      v-on:submit="addNewTodo"
    />
    <template v-for="todo in todos">
      <todo-item
        :todo="todo"
        v-on:toggle="toggleTodo(todo)"
      />
    </template>
  </div>
</template>

<script>
  export default {
    computed: {
      todos () {
        return this.$store.state.todos
      }
    },
    methods: {
      addNewTodo (text) {
        this.$store.dispatch('addNewTodo', text)
      },
      toggleTodo (todo) {
        this.$store.dispatch('toggleTodo', todo)
      }
    },
    components: {
      TodoItem: require('../components/TodoItem.vue'),
      AddNewTodo: require('../components/AddNewTodo.vue')
    }
  }
</script>
