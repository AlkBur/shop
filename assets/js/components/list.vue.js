const List = {
    name: "List",
    // template: `
    // <div class="d-flex text-center flex-column align-self-start" style="">
    //     <h1 class="fw-bolder text-success">Список товаров</h1>
    //     <div class="table-responsive my-5">

    //     <!-- The table component -->
    //     <Table :fields='fields' :items ="items"></Table>
    //     </div>
    // </div>`,

  template: `
    <div class="container" style="align-items:flex-start; width:100%">
      <div class="is-flex is-justify-content-center py-2">
        <h1 id="title" class="title">Список товаров</h1>
      </div>
      <div class="notification is-danger" v-if="message">
        {{ message }}
      </div>


      <div class="b-table p-2" v-if="!message">
        <div class="table-wrapper has-mobile-cards">
          <!-- The table component -->
          <Table :isOrder="false" v-on:change="ShowOrder()"</Table>
        </div>
      </div>


      <div class="is-flex is-justify-content-center field is-grouped" @click="hideOrder()">
            
        <transition name="fade">
          <div class="order-bar-container" v-if="this.isShowOrder" >
          
              <div class="order-bar-content">
                  <img class="image is-32x32" src="/assets/img/delivery_man.svg" alt="">
                  <p class="font-light">Итого количество {{orderCount}}</p>
                  <div>
                      <button class="button is-primary" @click.prevent.stop="$router.push('/order')">Корзина</button>
                  </div>
              </div>
          </div>
        </transition>

      </div>

      <div class="link-setting is-hidden-desktop">
      <ul>
        <li>
          <a id="cart" class="button is-warning" @click.prevent.stop="scrollToTop">
              <img src="/assets/img/up-arrow.svg" class="image is-32x32">
          </a>
        </li>
        <li class="py-1">
          <a id="cart" class="button is-warning" @click.prevent.stop="$router.push('/order')">
              <span title="Badge top right" class="badge">{{currentCount}}</span>
              <img src="/assets/img/shoppayment.svg" class="image is-32x32">
          </a>
        </li>
        <li>
          <a id="cart" class="button is-warning" @click.prevent.stop="scrollToBottom">
              <img src="/assets/img/up-arrow.svg" class="image is-32x32" style="transform: rotate(180deg);">
          </a>
        </li>
        
      </ul>
    </div>


    </div>`,

    computed: {
      currentUser() {
          return this.$store.state.user.data;
      },
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
        isShowOrder: false 
      };
  },
  methods: {
    ShowOrder() {
      //console.log("ShowOrder")
      this.isShowOrder = true;
      setTimeout(() => {
        this.isShowOrder=false;
      }, 2000);
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    scrollToBottom(){
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    }
  }
}