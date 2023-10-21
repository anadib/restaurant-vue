<template>
  <div class="items-list">
    <Loading v-if="isLoading" />
    <Item v-for="item in itemsList" :key="item.id" :item="item" />
  </div>
</template>

<script>
import axios from "axios";
import Item from "./Item";
import Loading from "@/components/Loading";

export default {
  name: "ItemsList",
  components: {
    Item,
    Loading,
  },
  data() {
    return {
      itemsList: [],
      isLoading: false,
    };
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
  },
  watch: {
    selectedCategory() {
      this.getItemsList();
    },
  },
  created() {
    this.getItemsList();
  },
  methods: {
    getItemsList() {
      this.isLoading = true;
      this.itemsList = [];

      setTimeout(() => {
        axios
          .get(`http://localhost:3000/${this.selectedCategory}`)
          .then((response) => {
            this.itemsList = response.data;
            this.isLoading = false;
          });
      }, [500]);
    },
  },
};
</script>

<style lang="less" scoped>
.items-list {
  width: 100%;
  margin: 30px 50px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

@media @small-desktops {
  .items-list {
    width: 100%;
    max-width: 800px;
    margin: 50px auto;
    justify-content: center;
  }
}

@media @smartphones {
  .items-list {
    margin: 0px;
    padding: 20px;
  }
}
</style>
