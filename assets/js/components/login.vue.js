const Login = {
  //   template: `<div class="text-center" style="width: 100%;max-width: 330px;padding: 15px;margin: auto;">
  // <form @submit="handleLogin" class="needs-validation" novalidate>
  //   <img class="mb-4" src="/img/delivery_man.svg" alt="" width="72" height="57">
  //   <h1 class="h3 mb-3 fw-normal">Пожалуйста, войдите</h1>

  //   <div>
  //     <div class="form-floating py-2"> 
  //       <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" required v-model="email">
  //        <label for="floatingEmail">Адрес эл. почты</label> 
  //       <div class="invalid-feedback">Поле заполено неверно!</div>
  //     </div>
  //   </div>
  //   <div>
  //     <div class="form-floating py-2">    
  //       <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required v-model="password">
  //       <label for="floatingPassword">Пароль</label>
  //       <div class="invalid-feedback">Поле заполено неверно!</div>
  //     </div>
  //   </div>
  //   <div class="form-group">
  //     <div class="checkbox mb-3">
  //       <label>
  //         <input type="checkbox" value="admin" v-model="isAdmin"> Admin
  //       </label>
  //     </div>
  //   </div>
  //   <div class="form-group">
  //     <button class="w-100 btn btn-lg btn-primary" :disabled="loading">
  //       <span v-show="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  //       Войти
  //     </button>
  //   </div>
  //   <div class="form-group">
  //     <div v-if="message" class="alert alert-danger" role="alert">
  //       {{ message }}
  //     </div>
  //   </div>
  //   <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
  // </form>

  // <div>`,

  template: `
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">ДСП ТОРГ</h3>
        <div class="box">
          <figure class="avatar is-128x128">
            <img src="/assets/img/delivery_man.svg">
          </figure>
          <form @submit.prevent.stop="handleLogin">
            <div class="field">
              <div class="control">
                <input v-model="email" class="input is-large" type="email" placeholder="name@example.com" autofocus="" required>
              </div>
              <p v-show="AttrEmailMessage" class="is-danger help">Please enter an email address</p>
            </div>
            <div class="field">
              <div class="control">
                <input v-model="password" class="input is-large" type="password" placeholder="Пароль" required>
              </div>
              <p v-show="AttrPasswordMessage" class="is-danger help">Please enter a password</p>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model="isAdmin">
                Админ
              </label>
            </div>
            <button class="button is-block is-success is-large is-fullwidth">Войти</button>
          </form>
        </div>
        <div class="notification is-danger" v-if="message">
          <button class="delete" @click.prevent.stop="ClearMessage"></button>
          {{ message }}
        </div>
      </div>
    </div>
  `,

  data() {
    return {
      loading: false,
      message: "",
      email: null,
      password: null,
      isAdmin: false,
    };
  },
  methods: {
    handleLogin(event) {

        const form = this.$el.querySelector('form');
        if (!form.checkValidity()) {
          return
        }
      
        this.loading = true;

        this.$store.dispatch("login", {email: this.email, password: this.password, admin: this.isAdmin}).then(
          () => {
            this.$router.push("/list");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );

    },
    ClearMessage(event) {
      this.message = '';
    },
  },
}