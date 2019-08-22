<template>
    <div class="son">
        <h1>子组件</h1>
        <p>从父组件传来的数据：{{ sname }}</p>
        <hr>
        <button @click="setfnametofather">点击从子组件传给父组件名字</button>
        <hr>
        <p>从子组件2传过来的子组件的值：{{ sonname }}</p>
    </div>
</template>
<script>
import Bus from '@/utils/myvue.js'
export default {
  props: ['sname'],
  data () {
    return {
      fname: 'sontofathername',
      sonname: '??'
    }
  },
  methods: {
    setfnametofather () {
      this.$emit('setfname', this.fname)
    }
  },
  mounted () {
    Bus.$on('setsonname', data => {
      this.sonname = data
    })
  }
}
</script>
<style lang="less" scoped>
.son{
    width:800px;
    height: 200px;
    margin:0 auto;
    background: rgba(57, 55, 172, 0.3)
}
</style>
