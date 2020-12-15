import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import NewLot from '@/views/NewLot';
import Cabinet from '@/views/Cabinet';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'mainPage',
            component: Index
        },
        {
            path: '/newLot',
            name: 'newLot',
            component: NewLot
        },
        {
            path: '/cabinet',
            name: 'cabinet',
            component: Cabinet
        }
    ]
});

export default router;
