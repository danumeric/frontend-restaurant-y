<template>
  <div class="col-xl-3 col-lg-4 col-md-6 mb-4 card">
    <div class="h3 mb-0 position-absolute icons">
      <b-icon-basket @click="deleteDish(dish.id)" class="icon"></b-icon-basket>
      <b-icon-sliders @click="editDish()" class="icon"></b-icon-sliders>
    </div>

    <div class="bg-white rounded shadow">
      <img
        :src="`${apiAdress}/img/${dish.id}`"
        alt="dish photo"
        class="img-fluid card-img-top"
      />
      <div class="px-4 pb-4">
        <h5 style="height: 2em">
          <a href="#" class="text-dark">{{ dish.title }}</a>
        </h5>
        <p class="small text-muted mb-0 pt-1" style="height: 3em">
          {{ dish.description }}
        </p>
        <div
          class="
            d-flex
            align-items-center
            justify-content-between
            rounded-pill
            bg-light
            px-3
            py-2
            mt-4
          "
        >
          <p class="small mb-0">
            <i class="fa fa-picture-o mr-2"></i
            ><span class="font-weight-bold">{{ dish.priceRub }} руб.</span>
          </p>
          <div
            class="badge badge-secondary px-3 rounded-pill font-weight-normal"
          >
            {{ dish.weight }} {{ dish.isLiquid ? "мл." : "гр." }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiAdress } from "@/store/index.js";
import { BIconBasket, BIconSliders } from "bootstrap-vue";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "DishItem",
  data() {
    return { apiAdress: apiAdress };
  },
  components: {
    BIconBasket,
    BIconSliders,
  },
  props: {
    dish: Object,
  },
  methods: {
    ...mapMutations(["setFormFields"]),
    ...mapActions(["deleteDish"]),
    editDish() {
      this.setFormFields(this.dish);
      this.$bvModal.show("modal-1");
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 220px;
  height: 220px;
  object-fit: scale-down; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}
.icons {
  right: 20px;
  display: none;
}
.icon {
  margin: 0px 0px 0px 10px;
  cursor: pointer;
}
.card:hover .icons {
  display: block;
}
</style>

