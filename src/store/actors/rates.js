import api from '../../api.json';
import axios from 'axios';

export default class Rates {
    static http = axios;

    static async addRate(obj) {
        return await Rates.http.post(api.rates.addRate, obj);
    }

    static async getActiveUserRates(userId) {
        return Rates.http.get(api.rates.getActiveRates + userId);
    }

    static async getClosedUserRates(userId) {
        return Rates.http.get(api.rates.getClosedRates + userId);
    }
}
