import api from '../../api.json';
import axios from 'axios';

export default class Lots {
    static http = axios;

    static async getActiveLots() {
        return await Lots.http.get(api.lots.getActiveLots);
    }

    static async addLot(obj) {
        return await Lots.http.post(api.lots.addLot, obj)
    }
}
