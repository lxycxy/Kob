import {createRouter, createWebHistory} from "vue-router";

import DashBoardView from '@/view/DashBoard.vue'
import UserLoginView from '@/view/user/UserLoginView.vue'
import UserRegisterView from "@/view/user/UserRegisterView.vue";
import {useStore} from "vuex";
import PlayIndexView from "@/view/pk/PlayIndexView.vue";
import RecordView from "@/view/record/RecordView.vue";
import RecordContentView from "@/view/record/RecordContentView.vue";
import RankListView from "@/view/rank/RankListView.vue";


const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: DashBoardView,
        meta: {
            requireAuthor: true
        },
    },
    {
        path: '/login',
        name: 'login',
        component: UserLoginView,
        meta: {
            requireAuthor: false
        }
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegisterView,
      meta: {
          requireAuthor: false
      }
    },
    {
        path: '/pk',
        name: 'pk',
        component: PlayIndexView,
        meta: {
            requireAuthor: true
        }
    },
    {
        path: '/record',
        name: 'record',
        component: RecordView,
        meta: {
            requireAuthor: true
        }
    },
    {
        path: '/record/content/:id',
        name: 'recordContent',
        component: RecordContentView,
        meta: {
            requireAuthor: true
        },
    },
    {
        path: '/rank',
        name: 'rank',
        component: RankListView,
        meta: {
            requireAuthor: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: DashBoardView,
        meta: {
            requireAuthor: false
        }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {

    const store = useStore()
    if (to.meta.requireAuthor && !store.state.user.is_login) {
        next({name: 'login'});
    } else if (to.name === 'login' && store.state.user.is_login)  {
        next(from)
    } else {
        next()
    }
})

export default router