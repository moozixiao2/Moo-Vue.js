import Vue from 'vue'
import VueRouter from 'vue-router'

import showdata from '@/components/showdata.vue'
import indexRot from '@/components/indexRot.vue'
import list from '@/components/list.vue'
import Moo1 from '@/components/Moo1.vue'
import Moo2 from '@/components/Moo2.vue'
import Moo3 from '@/components/Moo3.vue'
import father from '@/components/father.vue'

Vue.use(VueRouter)

export default new VueRouter({
  linkExactActiveClass: 'router-link-active',
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'showdata' }
    }, {
      name: 'showdata',
      path: '/showdata',
      component: showdata
    }, {
      name: 'indexRot',
      path: '/indexRot',
      component: indexRot
    }, {
      name: 'list',
      path: '/list/:id',
      component: list,
      children: [
        {
          name: 'Moo1',
          path: 'Moo1',
          component: Moo1
        },
        {
          name: 'Moo2',
          path: 'Moo2',
          component: Moo2
        },
        {
          name: 'Moo3',
          path: 'Moo3',
          component: Moo3
        }
      ]
    },
    {
      name: 'father',
      path: '/father',
      component: father
    }
  ]
})
