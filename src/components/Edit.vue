<template>
  <div class="editTodo">
    <input  type="textbox"
            v-model="localtitle"
            @blur="editdone"
            @keydown.enter="editdone"
            
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    editing: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    editdone () {
      this.editing = false
    }
  },
  computed: {
    localtitle: {
      get: function() {
        return this.title;
      },
      set: function(localtitle) {
        this.$emit("editdone", localtitle);
        // なぜ引数にindex渡していないのか
      },
    },
  }
}
</script>

