const DebugCatalogComponent = {
    name: "DebugCatalogComponent",
    template: `

    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
        <tr>
        <th>№</th>
        <th>ID</th>
        <th>Name</th>
        <th>Parent ID</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, i) in catalogs" :key='item.id'>
        <td>{{i+1}}</td>
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.parent_id}}</td>
        </tr>
    </tbody>
    </table>

    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
        <tr>
        <th>№</th>
        <th>ID</th>
        <th>Name</th>
        <th>Parent ID</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, i) in items" :key='item.id'>
        <td>{{i+1}}</td>
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.parent_id}}</td>
        </tr>
    </tbody>
    </table>

    
    
    
    
    `,
    props: {
        isOrder: {
            type: Boolean,
            default: true
        }
    }, 
    mounted() {
            Promise.all([axios.default.get('/api/prodacts', { headers: { "Authorization": `Bearer ${this.$store.state.user.token}` } }),
                axios.default.get('/api/catalogs', { headers: { "Authorization": `Bearer ${this.$store.state.user.token}` }})])
                .then((results) => {
                    if (results[0].data.message || results[1].data.message) {
                        this.message = results[0].data.message;
                        if (this.message === "" || this.message === undefined) {
                            this.message = results[1].data.message;
                        }
                        if ((results[0].data.status && results[0].data.status != 200) || (results[1].data.status && results[1].data.status != 200)) {
                            this.$store.dispatch('logout')
                        }
                    } else {
                        this.items = results[0].data;
                        this.catalogs = results[1].data;
                        for (const item of this.items) {
                            item.parent_id = item.parent_id.trim();
                        }
                        for (const item of this.catalogs) {
                            item.parent_id = item.parent_id.trim();
                        }  
                    }
            })
            .catch((error) => {
                message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(message);
            });
      },
    data() {
        return {
            items: [],
            catalogs: [],
        };

    }
}