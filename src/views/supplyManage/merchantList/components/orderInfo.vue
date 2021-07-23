<template>
  <div class="order-info-wrap" v-loading="true"
		element-loading-text="正在开发中......">
    <el-row>
      <el-form :inline="true" :model="queryParams">
        <el-col :lg="8" :md="12" :xs="24" :sm="24">
          <el-form-item label="订单编号">
            <el-input style="width: 200px;" placeholder="请输入订单编号" v-model="queryParams.orderNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="12" :xs="24" :sm="24">
          <el-form-item label="订单状态">
            <el-select v-model="queryParams.state">
              <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="24" :xs="24" :sm="24">
          <el-form-item label="下单时间">
            <el-date-picker 
            v-model="queryParams.times" 
            style="width: 355px;"
            type="datetimerange" 
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :lg="8" :md="12" :xs="24" :sm="24">
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>
    <el-row style="padding: 20px 0;">
      <sht-table :tableColumn="tableColumn"></sht-table>
      <pagination 
      v-show="total>0" 
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"></pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'orderInfo',
  data() {
    return {
      queryParams: {
        orderNumber: '',
        state: '',
        times: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [
        {
          value: 1,
          label: '待入账'
        }, {
          value: 2,
          label: '已入账'
        }, {
          value: 3,
          label: '退款成功'
        }
      ],
      tableColumn: [
        {
          name: '货品商品',
          key: 'goodsName'
        }, {
          name: '订单编号',
          key: 'orderNumber'
        }, {
          name: '来源',
          key: 'source'
        }, {
          name: '交易时间',
          key: 'payTime'
        }, {
          name: '交易金额(元)',
          key: 'amount'
        }, {
          name: '平台服务费(元)',
          key: 'servicePrice'
        }, {
          name: '收入金额',
          key: 'incomePrice'
        }, {
          name: '订单状态',
          key: 'orderState'
        }
      ],
      total: 1
    }
  },
  methods: {
    getList() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.order-info-wrap {
  padding: 20px;
}
</style>