import api from '../../api.json';
import axios from 'axios';

export default class Staffs {
    static http = axios;

    static async getAllStaffs() {
        return await Staffs.http.get(api.staffs.getAllStaff);
    }

    static async addStaff(obj) {
        return await Staffs.http.post(api.staffs.addStaff, obj)
    }
}
