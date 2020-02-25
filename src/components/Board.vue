<template>
  <div>
    <header>
      My todo list
    </header>
    <main>
      <p class="info-todo">
        All todo : {{ amountOfTodo }} todo
      </p>
      <p class="info-edit">
        ※double click to edit todo !
        </p>
      <search @child="adult" />

      <label>
        <NewCheckbox  :pushed="this.showOnlyDoneTodo"
                      @checkPushed="showOnlyDoneTodoCheck"
                      />
        <!-- showOnlyDoneTodoといいうデータを渡す -->
        See only done todo
      </label>

      <label>
        <NewCheckbox :pushed="this.showOnlyUndone"
                      @checkPushed="showOnlyUndoneCheck"
        />
        See only undone todo
      </label>
<!--  
      <label>
         <Undone  :showOnlyUndone="this.showOnlyUndone"
                  @showOnlyUndone="clickedd"/>
         See only undone todos
      </label>  -->
      
        <div class="todo-index">
            <todo v-for="(todo, index) in filteredTodos"
                  :key="todo.id"
                  :title="todo.title"
                  :todoIndex="index"
                  :isDone="todo.isDone"
                  @edit="editreceived"
            />
            <todo-add />
        </div>
    </main>
  </div>
</template>

<script>
import TodoAdd from "./TodoAdd"
import Todo from "./Todo"
import { mapState } from 'vuex'
import Search from "./Search"
import NewCheckbox from "./NewCheckbox"

export default {
  components: {
    TodoAdd,
    Todo,
    Search,
    NewCheckbox,
  },
  data() {
    return {
      searchWord: '',
      showOnlyUndone: false,
      showOnlyDoneTodo: false,
    }
  },
  computed: {
    ...mapState([
      "todos"
    ]),
    amountOfTodo() {
      return this.todos.length
    },
    filteredTodos() {
      return this.todos.filter((todo) => {
        if (this.showOnlyDoneTodo == true) {
       
          return todo.isDone && todo.title.includes(this.searchWord)

        } else if (this.showOnlyUndone == true){

            return !todo.isDone && todo.title.includes(this.searchWord)
        } else {
          return todo.title.includes(this.searchWord);
        }
      })
    },
  },
  methods: {
     adult(searchWord) {
      this.searchWord = searchWord
      },
      editreceived(title) {
        this.title = title
      },
      clickedd(localUnchecked) {
        this.showOnlyUndone = localUnchecked
      },
      showOnlyDoneTodoCheck(isCheck) {
        this.showOnlyDoneTodo = isCheck
      },
      showOnlyUndoneCheck(isCheck) {
        this.showOnlyUndone = isCheck;
      }
  }
}
</script>

<style scoped>
.info-edit{
  font-size: 13px;
}

</style>