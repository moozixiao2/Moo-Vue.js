<template>
    <div class="sons">
        <h1>子组件2</h1>
        <button @click="setsonnametoson">子组件2传值给子组件</button>
    </div>
</template>
<script>
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
<style lang="less" scoped>
.sons{
    width:800px;
    height: 100px;
    margin:0 auto;
    background: rgba(199, 80, 129, 0.3)
}
</style>
