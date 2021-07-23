<template>
  <el-drawer
    title="审核历史"
    :visible.sync="drawer"
    direction="rtl"
    :before-close="handleClose"
    size="30%">
    <sht-table :tableColumn="tableColumn" :tableData="tableData">
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
import {filterGoodsState} from '@/utils/util'
import {manufactureAuditHistory} from '@/api/goodsManage/supplyAuditGoods'
export default {
  name: 'auditHistory',
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    goodsId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      total: 0,
      queryParams: {
        goodsId: this.goodsId,
        pageNum: 1,
        pageSize: 10,
      },
      tableColumn: [
        {
          name: '审核人',
          key: 'createBy',
        },{
          name: '审核状态',
          key: 'status',
        },{
          name: '审核不通过原因',
          key: 'reason',
        },{
          name: '时间',
          key: 'createTime'
        }
      ],
      tableData: []
    }
  },
  created() {
this.queryParams.goodsId = this.goodsId
    this.getList()
  },
  methods: {
    handleClose() {
      this.$emit('handleClose', false)
    },
    getList() {
      manufactureAuditHistory(this.queryParams).then(res => {
        let data = res.rows
        this.tableData = data.map(item => {
          item.status = filterGoodsState(Number(item.status), 'list')
          return item
        })
        this.total = res.total
      })
    }
  },
  watch: {
    goodsId(newVal) {
      this.getList()
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