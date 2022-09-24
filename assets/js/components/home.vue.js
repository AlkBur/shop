const Home = {
  //   template: `
  // <div class="px-4 py-5 my-5 text-center">
  //   <img class="d-block mx-auto mb-4" src="/img/delivery_man.svg" alt="" width="72" height="57">
  //   <h1 class="display-5 fw-bold">Комапания ДСП ТОРГ</h1>
  //   <div class="col-lg-6 mx-auto">
  //     <p class="lead mb-4">Добро пожаловать на сайт! Для того чтобы начать покупки вам необходимо авторизоваться.</p>
  //     <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
  //       <button @click="$router.push('login')" type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Авторизоваться</button>
  //     </div>
  //   </div>
  // </div>`,

  template: `
  <div class="column is-8 is-offset-2">
  <div class="card has-text-centered">
  <div class="card-image">
    <figure class="image is-64x64 is-inline-block">
      <img src="/assets/img/delivery_man.svg" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <p class="title is-4">Комапания ДСП ТОРГ</p>
    <div v-if="!currentUser" class="content">
      Добро пожаловать на сайт! Для того чтобы начать покупки вам необходимо авторизоваться.
      <br>
      <br>
      <a class="button is-primary" @click.prevent.stop="$router.push('/login')">
        <strong>Авторизоваться</strong>
      </a>
    </div>
    <div v-if="currentUser" class="content">
      Добро пожаловать на сайт! Мы рады снова вас видеть.
      <br>
      <br>
      <a class="button is-primary" @click.prevent.stop="$router.push('/list')">
        <strong>Перейти к покупкам</strong>
      </a>
    </div>
  </div>
</div>
</div>
  `,
  computed: {
    currentUser() {
        return this.$store.state.user;
    },
},

}