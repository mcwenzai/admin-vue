<template>
  <el-drawer
    title="审核历史"
    :visible.sync="drawer"
    direction="rtl"
    :before-close="handleClose"
    size="30%">
    <sht-table :tableColumn="tableColumn">
    </sht-table>
    <pagination 
      v-show="total>0" 
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList">
    </pagination>
  </el-drawer>
</template>

<script>
export default {
  name: 'auditHistory',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      total: 1,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      tableColumn: [
        {
          name: '审核人',
          key: 'aduiter',
        },{
          name: '审核状态',
          key: 'aduitState',
        },{
          name: '审核不通过原因',
          key: 'cause',
        },{
          name: '时间',
          key: 'time'
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose', false)
    },
    getList() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-drawer__body {
    padding: 0 20px;
  }
}
</style>