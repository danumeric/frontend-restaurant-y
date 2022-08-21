<template>
  <div class="">
    <b-navbar
      class="p-0"
      fixed="top"
      toggleable="lg"
      type="dark"
      variant="dark"
    >
      <div class="navbar-brand mx-1" @click="changeChoosedCategory(0)">
        <img
          src="@/assets/images/logo-rest_cr.png"
          width="99"
          height="33"
          alt="logo"
        />
      </div>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav :justified="true" class="d-flex flex-wrap">
          <div v-for="category in getAllCategories" :key="category.id">
            <b-nav-item href="#" @click="changeChoosedCategory(category.id)">{{
              category.title
            }}</b-nav-item>
          </div>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-modal.modal-1 @click="resetFormFields"
            >Добавить блюдо</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "HeaderMenu",
  mounted() {
    this.dlCategories();
  },
  computed: {
    ...mapGetters(["getAllCategories"]),
  },
  methods: {
    ...mapMutations(["changeChoosedCategory", "resetFormFields"]),
    ...mapActions(["dlCategories"]),
  },
};
</script>

<style lang="scss" scoped>
</style>