<template>
  <div class="empty-card-modal">
    <span class="icon" v-html="warningIcon"></span>
    <p>
      O carrinho ainda está vazio, adicione um produto para concluir o pedido.
    </p>
  </div>
</template>

<script>
import feather from "feather-icons";

export default {
  name: "EmptyCardModal",
  computed: {
    warningIcon() {
      return feather.icons["alert-triangle"].toSvg();
    },
  },
};
</script>

<style scoped lang="less">
.empty-card-modal {
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
