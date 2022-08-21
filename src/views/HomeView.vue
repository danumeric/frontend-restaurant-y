<template>
  <div class="">
    <HeaderMenu />
    <AddDishForm />
    <TitlePhoto />
    <DishesMain />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderMenu from "@/components/header-menu/HeaderMenu";
import TitlePhoto from "@/components/title-photo/TitlePhoto";
import DishesMain from "@/components/dishes-main/DishesMain";
import AddDishForm from "@/components/add-dish/AddDishForm";

AddDishForm;
export default {
  name: "HomeView",
  components: { HeaderMenu, TitlePhoto, DishesMain, AddDishForm },
};
</script>
