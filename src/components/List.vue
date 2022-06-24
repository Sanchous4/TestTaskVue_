<template>
  <div class="product-list">
    <!-- Здесь явно не хватате ключей для цикла -->
    <div
      class="card"
      v-for="product in products"
      :style="{ width: cardsWidth + `%` }"
    >
      <p class="card-title">{{ product.title }}</p>
      <!-- В alt желательно передать product.title -->
      <img class="card-image" :src="product.image" alt="" />
      <p class="card-price">Цена: {{ product.price }} {{ currency }}</p>

      <div>
        <input type="number" ref="amount" :id="product.id" />
        <span>кг</span>
      </div>

      <!-- Лучше сделать цикл с индексом элемента и передать его в функцию -->
      <button @click="addToCart(product)">В корзину</button>
    </div>
  </div>
</template>

<script>
export default {
  // Здесь нужно установить , что props required
  props: {
    currency: String,
  },
  data() {
    return {
      products: [],
      width: window.innerWidth, // innerWidth - число, а не строка
    };
  },
  computed: {
    // Лучше использовать стили с grid, чем устанавливать слушатель на resize
    cardsWidth() {
      let count = 1;
      if (this.width > 840) {
        count = 3;
        // Небходимо использовать return , а не else if
      } else if (this.width > 420 && this.width < 840) {
        count = 2;
      }
      return 100 / count;
    },
  },
  methods: {
    cardsWidthChanged(event) {
      this.width = event.target.innerWidth;
    },
    startPricesMonitoring() {
      // Нужно сохранить таймер в this.timer
      setInterval(this.getList, 2000); // установил две секунды для обновления
    },

    async getList() {
      // Первый запрос должен быть при монтировании компонента (mounted)
      // Const больше подходит здесь, чем let
      let data = await this.$store.dispatch("getProductsList");
      this.products = data;
    },

    // Лучше бы проверить на отрицательное значение
    addToCart(product) {
      // Const больше подходит здесь, чем let
      let amount = this.$refs.amount.find(
        (input) => input.id === product.id
      ).value;

      // Const больше подходит здесь, чем let
      let data = {
        amount,
        price: product.price,
        title: product.title,
      };

      // Здесь необходим emit
      this.$parent.cart.push(data);
    },
  },
  created() {
    window.addEventListener("resize", this.cardsWidthChanged);
    this.startPricesMonitoring();
  },
  destroyed() {
    // Вот тут нужно вызвать clearInterval(this.timer)
    window.removeEventListener("resize", this.cardsWidthChanged);
  },
};
</script>


<style>
/* scoped отсутствует, а он ведь будет причиной конфликта стилей */
/* Лучше использовать rem или em, а не пиксили */
.product-list {
  padding: 10px;
}

.card {
  display: inline-block;
  width: 100%;
  border: 1px solid #908888;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
}

.card-image {
  width: 100%;
}

/* Глобальные стили могут привести к накладыванию стилей на другие элементы (buttons) */
button {
  padding: 5px;
  margin: 5px;
}
</style>
