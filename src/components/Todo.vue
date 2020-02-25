<template>
  <div class="list">

      <input  type="checkbox"
              v-model="updateIsDone"
             />
      <label  class="list-title"
              @dblclick="editTodo"
              v-show="!editing"
              v-bind:class="{done: isDone}"
      >
      {{ title }}
      </label>
      <edit 
            :title="this.title"
            :editing="this.editing"
            @editdone="editover"
            v-show="editing"
            ref="editnow"
            />
      <span class="editcomment" 
            @click="editcomment"
            v-show="!commenting"
      >{{commenttext}}
      </span>
      <!-- ↑コメント表示のみ -->
      <comment  :commenttext="this.commenttext"
                :commenting="this.commenting"
                v-show="commenting"
                @commentwritten="updatedcomment"
                />
      <!-- 編集中のコメント -->
      <RemoveTodo :todoIndex="this.todoIndex"
                  
                  />
    </div>
    
</template>

<script>
import RemoveTodo from "./RemoveTodo"
import Comment from "./Comment"
import Edit from "./Edit"
export default {

  data () {
    return{
      editing: false,
      commenting: false,
      commenttext: "click here to comment"
    }
  },
  components: {
    Edit,
    Comment,
    RemoveTodo,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    todoIndex: {
      type: Number,
      required: true,
    },
    isDone :{
      type: Boolean,
      required: true
    },
  },

  methods: {

    editTodo() {
      this.editing=true
      // this.$nextTick(() => this.$refs.editnow.focus())
    },
    search() {
      this.$emit('edit', this.title)      
    },
    editover(localtitle){
      this.editing=false
      // 子から来たeditedされたデータを更新
      this.$store.dispatch(
        'editover', 
        {title: localtitle, todoIndex: this.todoIndex}
      )
      // 更新後のlocaltitleをtitleというキーで保存
      // あくまで仮名称:localtitleは使用しているコンポーネントの中だけでいい
      // titleの持ち主はstoreなのでそのままstoreへdispatch
      // console.logでpayload出した時に、キーはtitleだからtitleキーで渡してあげる
    },
    editcomment() {
      this.commenting=true
    },
    updatedcomment(localcomment) {
      // 一文字でも来たらfalseに変換されてしまう
      this.commenting = false
      this.commenttext = localcomment

    },
    },
    computed: {
      updateIsDone:{
        get(){
            return this.isDone
          },
          set(updateIsDone,  todoIndex) {
           this.$store.dispatch(
          "okay",
          {isDone: updateIsDone, todoIndex: this.todoIndex}
        )         
          console.log(todoIndex)
        }
    },
  },
}
</script>

<style scoped>
  .done{
    text-decoration: line-through;
    color: #BBB;
  }
  .editcomment{
    cursor: pointer;
    font-size: 14px;
  }
</style>