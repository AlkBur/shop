const App = {
//     template: `
// <div class="cover-container d-flex w-100 h-100 p-3 flex-column">
// <header>
//     <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
//         <div class="container-fluid">
//         <a class="navbar-brand" href="/">ДСП ТОРГ</a>
//         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//             <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarCollapse">
//             <ul class="navbar-nav me-auto mb-2 mb-md-0">
//                 <li v-if="currentUser" class="nav-item">
//                     <a class="nav-link active" aria-current="page" href="/list">
//                         <i class="fa-solid fa-house"></i>
//                     </a>
//                 </li>
//             </ul>
//             <form class="d-flex my-auto">
//                 <ul class="navbar-nav me-auto mb-2 mb-md-0">
//                     <li v-if="!currentUser" class="nav-item">
//                         <router-link to="/login" class="nav-link">
//                             <i class="fa-solid fa-right-to-bracket"></i> Войти
//                         </router-link>
//                     </li>
//                     <li v-if="currentUser" class="nav-item">
//                         <a class="nav-link" @click.prevent="logOut">
//                             <i class="fa-solid fa-right-from-bracket"></i> Выйти
//                         </a>
//                     </li>
//                 </ul>     
//             </form>
//         </div>
//         </div>
//     </nav>
// </header>
// <main style="padding-top: 53px">
//     <div class="container">
//         <router-view/>
//     </div>
// </main>
// </div>`,
    
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
                                <i class="fa-solid fa-cart-shopping"></i>
                            </a>
             
                            <a v-if="currentUser" class="button" @click.prevent.stop="logOut">
                                <span class="icon">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </span>
                                <span>Выйти</span>
                            </a>

                            <a v-if="!currentUser" class="button" @click.prevent.stop="$router.push('/login')">
                                <span class="icon">
                                    <i class="fa-solid fa-right-from-bracket"></i>
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
