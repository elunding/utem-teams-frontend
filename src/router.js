import Vue from 'vue';
import Router from 'vue-router';

import Login from './components/Login.vue'
import ProjectModal from './components/ProjectModal.vue'
import ListProject from './components/ListProject.vue'
import ListTask from './components/ListTask.vue'
import TaskModal from './components/TaskModal.vue'
// import ProjectDetail from './components/ProjectDetail.vue'


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/projects/new',
            name: 'projects-new',
            component: ProjectModal
        },
        {
            path: '/',
            alias: '/projects',
            name: 'projects',
            component: ListProject
        },
        {
            path: '/projects/:id/tasks',
            name: 'tasks',
            component: ListTask
        },
        {
            path: '/projects/:id/tasks/new',
            name: 'tasks-new',
            component: TaskModal
        },
        /*{
            path: '/projects/:id',
            name: 'projects-details',
            component: ProjectDetail
        },*/
        /*{
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
