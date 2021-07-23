<template>
  <div class="app-container">
    <el-row>
      <h3>厂商详情信息</h3>
    </el-row>
    <el-row style="padding: 20px 0;">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="入驻信息" name='1'>
          <audit-detail></audit-detail>
        </el-tab-pane>
        <el-tab-pane label="缴纳金额信息" name="2">
          <payment-info></payment-info>
        </el-tab-pane>
        <el-tab-pane label="订单流水" name="3">
          <order-info></order-info>
        </el-tab-pane>
        <el-tab-pane label="提现记录" name="4">
          <withdrawl-record></withdrawl-record>
        </el-tab-pane>
        <el-tab-pane label="登录日志" name="5">
          <login-log></login-log>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import auditDetail from '../../merchantEntryAudit/modules/auditDetail'
import paymentInfo from '../components/paymentInfo'
import orderInfo from '../components/orderInfo'
import withdrawlRecord from '../components/withdrawalRecord'
import loginLog from '../components/loginLog'
export default {
  name: 'listDetail',
  components: {
    auditDetail,
    paymentInfo,
    orderInfo,
    withdrawlRecord,
    loginLog
  },
  data() {
    return {
      activeName: '1',
    }
  },
  created() {

  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>