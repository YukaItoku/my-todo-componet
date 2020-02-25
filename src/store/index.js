import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedTodos = localStorage.getItem("todo-Lists")
// ()内は設定したキー

const store = new Vuex.Store({
  state: {
    todos: savedTodos ? JSON.parse(savedTodos):
    [
      // localStorageに保存されたリストがあれば取得、なければデフォルトのリスト配列を設置
      {
        title: "laundry", 
        editing: false,
        isDone: false,
      },
      {
        title: "shopping",
        editing: false,
        isDone: true
      }
    ],
  },
  mutations: {
    addtodo(state, payload) {
      state.todos.push({ title: payload.title, editing: false, isDone: payload.isDone})
      
    },
    removetodo(state, payload) {
      state.todos.splice(payload.todoIndex, 1)
    },

    /**
     * TODOの更新
     * @param {*} state 
     * @param {*} payload 
     */
    editover(state, payload) {
      let newTodo = Object.assign(
        {},
        state.todos[payload.todoIndex],
        {
          title: payload.title
        }
      )
      state.todos.splice(payload.todoIndex, 1, newTodo)
    },
    okay(state, payload) {
      
      let newIsDone = Object.assign(
        {},
        state.todos[payload.todoIndex],
        {
          isDone: payload.isDone
        }
        )
        state.todos.splice(payload.todoIndex, 1, newIsDone)
    },

  },
  actions: {
    addtodo(context, payload) {
      context.commit('addtodo', payload)
    },
    removetodo(context, payload) {
      context.commit('removetodo', payload)
    },
    editover(context, payload) {
      context.commit('editover', payload) 
    },
    okay(context, payload) {
      context.commit('okay', payload)
     
    }
  },
  getters: {
  },

})
store.subscribe((mutation, state) => {
  localStorage.setItem('todo-Lists', JSON.stringify(state.todos))
  
})
// subscribeはストアのインスタンスメソッドで、全てのmutationの後に呼ばレル
// 第一引数にmutationインスタンス、第二引数にmutation後のデータの状態
// ミューテーションやアクションに処理を挟みたい場合はsubscribe
export default store