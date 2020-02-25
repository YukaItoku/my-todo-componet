
<template>
  <input  type="checkbox"
          class="sortDone"
          v-model="checkPushed"
          />

<!-- このコンポーネントはチェックボックスがチェックされたかどうかだけを教えてくれるコンポーネント。親から違うデータが渡れば違うデータとして使える -->

</template>

<script>
export default {
  props: {
    pushed: {
      type: Boolean,
      required: true,
    }
    // pushedという名前のついたデータを渡される（中身は色々）
  },
  computed: {
    checkPushed:{
        get(){
          return this.pushed
        },
        set(isCheck) {
          this.$emit("checkPushed", isCheck)
        }
    }
  }
  
}
</script>

<style scoped>
  .sortDone {
    margin-bottom: 20px;
  }
</style>