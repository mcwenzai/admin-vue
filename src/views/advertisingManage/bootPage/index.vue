<template>
<div class="app-container" v-loading="true"
		element-loading-text="正在开发中......">
    <el-row :gutter="20" style="padding: 20px 0;">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true">
        <el-col :span="6" :lg="6" :md="12" :sm="24" :xs="24">
          <el-form-item
            label="启动页名称:"
            prop="pageName"
          >
          <el-input v-model="queryParams.pageName" placeholder="请输入启动页名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :lg="6" :md="12" :sm="24" :xs="24">
          <el-form-item
            label="启动页状态:"
            prop="pageState"
          >
            <el-select
              v-model="queryParams.pageState"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="8" :md="16" :sm="24" :xs="24">
          <el-form-item label="投放时间:" prop="times">
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
        <el-col :span="3" :lg="4" :md="8" :sm="24" :xs="24">
          <el-button type="primary" @click="handelSearch">查询</el-button>
          <el-button @click="handleInit">重置</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="6" :lg="6" :md="8" :sm="12" :xs="12">
        <el-button icon="el-icon-plus" size="small" type="primary" @click="handleAddOrEdit('add')">添加启动页</el-button>
        <el-button size="small" @click="handleBatchRemove">批量删除</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <sht-table :tableColumn="tableColumn">
        <template slot="operate" slot-scope="scope">
          <el-button type="text" @click="handleAddOrEdit('edit', scope)">编辑</el-button>
          <el-button type="text" @click="handleRemove(scope)">删除</el-button>
          <el-button type="text" @click="handleSoldOut(scope)">下架</el-button>
        </template>
      </sht-table>
    </el-row>
    <pagination 
      v-show="total>0" 
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"></pagination>
  </div>
</template>

<script>
export default {
  name: 'bootPage',
  data() {
    return {
      options: [{
        value: 1,
        label: '全部'
      }, {
        value: 2,
        label: '上架'
      }, {
        value: 3,
        label: '下架'
      }],
      tableColumn: [
        {
          type: 'selection',
          width: 55
        },{
          name: '启动页名称',
          key: "pageName",
          width: 180
        },{
          name: '启动页图片',
          key: "pageImg",
          width: 240
        },{
          name: '跳转到',
          key: "locationTo",
          width: 180
        },{
          name: '显示时间(秒)',
          key: "showTimes",
          width: 180
        },{
          name: '投放时间',
          key: "times",
          width: 240
        },{
          name: '启动页状态',
          key: "state",
          width: 180
        },{
          name: '操作',
          key: 'operate',
          slotName: 'operate'
        }
      ],
      queryParams: {
        pageName: '',
        pageState: 1,
        times: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 10
    }
  },
  methods: {
    handleAddOrEdit(type) {
      this.$router.push({
        path: `/advertisingManage/bootPage/${type}`,
        query: {
          type
        }
      })
    },
    handleBatchRemove() {

    },
    handelSearch() {

    },
    handleInit() {

    },
    getList() {

    }
  }
}
</script>

<style>

</style>