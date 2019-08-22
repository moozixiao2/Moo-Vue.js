<template>
    <div id="app">
        <div class="add">
            编号:<input type="text" v-model="brand.id" v-myfocus v-mycolor='"#f60"'>
            品牌名称:<input type="text" v-model="brand.bname" v-mycolor='"#00f"'>
            <input type="button" @click="addBrand" value="添加">
        </div>
        <div class="add">
            品牌名称:
            <input type="text" placeholder="请输入搜索条件" v-model="searchVal">
        </div>
        <div>
            <table class="tb">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>品牌名称</th>
                        <th>创立时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(value, index) in searchList' :key='index'>
                        <td>{{ value.id }}</td>
                        <td>{{ value.bname }}</td>
                        <td>{{ value.time | timeFormat('-', ':')}}</td>
                        <td>
                            <a href="#" @click.prevent="showAlert(index)" >删除</a>
                        </td>
                    </tr>
                    <tr v-if="this.searchList.length === 0"><td colspan="4">没有数据噢</td></tr>
                </tbody>
            </table>
        </div>
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
    </div>
</template>
<script>
import { myfocus, mycolor } from '@/utils/directives.js'
import { timeFormat } from '@/utils/filters.js'
export default {
  data () {
    return {
      // 设置遮罩及弹窗的是否显示
      isShow: false,
      // 存储删除当前的索引
      currentIndex: '',
      // 搜索的值
      searchVal: '',
      // 文本框数据的存储
      brand: {
        id: '',
        bname: ''
      },
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
      ],
      // 列表数据
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
  },
  methods: {
    addBrand () {
      this.brand.time = new Date()
      this.dataList.push({ ...this.brand })
    },
    showAlert (index) {
      this.currentIndex = index
      this.isShow = !this.isShow
    },
    btnExit () {
      this.isShow = !this.isShow
    },
    btnSure () {
      this.dataList.splice(this.currentIndex, 1)
      this.isShow = false
    }
  },
  watch: {
    'searchVal' (newV, oldV) {
      this.searchList = this.dataList.filter(e => {
        return e.bname.indexOf(newV) !== -1
      })
    }
  },
  directives: {
    myfocus, mycolor
  },
  filters: {
    timeFormat
  }
}
</script>
<style lang="less" scoped>
    #app {
        width: 600px;
        margin: 10px auto;
    }

    .tb {
        border-collapse: collapse;
        width: 100%;
    }

    .tb th {
        background-color: #0094ff;
        color: white;
    }

    .tb td,
    .tb th {
        padding: 5px;
        border: 1px solid black;
        text-align: center;
    }

    .add {
        padding: 5px;
        border: 1px solid black;
        margin-bottom: 10px;
    }
    .mask{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4);
    }
    .alert{
        position: relative;
        margin-left: 150px;
        margin-top: -240px;
        width: 320px;
        height: 220px;
        background: #fff;
        text-align: center;
    }
    .alert h2{
        text-align: center;
    }
    .content{
        width: 320px;
        height: 120px;
    }
</style>
