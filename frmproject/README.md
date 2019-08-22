# frmProject

##1.封装路由

- #### 需记住的七个单词

​    **VueRouter**	创建路由对象

​	**routes**	配置路由

​	**router**	注入路由

​	**router-view**	添加路由所映射的组件展示区域

​	**router-link**	路由导航

​	**$route**	获取当前路由参数

​	**$router**	编程式导航 - - 路由跳转



- 在**src**文件夹中创建**utils**文件夹，且在**utils**文件夹中创建**router.js**

  其中  **name:'default'**  部分是当打开根组件时,让其自动的进行重定向,映射到下一个组件

  ```js
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  
  import showdata from '@/components/showdata.vue'
  
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
      }
    ]
  })
  ```

- 在**main.js**引入并注入

  ```js
  import router from '@/utils/router.js'
  --------------------------------------
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
  ```

- 在**App.vue**中添加映射组件的展示区域

  ```vue
  <div id="app">
  	<router-view />
  </div>
  ---------------------------------------------------
  .router-link-active{
    color:#f60
  }
  ```

##2.列表数据展示案例-数据展示

- #### 添加数据(案例开始并无数据,则加入数据)并展示结构

  - ####添加数据

    ```vue
    export default {
      data () {
        return {
          dataList: [
            {
              id: 1,
              bname: 'Moo',
              time: new Date()
            },
            {
              id: 2,
              bname: 'Soo',
              time: new Date()
            },
            {
              id: 3,
              bname: 'Doo',
              time: new Date()
            }
          ]
        }
      }
    }
    ```

  - #### 展示结构

    ```vue
    <tr v-for='(value, index) in dataList' :key='index'>
        <td>{{ value.id }}</td>
        <td>{{ value.name }}</td>
        <td>{{ value.time }}</td>
        <td>
            <a href="#">删除</a>
        </td>
    </tr>
    ```

    

- ### 添加

  - ####为input添加双向绑定,则需要先定义brand来存储文本框数据

    ####在 data 中定义存储的对象 brand

    ```vue
    brand: {
    	id: '',
    	bname: ''
    }
    ```

    #### 双向绑定

    ```vue
    编号:<input type="text" v-model="brand.id">
    品牌名称:<input type="text" v-model="brand.bname">
    ```

  - ####创建添加函数来添加数据

    ```vue
    <input type="button" @click="addBrand" value="添加">
    -------------------------------------------------
    //添加需要深拷贝,不然一改变文本框输入的值数据也会跟着改变
    methods: {
        addBrand () {
          this.brand.time = new Date()
          this.dataList.push({ ...this.brand })
    	}
    }
    ```

- ### 添加自定义指令 (diretives)

  即一打开页面就聚焦在编码那里及设置输入框输入的字体颜色

  - #### 封装 (utils文件夹中创建directives.js)

    ```js
    //聚焦
    export const myfocus = {
      inserted (el) {
        el.focus()
      }
    }
    //字体颜色
    export const mycolor = {
      inserted (el, binding) {
        el.style.color = binding.value
      }
    }
    ```

    ####引入**diectives.js** 并设置

    ```vue
    import { myfocus, mycolor } from '@/utils/directives.js'
    --------------------------------------------------
    directives: {
       myfocus, mycolor
    }
    --------------------------------------------------
    编号:<input type="text" v-model="brand.id" v-myfocus v-mycolor='"#f60"'>
                品牌名称:<input type="text" v-model="brand.bname" v-mycolor='"#00f"'>
    ```

- ### 过滤器 filfters

  - #### 封装过滤时间的方法 (filfters.js)

    ```js
    export const timeFormat = (time, pre, pro) => {
      let y = time.getFullYear()
      let M = time.getMonth() + 1
      let d = time.getDate()
      let h = time.getHours()
      let m = time.getMinutes()
      let s = time.getSeconds()
      let timeArr = [M, d, h, m, s]
      timeArr.forEach(e => {
        return e < 10 ? '0' + e : e
      })
      return y + pre + timeArr[0] + pre + timeArr[1] + ' ' + timeArr[2] + pro + timeArr[3] + pro + timeArr[4]
    }
    ```

  - #### 引入注册使用

    ```vue
    import { timeFormat } from '@/utils/filters.js'
    ------------------------------------------------
    filters: {
       timeFormat
    }
    -------------------------------------------------
    <td>{{ value.time | timeFormat('-', ':')}}</td>
    ```

