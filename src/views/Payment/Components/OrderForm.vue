<template>
  <div class="order">
    <form>
      <div class="user-data">
        <p class="section-title">Seus dados</p>
        <div class="input-field">
          <label for="">{{ formData.name.label }}</label>
          <input
            type="text"
            :placeholder="formData.name.placeholder"
            v-model="formData.name.value"
            @blur="formData.name.isValid"
            :class="{ error: !formData.name.valid }"
          />
          <p v-if="!formData.name.valid" class="error-message">
            {{ formData.name.errorMessage }}
          </p>
        </div>
        <div class="input-field">
          <label for="">{{ formData.cellphone.label }}</label>
          <input
            type="text"
            :placeholder="formData.cellphone.placeholder"
            v-mask="'(##) #####-####'"
            v-model="formData.cellphone.value"
            @blur="formData.cellphone.isValid"
            :class="{ error: !formData.cellphone.valid }"
          />
          <p v-if="!formData.cellphone.valid" class="error-message">
            {{ formData.cellphone.errorMessage }}
          </p>
        </div>
      </div>

      <div class="adress">
        <p class="section-title">Endereço</p>
        <div class="radio-container">
          <div class="radio-options">
            <input
              type="radio"
              name="delivery-type"
              id="store"
              value="store"
              v-model="deliveryType"
            />
            <label for="store">Retirar na loja</label>
          </div>
          <div class="radio-options">
            <input
              type="radio"
              name="delivery-type"
              id="delivery"
              value="delivery"
              v-model="deliveryType"
            />
            <label for="delivery">Delivery</label>
          </div>
        </div>
        <div class="adress-card" v-if="isDeliveryType && !!adressFormData">
          <p>{{ adressFormData.street }}, {{ adressFormData.number }}</p>
          <p>{{ adressFormData.city }} - {{ adressFormData.cep }}</p>
        </div>
        <a @click="onShowAdressModal" v-if="isDeliveryType">
          {{ adressButtonLabel }}
        </a>
      </div>

      <div class="payment">
        <p class="section-title">Pagamento</p>
        <p>Método de pagamento</p>
        <div class="radio-container">
          <div class="radio-options">
            <input
              type="radio"
              name="payment-type"
              id="credit-card"
              value="credit-card"
              v-model="paymentType"
            />
            <label for="credit-card">Cartão</label>
          </div>
          <div class="radio-options">
            <input
              type="radio"
              name="payment-type"
              id="cash"
              value="cash"
              v-model="paymentType"
            />
            <label for="cash">Dinheiro</label>
          </div>
        </div>
      </div>
    </form>
    <button class="primary-button finish-payment-button" @click="orderItems">
      Concluir pedido
    </button>

    <Modal :show="showAdressModal" @on-modal-close="hideAdressModal">
      <AdressModal
        :hideAdressModal="hideAdressModal"
        :adressModalData="adressModalData"
      />
    </Modal>

    <Modal
      :show="showInvalidAdressModal"
      @on-modal-close="hideInvalidAdressModal"
    >
      <InvalidAdressModal />
    </Modal>

    <Modal :show="showEmptyCardModal" @on-modal-close="hideEmptyCardModal">
      <EmptyCardModal />
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import AdressModal from "./AdressModal";
import InvalidAdressModal from "./InvalidAdressModal";
import EmptyCardModal from "./EmptyCardModal";

