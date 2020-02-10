import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router(
  {
    mode: 'history',

    routes: [
      {
        path: '/activity',
        name: 'Activity',
        component: () => import('@/components/content/ActivityBlock.vue')
      },

      {
        path: '/calendar',
        name: 'Calendar',
        component: () => import('@/components/content/CalendarBlock.vue')
      },

      {
        path: '/files',
        name: 'Files',
        component: () => import('@/components/content/FilesBlock.vue')
      },

      {
        path: '/kanban',
        name: 'Kanban',
        component: () => import('@/components/content/KanbanBlock.vue')
      },

      {
        path: '/tasks',
        name: 'Tasks',
        component: () => import('@/components/content/TaskBlock.vue')
      },

      {
        path: '',
        redirect: { name: 'Tasks' }
      },

      {
        path: '*',
        component: () => import('@/components/error/NotFound404.vue')
      },

      {
        path: '/500',
        name: 'InternalServerError500',
        component: () => import('@/components/error/InternalServerError500.vue')
      }
    ]
  }
)
