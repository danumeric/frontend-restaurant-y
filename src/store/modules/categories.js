import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios').default;
import { apiAdress } from "@/store/index.js";

Vue.use(Vuex)
export default ({
  state: {
    categories: [
      // {
      //   "id": 1,
      //   "title": "Вкусняшки"
      // },
      // {
      //   "id": 3,
      //   "title": "Бразильская кухня"
      // },
      // {
      //   "id": 4,
      //   "title": "Вьетнамская кухня"
      // },
      // {
      //   "id": 5,
      //   "title": "Напитки"
      // },
      // {
      //   "id": 6,
      //   "title": "Вегетарианское меню"
      // },
      // {
      //   "id": 2,
      //   "title": "Фастфуд"
      // },

    ]
  },
  getters: {
    getAllCategories(state) {
      return state.categories
    },
  },
  mutations: {
    setCategories(state, cat) {
      state.categories = cat;
    }
  },
  actions: {
    dlCategories(context) {
      axios.get(`${apiAdress}/categories`)
        .then(response => {
          return response
        })
        .then(response => context.commit('setCategories', response.data))

    }
  },

})
