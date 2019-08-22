<template>
    <div class="list">
        <h1>列表</h1>
        <p>{{ info }}</p>
        <button @click="showInfo">点击获得详情信息</button>
        <router-view />
    </div>
</template>
<script>
export default {
  data () {
    return {
      info: '??'
    }
  },
  mounted () {
    let id = this.$route.params.id
    this.opt(id)
  },
  watch: {
    '$route' (to, from) {
      let id = to.params.id
      this.opt(id)
    }
  },
  methods: {
    opt (id) {
      if (id === '1') {
        this.info = '列表1数据'
      } else if (id === '2') {
        this.info = '列表2数据'
      } else if (id === '3') {
        this.info = '列表3数据'
      }
    },
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
  }
}
</script>
<style lang="less" scoped>
.list{
    width:800px;
    height: 400px;
    margin:0 auto;
    background: rgba(234,23,132,.3)
}
</style>
