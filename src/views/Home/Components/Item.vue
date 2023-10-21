<template>
  <div class="item" @click="addToCart">
    <div class="container">
      <div class="item--tag" v-if="item.offer">Oferta</div>
      <img class="item--img" :src="imagePath" alt="" />
    </div>
    <div class="content">
      <h2 class="item--name">{{ item.name }}</h2>
      <p class="item--description">{{ item.description }}</p>
      <p class="item--price">{{ item.price | currency }}</p>
    </div>
  </div>
</template>

<script>
import Mixin from "@/mixins/mixins";

export default {
  name: "Item",
  // Não existe mais o filter no vue3
  filters: {
    currency(value) {
      if (!value) return;
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  mixins: [Mixin],
  props: {
    item: {},
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
    imagePath() {
      if (!this.item?.id) return;
      return require(`@/assets/images/${this.item.id}.png`);
    },
  },
  methods: {
    addToCart() {
      if (this.isDesktop()) {
        this.$store.dispatch("addToCart", this.item);
        return;
      }
      if (this.$router.history.current.name !== "AddToCart") {
        this.$router.push({ name: "AddToCart", params: { id: this.item.id } });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  width: 216px;
  height: 250px;
  border-radius: 8px;
  background: white;
  position: relative;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &--tag {
    position: absolute;
    background: @pink;
    border-radius: 12px;
    color: white;
    top: 15px;
    right: 15px;
    font-weight: 500;
    font-size: 12px;
    padding: 3px 8px;
  }

  &--img {
    display: block;
    margin: auto;
    width: 65%;
  }

  &--name {
    font-weight: 600;
    font-size: 16px;
    margin: 0;
  }

  &--description {
    color: @dark-grey;
    font-weight: 300;
    font-size: 12px;
    margin: 0;
  }

  &--price {
    font-weight: 600;
    font-size: 18px;
    color: @yellow;
    margin: 0;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
  }
}

@media @smartphones {
  .item {
    width: 100%;
    height: fit-content;
    border: 1px solid @light-grey;
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    padding: 10px 20px;

    &--tag {
      position: static;
      order: 1;
      width: fit-content;
    }

    &--img {
      width: 86px;
      order: 0;
      margin-bottom: 10px;
      margin-top: 0;
    }

    &--price {
      text-align: right;
      margin: 5px 0 0 auto;
    }

    .content {
      flex-grow: 1;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
  }
}
</style>
