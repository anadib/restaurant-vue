<template>
  <div class="modal-content">
    <h1>Adicionar Endereço</h1>
    <div class="input-field">
      <label for="">{{ formData.cep.label }}</label>
      <input
        type="text"
        :placeholder="formData.cep.placeholder"
        v-model="formData.cep.value"
        @blur="formData.cep.isValid"
        :class="{ error: !formData.cep.valid }"
      />
      <p v-if="!formData.cep.valid" class="error-message">
        {{ formData.cep.errorMessage }}
      </p>
    </div>

    <div class="input-field">
      <label for="">{{ formData.city.label }}</label>
      <input
        type="text"
        :placeholder="formData.city.placeholder"
        v-model="formData.city.value"
        @blur="formData.city.isValid"
        :class="{ error: !formData.city.valid }"
      />
      <p v-if="!formData.city.valid" class="error-message">
        {{ formData.city.errorMessage }}
      </p>
    </div>

    <div class="adress-container">
      <div class="input-field">
        <label for="">{{ formData.street.label }}</label>
        <input
          type="text"
          :placeholder="formData.street.placeholder"
          v-model="formData.street.value"
          @blur="formData.street.isValid"
          :class="{ error: !formData.street.valid }"
        />
        <p v-if="!formData.street.valid" class="error-message">
          {{ formData.street.errorMessage }}
        </p>
      </div>

      <div class="input-field">
        <label for="">{{ formData.number.label }}</label>
        <input
          type="text"
          :placeholder="formData.number.placeholder"
          v-model="formData.number.value"
          @blur="formData.number.isValid"
          :class="{ error: !formData.number.valid }"
        />
        <p v-if="!formData.number.valid" class="error-message">
          {{ formData.number.errorMessage }}
        </p>
      </div>
    </div>

    <button class="secondary-button" @click="hideAdressModal">Cancelar</button>
    <button class="primary-button" @click="validateAdressForm">
      Adicionar
    </button>
  </div>
</template>

<script>
export default {
  name: "AdressModal",
  props: {
    hideAdressModal: Function,
    adressModalData: Function,
  },
  data() {
    return {
      formData: {
        cep: {
          label: "CEP*",
          placeholder: "Digite seu cep",
          value: "",
          errorMessage: "O cep é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.cep.valid = !!this.formData.cep.value.length;
          },
        },
        city: {
          label: "Cidade*",
          placeholder: "Digite sua cidade",
          value: "",
          errorMessage: "A cidade é obrigatória",
          valid: true,
          isValid: () => {
            this.formData.city.valid = !!this.formData.city.value.length;
          },
        },
        street: {
          label: "Rua*",
          placeholder: "Digite sua rua",
          value: "",
          errorMessage: "A rua é obrigatória",
          valid: true,
          isValid: () => {
            this.formData.street.valid = !!this.formData.street.value.length;
          },
        },
        number: {
          label: "Número*",
          placeholder: "Digite o número",
          value: "",
          errorMessage: "O número é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.number.valid = !!this.formData.number.value.length;
          },
        },
      },
    };
  },
  computed: {
    isAdressFormValid() {
      let isValid = true;
      isValid &= this.formData.cep.valid;
      isValid &= this.formData.city.valid;
      isValid &= this.formData.street.valid;
      isValid &= this.formData.number.valid;
      return isValid;
    },
  },
  methods: {
    triggerAdressFormValidations() {
      this.formData.cep.isValid();
      this.formData.city.isValid();
      this.formData.street.isValid();
      this.formData.number.isValid();
    },
    validateAdressForm() {
      this.triggerAdressFormValidations();
      if (!this.isAdressFormValid) return;
      this.adressModalData({
        cep: this.formData.cep.value,
        city: this.formData.city.value,
        street: this.formData.street.value,
        number: this.formData.number.value,
      });
      this.hideAdressModal();
    },
  },
};
</script>

<style scoped lang="less">
.modal-content {
  h1 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 22px;
  }

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

  .adress-container {
    display: flex;
    margin-top: 15px;

    .input-field {
      margin: 0;
      width: 100%;

      & + .input-field {
        width: 30%;
        margin-left: 15px;
      }
    }
  }

  button {
    width: calc(50% - 10px);
    text-align: center;
    margin-top: 30px;

    & + button {
      margin-left: 20px;
    }
  }
}

@media @smartphones {
  .modal-content {
    .adress-container {
      .input-field {
        & + .input-field {
          margin-left: 5px;
        }
      }
    }
  }

  .modal-content {
    button {
      width: calc(50% - 2.5px);
      padding: 8px 0;

      & + button {
        margin-left: 5px;
      }
    }
  }
}
</style>
