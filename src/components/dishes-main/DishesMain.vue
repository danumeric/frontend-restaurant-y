<template>
  <div class="container-fluid mt-5">
    <div class="px-lg-5">
      <div class="row">
        <!-- dish -->
        <DishItem
          :dish="dish"
          v-for="dish in getDisplayedDishes"
          :key="dish.id"
        />
      </div>
    </div>
  </div>
</template>
<script>
import DishItem from "@/components/dishes-main/DishItem";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: { DishItem },
  created() {},
  computed: {
    ...mapGetters(["getDishesByCategory", "getDisplayedDishes"]),
  },
  mounted() {
    this.dlDishes();
    this.changeChoosedCategory(0);
  },
  methods: {
    ...mapMutations(["changeChoosedCategory"]),
    ...mapActions(["dlDishes"]),
  },
};
</script>
<style scoped>
</style>