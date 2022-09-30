const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user: user }
    : { status: { loggedIn: false }, user: null };
initialState.goods = []     
initialState.order = {amount:0, count:0}
  
const store = Vuex.createStore({
    state () {
        return initialState;
    },
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    if (user.status && user.status == 200) {
                        commit('loginSuccess', user);
                        return Promise.resolve(user);
                    } else {
                        commit('loginFailure');
                        return Promise.reject(user.message);
                    }                   
              },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
              }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        GET_GOODS_FROM_API({ commit }) {
            return axios
                .get('/api/prodacts', { headers: {"Authorization" : `Bearer ${this.state.user.token}`} })
                .then(response => {
                    commit('SET_GOODS', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        deleteGood({ commit }, id) {
            commit('DELETE_GOOD', id);
        },
        clearGoods({ commit }) {
            commit('CLEAR_GOODS');
        },
        addGood({ commit }, item) {
            commit('ADD_GOOD', item);
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        SET_GOODS(state, data) {
            state.status.goods = data;
        },
        DELETE_GOOD(state, id) {
            state.goods.splice(state.goods.findIndex(v => v.id === id), 1)
            state.order.count = 0;
            state.order.amount = 0;
            for (const item of state.goods) {
                //item.amount = Math.floor(item.value*item.count * 100) / 100; 
                state.order.count += item.count;
                state.order.amount += item.amount;       
            }
        },
        CLEAR_GOODS(state) {
            state.goods.length = 0
        },
        ADD_GOOD(state, item) {
            //item.amount = Math.floor(item.value*item.price * 100) / 100; 
            state.goods.push(item)
            state.order.count += item.count;
            state.order.amount += item.amount;
        }
    },
    getters: {
        GOODS(state) {
            return state.goods;
        },
        findGood: state => (id) => {
            return state.goods.find(v => v.id == id);
        }
    }
  })


const app = Vue.createApp(App)
app.component('toast-manager', Toast)
app.component('Table', Table)
app.use(router)
app.use(store)
app.mount('#app')