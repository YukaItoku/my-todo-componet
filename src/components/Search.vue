<template>
  <div class="search">
    <input  type="text"
            v-model="searchWord"
            placeholder="search..."
            class="searching"
            @input="search()"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchWord: "",
    }
  },
  methods: {
   search() {
      this.$emit('child', this.searchWord)      
    }
  },    
}
</script>

<style scoped>
  .searching {
    margin-bottom: 20px;
  }
</style>