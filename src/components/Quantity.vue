<template>
  <div class="item--quantity">
    <button
      class="buttons"
      @click="onDecreaseButtonClick"
      :disabled="item.quantity === 0 || doNotRemoveFromCart"
    >
      -
    </button>
    <span class="number">{{ item.quantity }}</span>
    <button class="buttons" @click="onIncreaseButtonClick">+</button>
    <Modal :show="showModal" @on-modal-close="onCancelButtonClick">
      <div class="modal-content">
        <h2>Deseja remover esse item do carrinho?</h2>
        <button class="secondary-button" @click="onCancelButtonClick">
          Cancelar
        </button>
        <button class="primary-button" @click="onRemoveButtonClick">
          Sim, remover
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "./Modal.vue";

export default {
  name: "Quantity",
  components: {
    Modal,
  },
  props: {
    item: {},
    useStore: {
      type: Boolean,
      default: true,
    },
    doNotRemoveFromCart: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    onDecreaseButtonClick() {
      if (this.useStore) {
        this.decreaseQuantity(this.item.id);
        if (!this.item.quantity) this.showModal = true;
        return;
      }

      --this.item.quantity;
    },
    onIncreaseButtonClick() {
      if (this.useStore) {
        this.increaseQuantity(this.item.id);
        return;
      }

      ++this.item.quantity;
    },
    onCancelButtonClick() {
      this.increaseQuantity(this.item.id);
      this.showModal = false;
    },
    onRemoveButtonClick() {
      this.showModal = false;
      this.$nextTick(() => {
        this.$store.dispatch("removeFromCart", this.item.id);
      });
    },
  },
};
</script>

<style scooper lang="less">
.item--quantity {
  display: flex;
  align-items: center;
  padding-right: 20px;

  .number {
    font-weight: 500;
    font-size: 16px;
    color: @yellow;
    width: 24px;
    text-align: center;
  }

  .buttons {
    background: none;
    border: none;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;

    &:focus {
      outline: 0;
    }
  }

  .modal-content {
    text-align: center;

    h2 {
      font-size: 22px;
      margin-top: 0;
    }

    button {
      margin-left: 10px;
      margin-top: 20px;
    }
  }
}

@media @tablets {
  .modal-content {
    button {
      padding: 8px 20px;
    }
  }
}
</style>
