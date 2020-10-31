import Vue from 'vue';
import Router from 'vue-router';

import login from './components/login.vue'


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        /*
        {
            path: '/',
            alias: '/projects',
            name: 'projects',
            component: () => import ('') // component route
        },
        {
            path: '/new',
            // alias: '/projects',
            name: 'projects-new',
            component: () => import ('') // component route
        },
        {
            path: '/projects/:id',
            // alias: '/projects',
            name: 'projects-details',
            component: () => import ('') // component route
        },
        {
            path: '/projects/:id/tasks',
            // alias: '/tasks',
            name: 'tasks',
            component: () => import ('') // component route
        },
        {
            path: '/projects/:id/tasks/new',
            // alias: '/tasks',
            name: 'tasks-new',
            component: () => import ('') // component route
        },
        {
            path: '/projects/:id/tasks/:id',
            // alias: '/tasks',
            name: 'tasks-details',
            component: () => import ('') // component route
        }
        */
    ]
});
