<template>
  <div class="category-menu">
    <ul>
      <li
        v-for="category in categoriesList"
        :key="category.id"
        @click="onCategoryClick(category.id)"
        :class="{ active: isActive(category.id) }"
      >
        <component :is="category.icon" />
        <p>{{ category.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Pizza from "@/assets/icons/pizza.svg";
import Combo from "@/assets/icons/french-fries.svg";
import Desert from "@/assets/icons/ice-cream.svg";
import Drinks from "@/assets/icons/smothie.svg";
import Burguer from "@/assets/icons/food.svg";

export default {
  name: "CategoryMenu",
  components: {
    Pizza,
    Combo,
    Desert,
    Drinks,
    Burguer,
  },
  data() {
    return {
      categoriesList: [
        { label: "Pizza", icon: "Pizza", id: "pizza" },
        { label: "Bebidas", icon: "Drinks", id: "drinks" },
        { label: "Doces", icon: "Desert", id: "deserts" },
        { label: "Combos", icon: "Combo", id: "combo" },
        { label: "Burguers", icon: "Burguer", id: "burguers" },
      ],
      selectedCategory: "",
    };
  },
  mounted() {
    this.onCategoryClick("pizza");
  },
  methods: {
    onCategoryClick(id) {
      this.selectedCategory = id;
      this.$store.dispatch("changeCategory", id);
    },
    isActive(id) {
      return this.selectedCategory === id;
    },
  },
};
</script>

<style scooped lang="less">
.category-menu {
  width: 110px;
  min-width: 110px;
  min-height: 100vh;
  background: white;
  display: flex;
  align-items: baseline;
  padding-top: 30px;

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
    margin: 20px 0;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 95px;
      cursor: pointer;

      p {
        margin-bottom: 0px;
        margin-top: 5px;
        font-weight: 500;
        font-size: 12px;
        color: @dark-grey;
      }

      svg {
        path {
          fill: @dark-grey;
        }
      }

      &.active {
        background: @yellow;
        border-radius: 8px;

        p {
          color: black;
        }

        svg {
          path {
            fill: black;
          }
        }
      }
    }
  }
}

@media @small-desktops {
  .category-menu {
    width: 100%;
    max-width: 730px;
    height: fit-content;
    margin: auto;
    align-items: center;
    min-height: unset;
    padding-top: 0;
    border-radius: 8px;

    ul {
      display: flex;
      margin: 20px;
      justify-content: space-around;

      li {
        min-width: 78px;
        margin: 0;
        padding: 0 15px;
        width: 100%;
      }
    }
  }
}

@media @smartphones {
  .category-menu {
    ul {
      justify-content: unset;
      overflow-x: scroll;
    }
  }
}
</style>
