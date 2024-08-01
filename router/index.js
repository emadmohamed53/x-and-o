import { createRouter, createWebHistory } from "vue-router";
import TicTacToe from '../components/TicTacToe.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: TicTacToe
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;