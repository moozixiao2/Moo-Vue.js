<template>
    <div class="father">
        <h1>父组件</h1>
        <p>子组件传给父组件值：{{ fname }}</p>
        <son :sname='sname' @setfname='getfname'></son>
        <sons></sons>
    </div>
</template>
<script>
import son from '@/components/son.vue'
import sons from '@/components/sons.vue'
export default {
  components: {
    son, sons
  },
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
}
</script>
<style lang="less" scoped>
.father{
    width:800px;
    height: 500px;
    margin:0 auto;
    background: rgba(53, 236, 46, 0.3)
}
</style>
