import api from '../../api.json';
import axios from 'axios';

export default class Groups {
    static http = axios;

    static async getAllGroup() {
        return await Groups.http.get(api.groups.getAllGroup);
    }

    static async addGroup(obj) {
        return await Groups.http.post(api.groups.addGroup, obj)
    }
}
