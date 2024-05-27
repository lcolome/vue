import { createRouter, createWebHistory } from 'vue-router'; // Importa las funciones necesarias desde vue-router

import SearchPage from '../components/SearchPage.vue';
import ResultsPage from '../components/ResultsPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'search',
            component: SearchPage,
        },
        {
            path: '/results',
            name: 'results',
            component: ResultsPage,
        },
    ],
});

export default router;
