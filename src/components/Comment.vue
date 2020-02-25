<template>
  <div class="commentTodo">
    <input  type="textbox"
            v-model="localcomment"
            @blur="commentdone"
            @keydown.enter="commenting=false"
            >
  </div>

</template>

<script>
export default {
  props: {
    commenttext: {
      type: String,
      required: true,
    },
    commenting: {
      type: Boolean,
      required: true,
    },
  
  },
  methods: {
    commentdone() {
      this.commenting=false
    }
  },
  computed: {
    localcomment: {
      get(){
        return this.commenttext
      },
      set(localcomment) {
        this.$emit("commentwritten", localcomment)
      }
    }
  }
  
}
</script>