<template>
  <div class="withdrawl-record-wrap" v-loading="true"
		element-loading-text="正在开发中......">
    <el-row>
      <el-form :inline="true" :model="queryParams">
        <el-col :lg="8" :md="12" :xs="24" :sm="24">
          <el-form-item label="提现单号">
            <el-input style="width: 200px;" placeholder="请输入提现单号" v-model="queryParams.withdrawlNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="24" :xs="24" :sm="24">
          <el-form-item label="到账时间">
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
        <el-col :lg="8" :md="12" :xs="24" :sm="24">
          <el-form-item label="当前状态">
            <el-select v-model="queryParams.state">
              <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
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
  name: 'withdrawalRecord',
  data() {
    return {
      queryParams: {
        withdrawlNumber: '',
        state: '',
        times: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [
        {
          value: 1,
          label: '全部'
        }, {
          value: 2,
          label: '待审核'
        }, {
          value: 3,
          label: '已提现'
        }
      ],
      tableColumn: [
        {
          name: '提现单号',
          key: 'withdrawlNumber'
        }, {
          name: '到账时间',
          key: 'time'
        }, {
          name: '提现金额',
          key: 'price'
        }, {
          name: '当前状态',
          key: 'state'
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
.withdrawl-record-wrap {
  padding: 20px;
}
</style>