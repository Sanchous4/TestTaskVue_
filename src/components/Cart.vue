<template>
  <div class="cart-list">
    <!-- Здесь явно не хватате ключей для цикла -->
    <div v-for="item in spisok_dlya_rendera">
      {{ item }}
    </div>
  </div>
</template>;

<script>
export default {
  // Необходимо прописать props required и default
  props: {
    cart: Array,
  },
  computed: {
    // Название на русском лучше не писать
    spisok_dlya_rendera() {
      // Нужно использовать копию списка, а не сам пропс
      return [...this.cart].reverse();
    },
  },
};
</script>

<style>
</style>
