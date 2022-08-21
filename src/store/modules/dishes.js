const axios = require('axios').default;
import { apiAdress } from "@/store/index.js";

export default ({
  state: {
    formFields: {
      id: 0,
      title: "",
      weight: "",
      description: "",
      isLiquid: null,
      priceRub: 0,
      categories: [],
    },

    choosedCategory: 0,
    displayedDishes: [],
    dishes: [
    ]
  },

  getters: {
    getFormFields(state) {
      return state.formFields
    },
    getDisplayedDishes(state) {
      return state.displayedDishes
    },
    //category 0 all means all dishes, sorted by first category
    getDishesByCategory(state) {
      let dishesFiltered = state.dishes.filter(dish => {
        if (state.choosedCategory === 0) {
          return true;
        }
        for (let cat of dish.categories) {
          if (cat.id === state.choosedCategory) return true;
        }
        return false;
      })
      if (state.choosedCategory === 0) {
        // console.log(dishesFiltered);
        dishesFiltered.sort((a, b) => {
          return a.categories[0].id - b.categories[0].id

        })
      }
      return dishesFiltered
    },


  },
  mutations: {
    setFormFields(state, fields) {
      state.formFields = fields;
    },
    resetFormFields(state) {
      state.formFields = {
        id: 0,
        title: "",
        weight: "",
        description: "",
        isLiquid: null,
        priceRub: 0,
        categories: [],
      }
    },
    changeChoosedCategory(state, id) {
      state.changeChoosedCategory = id;
      this.commit("changeDisplayedDishes", id)
    },
    changeDisplayedDishes(state, id) {

      let dishesFiltered = state.dishes.filter(dish => {
        if (id === 0) {
          return true;
        }
        for (let cat of dish.categories) {
          if (cat.id === id) return true;
        }
        return false;
      })
      if (id === 0) {
        dishesFiltered.sort((a, b) => {
          return a.categories[0].id - b.categories[0].id
        })
      }
      state.displayedDishes = dishesFiltered;

    },
    setDishes(state, dishes) {
      state.dishes = dishes;
      this.commit('changeDisplayedDishes', 0)
    }
  },
  actions: {
    async dlDishes(context) {
      await axios.get(`${apiAdress}/dishes`)
        .then(response => context.commit('setDishes', response.data))
    },

    async deleteDish(context, id) {
      const response = await axios.delete(`${apiAdress}/delete-dish/${id}`)
      console.log('del', response);
      await context.dispatch('dlDishes')

    },



    async addDish(context, { form, image }) {
      let newId = 0;
      await axios.post(`${apiAdress}/add-dish`, {
        form
      }).then(response => {
        console.log(response.data.id);
        newId = response.data.id
      })
      await context.dispatch('submitImg', { image, newId })
      setTimeout(() => {
        context.dispatch('dlDishes')
      }, 1000);
    },

    async editDish(context, form) {
      await axios.post(`${apiAdress}/edit-dish`, {
        form
      }).then(response => {
        console.log(response);
      })
      setTimeout(() => {
        context.dispatch('dlDishes')
      }, 1000);

    },


    submitImg(context, { image, newId }) {
      console.log('newId', newId);
      const formData = new FormData();
      formData.append("image", image);
      const headers = { "Content-Type": "multipart/form-data" };
      axios
        .post(`${apiAdress}/upload-img/${newId}`, formData, { headers })
        .then((res) => {
          if (res.data === "uploaded") {
            console.log('uploaded');
          } else {
            console.log('not uploaded');
          }
        });
    },
  },

})
