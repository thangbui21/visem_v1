import axios from 'axios';
import authHeader from './auth-header';
import querystring from 'querystring';

class RESTService {
    get(link) {
        return axios.get(link, {headers: authHeader()});
    }

    post(link, data) {
        return axios.post(link, querystring.stringify(data), {headers: authHeader()});
    }

    delete(link) {
        return axios.delete(link, {headers: authHeader()});
    }

    put(link, data) {
        return axios.put(link, querystring.stringify(data), {headers: authHeader()});
    }
}

export default new RESTService();