export default {
  name: "OrderForm",
  components: {
    Modal,
    AdressModal,
    InvalidAdressModal,
    EmptyCardModal,
  },
  data() {
    return {
      formData: {
        name: {
          label: "Nome*",
          placeholder: "Digite seu nome",
          value: "",
          errorMessage: "O nome é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.name.valid = !!this.formData.name.value.length;
          },
        },
        cellphone: {
          label: "Celular*",
          placeholder: "Digite seu celular",
          value: "",
          errorMessage: "O celular é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.cellphone.valid =
              this.formData.cellphone.value.length === 15;
          },
        },
      },
      showAdressModal: false,
      showInvalidAdressModal: false,
      showEmptyCardModal: false,
      deliveryType: "store",
      paymentType: "credit-card",
      adressFormData: "",
    };
  },
  computed: {
    isUserFormDataValid() {
      let isValid = true;
      isValid &= this.formData.name.valid;
      isValid &= this.formData.cellphone.valid;
      return isValid;
    },
    isAdressFormDataValid() {
      if (this.isDeliveryType && this.adressFormData) return true;
      if (!this.isDeliveryType) return true;
      return false;
    },
    isDeliveryType() {
      return this.deliveryType === "delivery";
    },
    adressButtonLabel() {
      return this.adressFormData ? "Editar endereço" : "Adiconar endereço";
    },
  },
  methods: {
    adressModalData(data) {
      this.adressFormData = data;
    },
    triggerValidations() {
      this.formData.name.isValid();
      this.formData.cellphone.isValid();
      if (this.isDeliveryType && !this.adressFormData) {
        this.showInvalidAdressModal = true;
      }
      if (this.$store.state.cartList.length === 0) {
        this.showEmptyCardModal = true;
      }
    },
    orderItems() {
      this.triggerValidations();
      if (
        !this.isUserFormDataValid ||
        !this.isAdressFormDataValid ||
        this.$store.state.cartList.length === 0
      )
        return;
      const phone = "5511999999999";
      let adress = "";

      if (this.adressFormData) {
        adress = `Endereço: ${this.adressFormData.street} , ${this.adressFormData.number} - ${this.adressFormData.city} - ${this.adressFormData.cep}`;
      } else {
        adress = "Endereço: Retirar na loja";
      }

      let text = `*Restaurante Dib*
      Cliente: ${this.formData.name.value}
      Contato: ${this.formData.cellphone.value}
      ${adress}
      Pedido: ${this.$store.state.cartList.map((item) => {
        return `
          ${item.quantity}x ${item.name} - ${item.observations || ""}`;
      })}`;

      text = window.encodeURIComponent(text);
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`);

      this.$store.dispatch("resetCartList");
      this.$router.push({ name: "Home" });
    },
    onShowAdressModal() {
      this.showAdressModal = true;
    },
    hideAdressModal() {
      this.showAdressModal = false;
    },
    hideInvalidAdressModal() {
      this.showInvalidAdressModal = false;
    },
    hideEmptyCardModal() {
      this.showEmptyCardModal = false;
    },
  },
};
</script>

<style scoped lang="less">
.order {
  max-width: 720px;
  margin: 30px auto;
  background: white;
  border-radius: 8px;
  padding: 30px 50px;

  .input-field {
    display: flex;
    flex-direction: column;

    & + .input-field {
      margin-top: 15px;
    }

    label {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .error-message {
      font-size: 12px;
      color: @error-color;
      margin-bottom: 0;
      margin-top: 8px;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    .section-title {
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 14px;
      margin-top: 30px;
    }

    .radio-container {
      display: flex;
    }

    .adress {
      a {
        color: @pink;
        font-weight: normal;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
        display: block;
        margin-top: 10px;
        width: fit-content;
      }

      .adress-card {
        border-radius: 8px;
        border: 1px solid @dark-grey;
        padding: 10px 15px;
        margin: 15px 0;
        width: fit-content;

        p {
          font-weight: normal;
          font-size: 14px;
          color: @dark-grey;
          margin: 5px 0;
        }
      }
    }

    .radio-options {
      display: flex;
      align-items: center;

      input {
        margin: 0;
      }

      label {
        padding-left: 10px;
        margin: 0;
        font-size: 14px;
      }

      & + .radio-options {
        margin-left: 25px;
      }
    }
  }

  .finish-payment-button {
    margin: 30px auto;
  }
}

@media @small-desktops {
  .order {
    width: 100%;
    max-width: 600px;
    padding: 20px;

    .finish-payment-button {
      width: 100%;
    }
  }

  form {
    .user-data {
      .section-title {
        margin-top: 0;
      }
    }
  }
}

@media @smartphones {
  .order {
    padding: 0 20px;
    margin-bottom: 0;

    .finish-payment-button {
      margin-bottom: 0;
    }
  }
}
</style>
