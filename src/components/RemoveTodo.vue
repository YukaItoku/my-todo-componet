<template>
  <label  class="removeTodo"
          @click="removeTodo">
    ×
  </label>
</template>

<script>
export default {
  props: {
    todoIndex: {
      type: Number,
      required: true,
    }
  },
  
  methods: {
    removeTodo() {
      if(confirm("are you sure"))
     this.$store.dispatch("removetodo", {todoIndex: this.todoIndex,})
    }
  }
}
</script>

<style scoped>
  .removeTodo {
    color: blue;
    margin-left: 10px;
    cursor: pointer;
  }
  
</style>