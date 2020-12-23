import api from '../../api.json';
import axios from 'axios';

export default class MemberRSO {
    static http = axios;

    static async getAllMemberRSO() {
        return await MemberRSO.http.get(api.memberRSO.getAllMemberRSO);
    }

    static async addMemberRSO(obj) {
        return await MemberRSO.http.post(api.memberRSO.addMemberRSO, obj)
    }

    static async deleteMemberRSO(idItem) {
        return await MemberRSO.http.get(api.memberRSO.deleteMemberRSO+ `?id=${idItem}`)
    }
}
