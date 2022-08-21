<template>
  <b-modal id="modal-1" :hide-footer="true" :title="modalTitle">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Наименование блюда:"
        label-for="input-title"
        description="не длиннее 30 символов"
      >
        <b-form-input
          id="input-title"
          v-model="form.title"
          type="text"
          placeholder="Введите наименование блюда"
          maxlength="30"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Описание блюда:"
        label-for="input-description"
        description="не длиннее 75 символов"
      >
        <b-form-input
          id="input-description"
          v-model="form.description"
          placeholder="Введите описание блюда"
          maxlength="75"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Цена:" label-for="input-price">
        <b-form-input
          id="input-price"
          v-model="form.price"
          min="0"
          no-wheel
          max="10000"
          type="number"
          placeholder="Введите цену в рублях"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Масса(объём):"
        label-for="input-weight"
        ><b-form-input
          id="input-weight"
          v-model="form.weight"
          min="0"
          max="5000"
          no-wheel
          type="number"
          placeholder="Введите массу (объём)"
          required
        ></b-form-input>
        <b-form-select
          class="w-50"
          id="input-isLiquid"
          v-model="form.isLiquid"
          :options="measures"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-5"
        label="Выберете категории:"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-checkbox-group
          v-model="form.categories"
          id="checkboxes-5"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox
            v-for="category in getAllCategories"
            :key="category.id"
            :value="{ id: category.id }"
            >{{ category.title }}</b-form-checkbox
          >
          <b-form-text id="input-live-help">{{
            chooseCheckboxWarn
          }}</b-form-text>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-file
        v-if="!this.getFormFields.id"
        name="image"
        type="file"
        @input="uploadFile"
        ref="file"
        placeholder="Изображение блюда (jpg, png, gif)"
        accept="image/jpeg, image/png, image/gif"
        required
      >
      </b-form-file>

      <b-icon-check
        v-if="imgUploadedSuccess"
        class="icon"
        variant="success"
      ></b-icon-check>
      <b-icon-x
        v-if="imgUploadedError"
        class="icon"
        variant="danger"
      ></b-icon-x>

      <div class="mt-3">
        <b-button class="" type="submit" variant="primary">{{
          buttonTitle
        }}</b-button>
        <b-button
          type="reset"
          v-if="!this.getFormFields.id"
          class="float-right"
          variant="danger"
          >Сбросить</b-button
        >
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { BIconCheck, BIconX } from "bootstrap-vue";

export default {
  data() {
    return {
      modalTitle: "",
      buttonTitle: "",
      images: null,
      imgUploadedSuccess: false,
      imgUploadedError: false,
      form: {
        id: 0,
        title: "",
        description: "",
        isLiquid: null,
        categories: [],
        price: null,
        weight: null,
        img: null,
      },
      measures: [
        { text: "Выберите ед.изм.", value: null },
        { text: "гр.", value: false },
        { text: "мл.", value: true },
      ],
      show: true,
    };
  },
  props: {
    lol: String,
  },
  components: {
    BIconCheck,
    BIconX,
  },
  mounted() {
    this.$root.$on("bv::modal::show", (bvEvent, modalId) => {
      if (modalId === "modal-1") {
        const formData = this.getFormFields;

        if (+this.getFormFields.id === 0) {
          this.modalTitle = "Добавить блюдо в меню";
          this.buttonTitle = "Добавить";
        } else {
          this.modalTitle = "Редактировать блюдо в меню";
          this.buttonTitle = "Cохранить";
        }

        this.form.id = formData.id;
        this.form.title = formData.title;

        this.form.description = formData.description;
        this.form.isLiquid = formData.isLiquid;
        this.form.categories = [];
        for (let c of formData.categories) {
          this.form.categories.push({ id: +c.id });
        }

        this.form.price = formData.priceRub;
        this.form.weight = formData.weight;
      }
    });
  },
  computed: {
    ...mapGetters(["getAllCategories", "getFormFields"]),

    chooseCheckboxWarn() {
      return this.form.categories.length === 0
        ? "Выберите хотя бы 1 категорию"
        : "";
    },
  },

  methods: {
    ...mapActions(["addDish", "setImg", "editDish"]),
    uploadFile() {
      this.Images = this.$refs.file.files[0];
    },
    clearForm() {
      this.form.title = "";
      this.form.description = "";
      this.form.isLiquid = null;
      this.form.categories = [];
      this.form.price = 0;
      this.form.img = null;
    },
    onReset(event) {
      event.preventDefault();
      this.clearForm();
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onSubmit(e) {
      e.preventDefault();

      if (this.form.categories.length === 0) {
        return;
      }
      //edit
      if (this.form.id != 0) {
        console.log("edit");
        this.editDish(this.form);

        this.$bvModal.hide("modal-1");
        return;
      }

      //save
      this.addDish({ form: this.form, image: this.Images });
      this.$bvModal.hide("modal-1");
    },
  },
};
</script>