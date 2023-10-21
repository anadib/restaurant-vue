<template>
  <div class="add-cart-wrapper">
    <router-link to="/" class="add-cart--go-back">
      <Arrow />Voltar
    </router-link>
    <div class="add-cart">
      <h2 class="add-cart--title">Adicionar ao carrinho</h2>
      <Item :item="item" class="add-cart--item" />
      <div class="add-cart--container">
        <span>Quantidade</span>
        <Quantity
          :item="item"
          :useStore="false"
          :doNotRemoveFromCart="doNotRemoveFromCart"
        />
      </div>
      <p class="add-cart--observations">Observações</p>
      <textarea v-model="item.observations" rows="4"></textarea>
      <button class="primary-button" @click="onAddToCartButtonClick">
        Adicionar ao carrinho
      </button>
    </div>
  </div>
</template>

<script>
import Mixin from "@/mixins/mixins";
import axios from "axios";
import Item from "../Home/Components/Item";
import Quantity from "@/components/Quantity";
import Arrow from "@/assets/icons/arrow.svg";

export default {
  name: "AddToCart",
  components: {
    Arrow,
    Item,
    Quantity,
  },
  mixins: [Mixin],
  props: ["id"],
  data() {
    return {
      item: {},
    };
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
    doNotRemoveFromCart() {
      return this.item.quantity === 1 && true;
    },
  },
  created() {
    if (this.isDesktop()) {
      this.$router.push({ name: "Home" });
    }
    axios
      .get(`http://localhost:3000/${this.selectedCategory}/${this.id}`)
      .then((response) => {
        this.item = { ...response.data, quantity: 1, observations: "" };
      });
  },
  methods: {
    onAddToCartButtonClick() {
      this.$store.dispatch("addToCart", this.item);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped lang="less">
.add-cart-wrapper {
  background: @bg-color;
  padding: 50px 20px;

  .add-cart {
    background: white;
    width: 100%;
    max-width: 600px;
    margin: 30px auto 0;
    border-radius: 8px;
    padding: 20px;

    &--title {
      font-weight: 600;
      font-size: 22px;
      margin: 0 0 20px;
    }

    &--go-back {
      font-weight: 600;
      font-size: 18px;
      text-decoration: none;
      color: black;
      display: block;
      margin-bottom: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    &--item {
      margin: 30px auto 0;
      border: 1px solid @light-grey;
    }

    &--container {
      display: flex;
      padding: 10px 20px;
      border: 1px solid @light-grey;
      border-radius: 8px;
      margin: 20px 0;

      span {
        font-weight: 600;
        font-size: 16px;
        margin-right: auto;
      }

      .item--quantity {
        padding-right: 0;
      }
    }

    &--observations {
      font-weight: 600;
      font-size: 16px;
    }

    textarea {
      width: 100%;
      border: 1px solid @light-grey;
      border-radius: 8px;
    }

    button {
      display: block;
      width: 100%;
      margin: 30px auto;
    }
  }
}

@media @smartphones {
  .add-cart-wrapper {
    background: white;
    padding: 35px 20px;

    .add-cart {
      margin-top: 10px;

      &--go-back {
        font-size: 16px;
      }

      &--item {
        margin-top: 30px;
      }

      button {
        width: 100%;
        max-width: unset;
      }
    }
  }
}
</style>
