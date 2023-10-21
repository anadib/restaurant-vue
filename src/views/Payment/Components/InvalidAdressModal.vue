<template>
  <div class="invalid-addres-modal">
    <span class="icon" v-html="warningIcon"></span>
    <p>Na modalidade delivery é necessário adicionar um endereço válido.</p>
  </div>
</template>

<script>
import feather from "feather-icons";

export default {
  name: "InvalidAdressModal",
  computed: {
    warningIcon() {
      return feather.icons["alert-triangle"].toSvg();
    },
  },
};
</script>

<style scoped lang="less">
.invalid-addres-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;

  .icon {
    margin-bottom: 10px;
  }

  p {
    margin: 0 0 5px;
  }
}
</style>
