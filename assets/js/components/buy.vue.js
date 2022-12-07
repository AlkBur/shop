const Buy = {
    name: "Buy",
  template: `
    <div class="notification is-warning w-100" v-if="message">
      <div class="is-flex is-flex-direction-column is-align-items-center">
        <span>{{ message }}</span>
        <br/>
        <a class="button is-black" @click.prevent.stop="$router.push('/list')">
          <strong>Перейти к покупкам</strong>
        </a>
      </div>
    </div>

     <div class="container" style="align-items:flex-start; width:100%" v-if="!message">
     <br/>
     <div class="is-flex is-justify-content-center field is-grouped">

        <div v-if="isLoad" class="ring" style="top: 140%;">Отправка
            <span></span>
        </div>
     
        <div class="card">
          <header class="card-header">
           <p class="card-header-title">
              Информация по вашему заказу
            </p>
          </header>
        <div class="card-content">

        <div v-if="orderAmount != 0" class="content">
          Итого заказано позиций {{currentCount}} на общее количество {{orderCount}} и сумму {{orderAmount}}
        </div>
        <div v-else class="content">
          Итого заказано позиций {{currentCount}} на общее количество {{orderCount}}
        </div>
        <textarea class="textarea" placeholder="Введите комментарий к заказу" rows="5" v-model="comment"></textarea>


     </div>
        <footer class="card-footer">
          <a class="card-footer-item has-background-light has-text-centered" @click.prevent.stop="$router.push('/list')">Вернуться к списку товаров</a>
          <a :disabled="isLoad" :class="{ 'is-hidden': isLoad }" class="card-footer-item has-background-warning" @click.prevent.stop="SendEmail" style="border: 1px solid #91C9FF;">Отправить заказ</a>
        </footer>
      </div>

      
    </div>
    `,

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
        message: "",
        isLoad: false,
        comment: ""
      };
  },
  methods: {
    SendEmail() {
      if (this.isLoad) return;

      this.isLoad = true

      let data = { prodacts: [], comment: this.comment}
      for (const item of this.$store.state.goods) {
        if (item.count == "" || item.count == 0 || item.count == "0") {
          continue
        }
        data.prodacts.push({name: item.name, id: item.id, count: item.count, amount: item.amount});
      }

  
      axios.default.post('/api/buy', data, { headers: { "Authorization": `Bearer ${this.$store.state.user.token}` } })
                .then((response) => {
                    if (response.data.message) {
                        this.message = response.data.message;
                        if (response.data.status && response.data.status != 200) {
                          this.$store.dispatch('logout')
                        } else if (response.data.status && response.data.status == 200) {
                          this.$store.dispatch('clearGoods')
                        }
                    } else {
                      this.message = 'Отправка не удалась. Попробуйте отправить еще раз';
                      this.isLoad = false;
                    }
                })
                .catch((error) => {
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.isLoad = false;
                });
    }
  }
}