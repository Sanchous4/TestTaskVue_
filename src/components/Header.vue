<script>
export default {
  name: "Header",
  // required и default объявлены в пустую
  // Здесь нужно установить , что props required и default
  props: {
    cart: Array,
    required: true,
    default: {}, // default следует быть массивом
    currency: String,
  },
  data() {
    return {
      cartPrice: 0,
    };
  },
  watch: {
    // Можно просто сart и this
    cart(cart) {
      // Быстрее прибавить к корзине, чем постояннно использовать цикл
      let val = 0;
      cart.forEach((item) => {
        val += item.price * item.amount;
      });
      this.cartPrice = val;
    },
  },
};
</script>

<style scoped>
/* Лучше использовать rem или em, а не пиксили */
.header {
  padding: 10px;
  background: #e5e5e5;
}
</style>

<template>
  <div class="header">
    <h3>Товаров в корзине на: {{ cartPrice }} {{ currency }}</h3>
  </div>
</template>
