import Vue from 'vue';
import Router from 'vue-router';

import Login from './components/Login.vue'
import ProjectModal from './components/ProjectModal.vue'
import ListProject from './components/ListProject.vue'
import ListTask from './components/ListTask.vue'
import TaskModal from './components/TaskModal.vue'
import SignUp from './components/SignUp.vue'
import waitingConfirmation from './components/waitingConfirmation.vue'
import verify from './components/verify.vue'
import InviteConfirmation from './components/InviteConfirmation.vue'
// import ProjectDetail from './components/ProjectDetail.vue'

import UserAuthService from './api/authentication.service'


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                allowAnonymous: true
            }
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: SignUp
        },
        {
            path: '/wait-confirm',
            name: 'wait-confirm',
            component: waitingConfirmation
        },
        {
            path: '/verify',
            name: 'verify',
            component: verify
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
            component: ListTask,
            props: true
        },
        {
            path: '/projects/:id/tasks/new',
            name: 'tasks-new',
            component: TaskModal
        },
        {
            path: '/join_project',
            name: 'join-project',
            component: InviteConfirmation,
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log("to: ", to.fullPath)
    console.log("from: ", from)
    console.log("next: ", next)
    console.log("to.name: ", to.name)
    console.log("isLoggedIn: ", UserAuthService.isLoggedIn())
    /*if (!to.meta.allowAnonymous && !UserAuthService.isLoggedIn()) {
        console.log("in if")
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
    } else {
        console.log("in else")
        next()
    }*/
    if (to.name == 'login' && UserAuthService.isLoggedIn()) {
        console.log("in first if")
        next({ path: '/' })
    } else if (!to.meta.allowAnonymous && !UserAuthService.isLoggedIn()) {
        console.log("in else if")
        console.log("to.fullPath: ", to.fullPath)
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        console.log("in else")
        next()
    }
    /*console.log("to.name: ", to.name)
    console.log("isLoggedIn: ", UserAuthService.isLoggedIn())*/
    /*if (to.name !== 'login' && !UserAuthService.isLoggedIn()) {
        console.log("in if...")
        next({name: 'login'})
    } else {
        console.log("in else...")
        next()
    }*/

  })
  
  export default router