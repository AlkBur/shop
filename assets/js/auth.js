const API_URL = '/'

const AuthService = {
    login(user) {
      return axios
        .post(API_URL + 'login', user)
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
        });
    },
    logout() {
      localStorage.removeItem('user');
    }
}