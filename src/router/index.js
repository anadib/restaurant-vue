import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home";
import Payment from "../views/Payment/Payment";
import Cart from "../views/Cart/Cart";
import AddToCart from "../views/AddToCart/AddToCart";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/addToCart/:id",
    name: "AddToCart",
    component: AddToCart,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
