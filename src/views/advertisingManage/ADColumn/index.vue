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
            label="广告栏状态:"
            prop="state"
          >
            <el-select
              v-model="queryParams.state"
              placeholder="请选择广告栏状态"
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
        <el-col :span="8" :lg="8" :md="10" :sm="24" :xs="24">
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
        <el-col :span="6" :lg="6" :md="6" :sm="24" :xs="24">
          <el-button type="primary" @click="handelSearch">查询</el-button>
          <el-button @click="handleInit">重置</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="6" :lg="6" :md="8" :sm="12" :xs="12">
        <el-button icon="el-icon-plus" size="small" type="primary" @click="handleAddOrEdit('add')">添加广告栏</el-button>
        <el-button size="small" @click="handleBatchRemove">批量删除</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <sht-table :tableColumn="tableColumn">
        <template slot="operate" slot-scope="scope">
          <el-button type="text" @click="handleAddOrEdit('edit',scope)">编辑</el-button>
          <el-button type="text" @click="handleBatchRemove(scope)">删除</el-button>
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
  name: 'ADColumn',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      total: 10,
      queryParams: {
        state: '',
        times: '',
        pageNum: 1,
        pageSize: 10
      },
      tableColumn: [
        {
          type: 'selection',
          width: 55
        },
        {
          name: '广告栏图片',
          key: 'ad_img',
          width: 180,
          align: 'center'
        },
        {
          name: '类型',
          key: 'type',
          width: 180,
          align: 'center'
        },
        {
          name: '跳转到',
          key: 'date',
          width: 180,
          align: 'center'
        },
        {
          name: '位置',
          key: 'location',
          width: 180,
          align: 'center'
        },
        {
          name: '投放时间',
          key: 'time',
          width: 180,
          align: 'center'
        },
        {
          name: '排序',
          key: 'sort',
          width: 180,
          align: 'center'
        },
        {
          name: '状态',
          key: 'state',
          width: 180,
          align: 'center'
        },{
          name: '操作',
          key: 'operate',
          slotName: 'operate',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    handelSearch() {

    },
    handleInit() {

    },
    handleAddOrEdit(type,value) {
      this.$router.push({
        path: `/advertisingManage/ADColumn/${type}`,
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