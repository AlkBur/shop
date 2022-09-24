const Order = {
    name: "Order",
  template: `
    <div class="container" style="align-items:flex-start; width:100%">
      <div class="is-flex is-justify-content-center py-2">
        <h1 id="title" class="title">Выбранные товары в заказе</h1>
      </div>
      <div class="b-table pb-2" v-if="!message">
        <div class="table-wrapper has-mobile-cards">
          <!-- The table component -->
          <Table :isOrder="true"></Table>
        </div>
      </div>

      <div class="is-flex is-justify-content-center field is-grouped">
            
     
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Информация по вашему заказу на текущий момент
          </p>
        </header>
        <div class="card-content">

              <div class="content">
                Итого заказано позиций {{currentCount}} на общее количество {{orderCount}} и сумму {{orderAmount}}
              </div>


        </div>
        <footer class="card-footer">
          <a class="card-footer-item has-background-warning" @click.prevent.stop="$router.push('/buy')" v-if="orderCount">Оформить</a>
          <a class="card-footer-item" @click.prevent.stop="$router.push('/list')">Перейти к покупкам</a>
        </footer>
      </div>

      </div>


    </div>`,
    computed: {
      orderCount() {
          return this.$store.state.order.count;
      },
      orderAmount() {
        return this.$store.state.order.amount;
      },
      currentCount() {
        return this.$store.state.goods.length;
    },
  },
  
  data() {
      return {
        message: ""
      };
  },
}