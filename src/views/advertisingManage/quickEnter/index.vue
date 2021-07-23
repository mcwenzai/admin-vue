<template>
  <div class="app-container" v-loading="true"
		element-loading-text="正在开发中......">
    <el-row :gutter="20" style="padding: 20px 0;">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true">
        <el-col :span="6" :lg="6" :md="8" :sm="24" :xs="24">
          <el-form-item
            label="快捷入口名称:"
            prop="pageName"
          >
          <el-input style="width: 250px;" placeholder="请输入快捷入口名称" v-model="queryParams.pageName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :lg="6" :md="6" :sm="24" :xs="24">
          <el-button type="primary" @click="handelSearch">查询</el-button>
          <el-button @click="handleInit">重置</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="6" :lg="6" :md="8" :sm="12" :xs="12">
        <el-button icon="el-icon-plus" size="small" type="primary" @click="handleAddOrEdit('add')">添加入口</el-button>
        <el-button size="small" @click="handleBatchRemove">批量删除</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <sht-table :tableColumn="tableColumn">
        <template slot="operate" slot-scope="scope">
          <el-button type="text" @click="handleAddOrEdit('edit', scope)"></el-button>
          <el-button type="text" @click="handleRemove(scope)"></el-button>
          <el-button type="text" @click="handleSoldOut(scope)"></el-button>
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
  name: 'ADColumn',
  data () {
    return {
      total: 10,
      queryParams: {
        pageName: '',
        pageNum: 1,
        pageSize: 10
      },
      tableColumn: [
        {
          type: 'selection',
          width: 55
        },
        {
          name: '快接入口名称',
          key: 'pageName',
          width: 180,
        },
        {
          name: '图标',
          key: 'icon',
          width: 180,
        },
        {
          name: '跳转到',
          key: 'locationTo',
          width: 180,
        },
        {
          name: '发布状态',
          key: 'publishState',
          width: 180,
        },
        {
          name: '排序',
          key: 'sort',
          width: 180,
        },
        {
          name: '更新时间',
          key: 'times',
          width: 180,
        },{
          name: '操作',
          key: 'operate',
          slotName: 'operate'
        }
      ],
    }
  },
  methods: {
    handelSearch() {

    },
    handleInit() {

    },
    handleAddOrEdit(type, value) {
      this.$router.push({
        path: `/advertisingManage/quickEnter/${type}`,
        query: {
          type
        }
      })
    },
    handleBatchRemove(value) {

    },
    handleSoldOut(value) {

    },
    getList() {
      
    },
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
  }
</style>