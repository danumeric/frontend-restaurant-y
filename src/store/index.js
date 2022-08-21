import Vue from 'vue'
import Vuex from 'vuex'
import categories from './modules/categories'
import dishes from './modules/dishes'
Vue.use(Vuex)
const apiAdress = 'https://resta-back-db.herokuapp.com/api'
//const apiAdress = 'http://localhost:4001/api'
export { apiAdress }
export default new Vuex.Store({

  modules: {
    categories, dishes
  }
})
