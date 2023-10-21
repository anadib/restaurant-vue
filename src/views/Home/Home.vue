<template>
  <div class="home">
    <router-link to="/cart" class="cart-icon">
      <CartIcon />
    </router-link>
    <CategoryMenu />
    <ItemsList />
    <Cart class="cart-menu" />
  </div>
</template>

<script>
import CategoryMenu from "./Components/CategoryMenu";
import ItemsList from "./Components/ItemsList";
import Cart from "../Cart/Cart";
import Mixin from "@/mixins/mixins";

import CartIcon from "@/assets/icons/cart.svg";

export default {
  name: "HomeView",
  components: {
    CategoryMenu,
    ItemsList,
    Cart,
    CartIcon,
  },
  mixins: [Mixin],
};
</script>

<style scoped lang="less">
.home {
  display: flex;

  .cart-icon {
    display: none;
  }
}

@media @small-desktops {
  .home {
    flex-direction: column;

    .cart-menu {
      display: none;
    }

    .cart-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: @pink;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 20px 20px auto;
    }
  }
}
</style>
