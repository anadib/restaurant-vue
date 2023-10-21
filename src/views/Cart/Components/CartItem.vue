<template>
  <div class="item">
    <Quantity :item="item" class="item--quantity" />
    <div class="item--img-container">
      <img class="item--img" :src="imagePath" alt="" />
    </div>
    <div class="content">
      <h3 class="item--name">{{ item.name }}</h3>
      <a class="item--observation" @click="onShowObservationModal">
        Adicionar observação
      </a>
      <p class="item--observation-text">{{ item.observations }}</p>
    </div>
    <p class="item--price">{{ item.price | currency }}</p>
    <Modal
      :show="showObservationModal"
      @on-modal-close="onCloseObservationModal()"
    >
      <div class="modal-content">
        <h2>Adicionar observação</h2>
        <textarea v-model="item.observations" rows="8"></textarea>
        <button class="secondary-button" @click="onCloseObservationModal">
          Cancelar
        </button>
        <button class="primary-button" @click="saveObservation">Salvar</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Quantity from "@/components/Quantity";
import Modal from "@/components/Modal";

export default {
  name: "CartItem",
  components: {
    Quantity,
    Modal,
  },
  // Não existe mais o filter no vue3
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  props: {
    item: {},
  },
  data() {
    return {
      showObservationModal: false,
    };
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
    imagePath() {
      return require(`@/assets/images/${this.item.id}.png`);
    },
  },
  methods: {
    onShowObservationModal() {
      this.showObservationModal = true;
    },
    onCloseObservationModal() {
      this.showObservationModal = false;
    },
    saveObservation() {
      this.$store.dispatch("addObervation", this.item);
      this.showObservationModal = false;
    },
  },
};
</script>

<style scoped lang="less">
.item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid @light-grey;

  &--img-container {
    background: @light-yellow;
    border-radius: 8px;
    width: 70px;
    height: 66px;
    display: flex;
    align-items: center;
  }

  &--img {
    width: 65px;
    display: block;
    margin: auto;
  }

  &--name {
    font-weight: 600;
    font-size: 14px;
    margin: 0;
  }

  &--observation {
    font-weight: 500;
    font-size: 12px;
    color: @dark-grey;
    text-decoration: underline;
    cursor: pointer;
  }

  &--observation-text {
    font-size: 11px;
    color: @dark-grey;
    margin-bottom: 0;
    margin-top: 5px;
    word-break: break-all;
  }

  .content {
    flex-grow: 1;
    padding: 0 20px;
  }

  &--price {
    font-weight: 600;
    font-size: 16px;
    line-height: 27px;
    color: @yellow;
    min-width: 80px;
    text-align: right;
  }

  .modal-content {
    text-align: center;

    h2 {
      font-size: 22px;
      margin-top: 0;
    }

    textarea {
      width: 80%;
      margin-bottom: 20px;
    }

    button + button {
      margin-left: 15px;
    }
  }
}

@media @tablets {
  .item {
    flex-wrap: wrap;
    padding: 12px;
    border: 1px solid @light-grey;
    border-radius: 8px;

    & + .item {
      margin-top: 15px;
    }

    &--img-container {
      order: 1;
    }

    .content {
      order: 2;
      width: calc(100% - 70px);
    }

    &--quantity {
      order: 3;
      padding: 0;
      width: 70px;
      justify-content: center;
    }

    &--price {
      order: 4;
      padding: 0 20px;
      margin: 0;
    }
  }
}
</style>
