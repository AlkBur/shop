const App = {  
    template: `
    <section class="hero is-fullheight is-light">
        <div class="hero-head is-info has-background-primary">
            <nav class="navbar is-primary">
                <div class="navbar-brand">

                    <a class="navbar-item" href="#" @click.prevent.stop="$router.push('/')">
                        <img src="/assets/img/delivery_man.svg" style="max-height: 2.50rem;">
                    </a>
                
                    <div class="container" style="margin: auto;">
                        <h1 class="title has-text-white">
                        ДСП ТОРГ
                        </h1>
                    </div>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenubd-main"
                        @click.prevent.stop="burger" v-bind:class="{ 'is-active': isActive }">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>

                <div id="navMenubd-main" class="navbar-menu" v-bind:class="{ 'is-active': isActive }">
                    <div class="navbar-start">
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a v-if="currentUser" class="button is-primary" @click.prevent.stop="$router.push('/list')">
                                <strong>{{currentUser.data}}</strong>
                            </a>

                            <a v-if="currentUser" id="cart" class="button" @click.prevent.stop="$router.push('/order')">
                                <span title="Badge top right" class="badge">{{currentCount}}</span>
                                <img src="/assets/img/shoppayment.svg" class="image is-fullwidth">
                            </a>
             
                            <a v-if="currentUser" class="button" @click.prevent.stop="logOut">
                                <span class="icon">
                                    <img src="/assets/img/exit.svg" class="image is-fullwidth">
                                </span>
                                <span>Выйти</span>
                            </a>

                            <a v-if="!currentUser" class="button" @click.prevent.stop="$router.push('/login')">
                                <span class="icon">
                                    <img src="/assets/img/enter.svg" class="image is-fullwidth">
                                </span>
                                <span>Войти</span>
                            </a>
          
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        <div class="hero-body has-text-centere p-0" style="align-items:flex-start">
            <router-view/>
        </div>

    </section>`,
    
    computed: {
        currentUser() {
            return this.$store.state.user;
        },
        currentCount() {
            return this.$store.state.goods.length;
        },
    },

    data() {
        return {
            isActive: false,
        };
    },

    methods: {
        logOut() {
          this.$store.dispatch('logout');
          this.$router.push('/login');
        },
        burger() {
            this.isActive = !this.isActive;
        },
        logIn() {
            this.$router.push('/login');
        },
    }
}
