<template>
  <div class="title d-none d-lg-block mt-2">
    
    <div class="title_fade-block"></div>
    <div class="title__text container">
      <div class="row py-5">
        <div class="col-lg-12 mx-auto">
          <div class="text-white pt-4 shadow-sm rounded banner">
            <h1 class="display-4">Наш шеф представляет</h1>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  
</template>

<style lang="scss" scoped>
.title {
  &__text {
    &:after {
      max-height: 200px;
      content: "";
      background-image: url("@/assets/images/background-restaurant.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.8;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
    }
  }
  &__fade-block {
  }
}
</style>

