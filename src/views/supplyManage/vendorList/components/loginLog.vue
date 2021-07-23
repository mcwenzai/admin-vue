<template>
  <div class="login-log-wrap" v-loading="true"
		element-loading-text="正在开发中......">
    <sht-table :tableColumn="tableColumn"></sht-table>
  </div>
</template>

<script>
export default {
  name: 'loginLog',
  data() {
    return {
      tableColumn: [
        {
          name: '时间',
          key: 'time'
        }, {
          name: 'IP',
          key: 'ip'
        }, {
          name: '地区',
          key: 'place'
        }, {
          name: '登录方式',
          key: 'equipment'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.login-log-wrap {
  padding: 20px;
}
</style>