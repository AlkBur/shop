const Table = {
    name: "TableComponent",
    template: `
    <div class="notification is-danger" v-if="message">
        {{ message }}
    </div>

    <div v-if="isLoad" class="ring">Загрузка
        <span></span>
    </div>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-primary" type="text" placeholder="Search" v-model="searchString">
        <span class="icon is-left">
          <img src="/assets/img/magnifyingglass.svg" class="image is-16x16" aria-hidden="true">
        </span>
      </p>
    </div>

    <table v-if="!message" class="table is-fullwidth is-striped is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th></th>
                <th>Товар</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Ед.</th>
                <th>Сумма</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in filteredItems" :key='item.id'>
                

                <td class="is-image-cell">
                    <div class="image">
                        <img src="/assets/img/diagram-49_24468.png" class="is-rounded">
                    </div>
                </td>
                <td data-label="Наименование">{{ item.name }}</td>
                <td data-label="Цена" v-if="item.price === 0">По запросу</td>
                <td data-label="Цена" v-else>{{ item.price }}</td>

                <td data-label="Количество">
                    <div class="input-number">
                        <div class="input-number__minus" @click.stop="onDecrement(item, i)" :class="{ 'is-hidden': item.added }">-</div>
                        <input @keydown="onKeyDown" class="input-number__input input" type="text" pattern="^[0-9]+$" value="0" 
                            v-model="item.count" :disabled="item.added" v-on:change="onChangeCount(item, i)">
                        <div class="input-number__plus" @click.stop="onIncrement(item, i)" :class="{ 'is-hidden': item.added }">+</div>
                    </div>
                </td>

                <td data-label="Unit">{{ item.unit }}</td>
               
                <td data-label="Сумма" v-if="item.amount === 0">По запросу</td>
                <td data-label="Сумма" v-else>{{ item.amount }}</td>

                <td class="is-actions-cell">
                    <div class="buttons is-right">
                        <button v-show="!item.added" class="button is-small is-primary" type="button"
                            @click.stop="onAddItem(item, i)">
                            <span class="icon">
                                <img src="/assets/img/shopping_basket.svg" class="image is-fullwidth svg-white">
                            </span>
                            <span>Купить</span>
                        </button>
                        <button v-show="item.added" class="button is-small is-danger" type="button" 
                            @click.stop="onDelItem(item, i)">
                            <span class="icon">
                                <img src="/assets/img/delete.svg" class="image is-16x16 svg-white">
                            </span>
                            <span>Удалить</span>
                        </button>
                    </div>
                </td>
            
            </tr>
        </tbody>
    </table>`,
    props: {
        isOrder: {
            type: Boolean,
            default: true
        }
    }, 
    mounted() {
        if (this.isOrder) {
            this.message = '';
            this.isLoad = true;
            for (const item of this.$store.state.goods) {
                this.items.push(item);
            }
            this.isLoad = false;
        } else {
            this.isLoad = true;
            axios.default.get('/api/prodacts', { headers: { "Authorization": `Bearer ${this.$store.state.user.token}` } })
                .then((response) => {
                    if (response.data.message) {
                        this.message = response.data.message;
                        if (response.data.status && response.data.status != 200) {
                            this.$store.dispatch('logout')
                        }
                    } else {
                        items = response.data;
                        for (const item of items) {
                            let v = this.$store.getters.findGood(item.id);
                            if (v) {
                                item.added = true
                                item.count = v.count
                                item.amount = v.amount
                            } else {
                                item.added = false; 
                                item.count = 0;
                                item.amount = 0;
                            }                           
                        }
                        this.items = items;
                        this.message = '';
                        
                    }
                    this.isLoad = false;
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
      },
    data() {
        return {
            items: [],
            message: "",
            isLoad: false,
            searchString: ""
        };

    },
    computed: {
        filteredItems() {
            const filteredItems = this.searchString === ""
                ? this.items
                : this.items.filter(wo => Object.values(wo).join("").toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1);
            return filteredItems;
        },
    },
    methods: {
        onAddItem(item, index) {
            item.count = Number(item.count);
            if (item.count > 0) {
                item.added = true
                this.$store.dispatch("addGood", item)
                this.$emit('change');
            }
        },
        onDelItem(item, index) {
            item.added = false
            this.$store.dispatch("deleteGood", item.id)
            this.$emit('change');
            if (this.isOrder) {
                this.items.splice(this.items.findIndex(v => v.id === item.id), 1)
            }
        },
        showSearch() {
            return !this.message && !this.isOrder
        },
        onIncrement(item, index) { 
            item.count++;
        },
        onDecrement(item, index) {
            if(item.count>0)
                item.count--;
        },
        onKeyDown(event) {
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 ||
                // Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // ← →
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                return;
            } else {
                // Только цифры
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        },
        onChangeCount(item, index) {
            item.amount = Math.floor(item.count * item.price * 100) / 100;
        }
    }
}