import api from '../../api.json';
import axios from 'axios';

export default class Users {
    static http = axios;

    static async registrationUser(obj) {
        return await Users.http.post(api.users.registrationUser, obj);
    }

    static async loginUser(obj) {
        return await Users.http.post(api.users.loginUser, obj);
    }
}
