<template>
  <div class="payment">
    <div class="payment--content">
      <router-link to="/" class="payment--go-back">
        <Arrow />Voltar
      </router-link>
      <OrderForm />
    </div>
    <Cart class="cart-menu" />
  </div>
</template>

<script>
import Cart from "../Cart/Cart";
import OrderForm from "./Components/OrderForm";
import Mixin from "@/mixins/mixins";
import Arrow from "@/assets/icons/arrow.svg";

export default {
  name: "Payment",
  components: {
    Cart,
    OrderForm,
    Arrow,
  },
  mixins: [Mixin],
};
</script>

<style scoped lang="less">
.payment {
  display: flex;

  &--content {
    flex-grow: 1;
    padding: 50px;

    .payment--go-back {
      font-weight: 600;
      font-size: 18px;
      text-decoration: none;
      color: black;
      max-width: 720px;
      display: block;
      margin: auto;
    }
  }
}

@media @small-desktops {
  .payment {
    &--content {
      padding: 50px 20px;

      .payment--go-back {
        max-width: 600px;
      }
    }

    .cart-menu {
      display: none;
    }
  }
}

@media @smartphones {
  .payment {
    &--content {
      padding: 35px 20px;
    }

    .payment--go-back {
      font-size: 16px;
    }
  }
}
</style>