- ### 删除

  - ####加入动画 animate

  ```vue
  // main.js 引入 
  import '@/styles/animate.css'
  ----------------------------------------------------
  //data中设置
  // 设置遮罩及弹窗的是否显示
  isShow: false,
  // 存储删除当前的索引
  currentIndex: '',
  -----------------------------------------------------
  // showdata.vue 设置
  //由于结构中是a标签,a标签的href属性为#,所以需要设置阻止默认
  <a href="#" @click.prevent="showAlert(index)" >删除</a>
  ------------------------------------------------------
  <div class="mask" v-if="isShow"></div>
  <transition enter-active-class="animated rotateInUpLeft" leave-active-class="animated rotateOutDownLeft">
      <div class="alert" v-if="isShow">
          <h2>提示</h2>
          <div class="content">确定要删除吗？</div>
          <div>
              <input type="button" @click="btnSure" value="确定">
              <input type="button" @click="btnExit" value="取消">
          </div>
      </div>
  </transition>
  ----------------------------------------------------
  //对应的方法
  showAlert (index) {
    this.currentIndex = index
    this.isShow = !this.isShow
  },
  btnExit () {
    this.isShow = !this.isShow
  }
  ```

  - #### 删除

    ```vue
    btnSure () {
      this.dataList.splice(this.currentIndex, 1)
      this.isShow = false
    }
    //当数据为0时,加入提示
    <tr v-if="this.dataList.length === 0"><td colspan="4">没有数据噢</td></tr>
    ```

- ###搜索

  - #### 双向绑定搜索的文本框

    ```vue
    //需要先在data设置搜索的值
    // 搜索的值
    searchVal: '',
    // 搜索的数据
    searchList: [
        {
          id: 1,
          bname: 'Moo',
          time: new Date()
        },
        {
          id: 2,
          bname: 'Soo',
          time: new Date()
        },
        {
          id: 3,
          bname: 'Doo',
          time: new Date()
        }
    ]
    -------------------------------------------------
    <input type="text" placeholder="请输入搜索条件" v-model="searchVal">
    ```

  - #### 深度侦听搜索的值

    ```vue
    watch: {
        'searchVal' (newV, oldV) {
          this.searchList = this.dataList.filter(e => {
            return e.bname.indexOf(newV) !== -1
          })
        }
    }
    ```

    

##3.路由传参

- ####router.js

  ```js
  {
    name: 'list',
    path: '/list/:id',
    component: list
  }
  ```

- ####App.vue

  ```vue
  <li><router-link to='/list/1'>路由配置列表1</router-link></li>
  <li><router-link to='/list/2'>路由配置列表2</router-link></li>
  <li><router-link to='/list/3'>路由配置列表3</router-link></li>
  ```

- #### 当在不同列表时显示对应内容

  ```vue
  3<p>{{ info }}</p>
  ------------------------------------------------
  export default {
    data () {
      return {
  	  //显示的内容
        info: '??'
      }
    },
    //组件一加载就触发的钩子函数
    mounted () {
      let id = this.$route.params.id
      this.opt(id)
    },
    //深度侦听
    watch: {
      '$route' (to, from) {
        let id = to.params.id
        this.opt(id)
      }
    },
    methods: {
  	// 封装
      opt (id) {
        if (id === '1') {
          this.info = '列表1数据'
        } else if (id === '2') {
          this.info = '列表2数据'
        } else if (id === '3') {
          this.info = '列表3数据'
        }
      }
    }
  ```

