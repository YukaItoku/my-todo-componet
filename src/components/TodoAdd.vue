<template>

  <form :class="classList" @submit.prevent="addTodo">
    <input v-model="title"
           type="text"
           class="text-input"
           placeholder="Add todo here"
           v-on:focusin="startEditing"
           @focusout="finishEditing"
    >
    <button type="submit"
            class="add-button"
            v-on:focusin="startEditing"
            v-if="isEditing || titleExists">
      Add
    </button>
  </form>

</template>

<script>
export default {
  data: function() {
    return{
      title: "",
      isEditing: false,
      editing: false,
      isDone: false,
    }
  },
  computed: {
    classList() {
      const classList = ["addtodo"]
      if (this.isEditing) {
        classList.push("active")
      }
      if (this.titleExists) {
        classList.push("addable")
      }
      return classList
      },
      titleExists() {
        return this.title.length > 0
      },
  },
  methods: {
    addTodo() {
      if(this.title===""){
        return;
      }
      this.$store.dispatch('addtodo', {title: this.title, editing: this.editing, isDone: this.isDone})
      // 第二引数にオブジェクト型でdataプロパティのtitleを渡す、アクションを実行させる
      this.title=""

    },
    startEditing() {
      this.isEditing=true
    },
    finishEditing() {
      this.isEditing=false
    },
  }
}
</script>