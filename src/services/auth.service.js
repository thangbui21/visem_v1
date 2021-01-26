import axios from 'axios';
import querystring from 'querystring';

const API_URL = '/services/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', querystring.stringify({
                name: user.username,
                password: user.password
            }), {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => {
                if (response.status == 200) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();