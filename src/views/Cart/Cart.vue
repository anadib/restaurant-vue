<template>
  <div class="cart-wrapper">
    <router-link to="/" class="cart--go-back"> <Arrow />Voltar </router-link>
    <div class="cart">
      <h2 class="cart--title">Seu pedido</h2>
      <div class="cart--content">
        <p v-if="hasNoItem">Seu carrinho ainda está vazio :(</p>
        <transition-group name="list">
          <CartItem v-for="item in cartList" :key="item.id" :item="item" />
        </transition-group>
      </div>
      <div class="cart--total" v-if="!hasNoItem">
        <span>Total: </span>
        <span class="price">{{ getCartTotal | currency }}</span>
      </div>
      <button
        class="primary-button payment-button"
        @click="goToPayment"
        v-if="!!cartList.length && !isPaymentScreen"
      >
        Finalizar compra
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartItem from "./Components/CartItem";
import Mixin from "@/mixins/mixins";
import Arrow from "@/assets/icons/arrow.svg";

export default {
  name: "Cart",
  components: {
    CartItem,
    Arrow,
  },
  // Não existe mais o filter no vue3
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  mixins: [Mixin],
  computed: {
    ...mapGetters(["getCartTotal"]),
    cartList() {
      return this.$store.state.cartList;
    },
    hasNoItem() {
      return !this.cartList.length;
    },
    isPaymentScreen() {
      return this.$route.name === "Payment";
    },
  },
  methods: {
    goToPayment() {
      this.$router.push({ name: "Payment" });
      window.scroll(0, 0);
    },
  },
};
</script>

<style scoped lang="less">
.cart-wrapper {
  background: white;

  .cart {
    width: 485px;
    min-width: 485px;
    min-height: 100vh;
    padding: 50px 30px 50px 30px;
    display: flex;
    flex-direction: column;

    &--title {
      font-weight: 600;
      font-size: 22px;
      margin-top: 0;
    }

    &--content {
      overflow: auto;
    }

    &--total {
      font-weight: 600;
      font-size: 17px;
      text-align: right;
      margin-top: 30px;

      .price {
        color: @yellow;
        padding-left: 10px;
      }
    }
  }

  .cart--go-back {
    display: none;
  }

  .payment-button {
    width: 100%;
    margin: 20px auto 0;
    cursor: pointer;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
}

@media @small-desktops {
  .cart-wrapper {
    background: @bg-color;
    padding: 50px 20px;

    .cart {
      width: 100%;
      max-width: 600px;
      min-width: unset;
      padding: 20px;
      margin: 30px auto;
      min-height: unset;
      border-radius: 8px;
      background: white;
      margin: 30px auto 0;

      &--title {
        font-size: 22px;
      }

      &--content {
        flex-grow: 1;
        height: 100%;
      }

      .payment-button {
        width: 100%;
        margin-bottom: 30px;
      }
    }

    .cart--go-back {
      display: block;
      font-weight: 600;
      font-size: 18px;
      text-decoration: none;
      color: black;
      margin-bottom: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
  }
}

@media @smartphones {
  .cart-wrapper {
    background: white;
    padding: 35px 20px;

    .cart {
      margin-top: 10px;

      &--title {
        margin: 0 0 20px;
      }

      .payment-button {
        margin-bottom: 0;
      }
    }

    .cart--go-back {
      font-size: 16px;
    }
  }
}
</style>