- #### 嵌套组件 ---- 在不同列表中，点击按钮显示对应的组件

  - ##### 创建组件Moo1.vue、Moo2.vue、Moo3.vue
  
  - ##### 引入并配置路由
  
    ```js
    import Moo1 from '@/components/Moo1.vue'
    import Moo2 from '@/components/Moo2.vue'
    import Moo3 from '@/components/Moo3.vue'
    
    {
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
    }
    ```
  
  - ##### list.vue template设置
  
    ```vue
    <h1>列表</h1>
    <p>{{ info }}</p>
    <button @click="showInfo">点击获得详情信息</button>
    <router-view />
    ```
  
  - ##### showInfo方法
  
    ```vue
    showInfo () {
      let id = this.$route.params.id
      if (id === '1') {
        if (this.$route.name !== 'Moo1') {
          this.$router.push({ name: 'Moo1' })
        }
      } else if (id === '2') {
        if (this.$route.name !== 'Moo2') {
          this.$router.push({ name: 'Moo2' })
        }
      } else if (id === '3') {
        if (this.$route.name !== 'Moo3') {
          this.$router.push({ name: 'Moo3' })
        }
      }
    }
    ```

##4.单文件组件间的数据传输

- ###创建father.vue、son.vue、sons.vue

- ###父组件传数据给子组件

  **子组件中通过props定义接收变量，父组件在使用子组件的位置对子组件的props属性赋值（v-bind)**

  - #### father.vue

    ```vue
    <template>
        <div class="father">
            <h1>父组件</h1>
            // 3.使用son组件
            <son :sname='sname'></son>
        </div>
    </template>
    <script>
    // 1.引入son组件
    import son from '@/components/son.vue'
    export default {
      // 2.注册son组件
      components: {
        son
      },
      data () {
        return {
          //父组件要给子组件的值
          sname: 'sonname'
        }
      }
    }
    </script>
    ```

  - #### son.vue

    ```vue
    <template>
        <div class="son">
            <h1>子组件</h1>
            <p>从父组件传来的数据：{{ sname }}</p>
        </div>
    </template>
    <script>
    export default {
      //通过props属性赋值
      props: ['sname']
    }
    </script>
    ```

- ### 子组件传数据给父组件

  **子组件发射事件来传递数据，父组件需监听子组件发射的事件，进行事件处理（接收数据）**

  - #### son.vue

    ```vue
    <p>从父组件传来的数据：{{ sname }}</p>
    <hr>
    <button @click="setfnametofather">点击从子组件传给父组件名字</button>
    ---------------------------------------------------
    data () {
        return {
          fname: 'sontofathername'
        }
    },
    methods: {
        setfnametofather () {
          this.$emit('setfname', this.fname)
        }
    }
    ```

  - #### father.vue

    ```vue
    <p>子组件传给父组件值：{{ fname }}</p>
    <son :sname='sname' @setfname='getfname'></son>
    ---------------------------------------------------
    data () {
        return {
          sname: 'sonname',
          fname: '??'
        }
    },
    methods: {
        getfname (data) {
          this.fname = data
        }
    }
    ```

- ###子组件传数据给子组件（兄弟组件）

  由于  **\$emit**  和  **\$on**  都需要使用**this**调用，而子组件与子组件没有任何关系，对应的**this**是**指向当前组件对象**，而**组件是可复用的Vue实例**，所以可以通过封装个共同的实例来实现关联

  - #### 封装事件总线

    ```js
    import Vue from 'vue'
    export default new Vue()
    ```

  - ####子组件2

    ```vue
    <template>
        <div class="sons">
            <h1>子组件2</h1>
            <button @click="setsonnametoson">子组件2传值给子组件</button>
        </div>
    </template>
    <script>
    //引入事件总线
    import Bus from '@/utils/myvue.js'
    export default {
      data () {
        return {
          tosonname: 'sonstosonname'
        }
      },
      methods: {
        setsonnametoson () {
          Bus.$emit('setsonname', this.tosonname)
        }
      }
    }
    </script>
    ```

  - #### son.vue

    ```vue
    <hr>
    <p>从子组件2传过来的子组件的值：{{ sonname }}</p>
    --------------------------------------------------
    // 引入事件总线
    import Bus from '@/utils/myvue.js'
    --------------------------------------------------
    // data加入sonname
    sonname: '??'
    --------------------------------------------------
    //一直监听当事件点击时便触发
    mounted () {
        Bus.$on('setsonname', data => {
          this.sonname = data
        })
    }
    ```

    