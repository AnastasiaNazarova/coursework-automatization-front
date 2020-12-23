import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import MemberRSO from '@/views/MemberRSO';
import Group from '@/views/Group';
import Staff from '@/views/Staff';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'mainPage',
            component: Index
        },

        {
            path: '/memberRSO',
            name: 'memberRSO',
            component: MemberRSO
        },

        {
            path: '/group',
            name: 'group',
            component: Group
        },

        {
            path: '/staff',
            name: 'staff',
            component: Staff
        },

        {
            path: '*',
            redirect: '/'
        }
    ]
});

export default router;
