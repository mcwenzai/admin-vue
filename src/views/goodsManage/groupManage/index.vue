<template>
  <div class="app-container" v-loading="true"
		element-loading-text="正在开发中......">
    <el-row>
      <el-col :lg="6" :md="12" :sm="24" :xs="24">
        <el-button icon="el-icon-plus" type="primary" @click="handleAddGroup">创建分组</el-button>
      </el-col>
    </el-row>
    <el-row style="padding-top: 25px;">
      <el-col>
        <el-table 
        row-key="menuId"
        :data="data"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="groupName" label="分组名称" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="goodsNums" label="商品数" align="center">
        </el-table-column>
        <el-table-column prop="isShow" label="是否显示">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditGroup(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleRemoveGroup(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-col>
    </el-row>
    <group-operate @handleClose="handleClose" :drawer="visable" :title="title"></group-operate>
  </div>
</template>

<script>
import groupOperate from './components/groupOperate'
export default {
  name: 'groupManage',
  components: {
    groupOperate 
  },
  data() {
    return {
      title: '创建分组',
      visable: false,
      data: [
        {
          groupName: '今日推荐',
          goodsNums: 34,
          isShow: '是',
        }, {
          groupName: '每日好货',
          goodsNums: 28,
          isShow: '是',
        }, {
          groupName: '整点秒杀',
          goodsNums: 16,
          isShow: '是',
        }
      ]
    }
  },
  created() {

  },
  methods: {
    handleEditGroup(val) {
      this.title = "编辑分组"
      this.visable = true
    },
    handleRemoveGroup(val) {

    },
    handleAddGroup() {
      this.title = "创建分组"
      this.visable = true
    },
    handleClose(val) {
      this.visable = val
    }
  }
}
</script>

<style>

</style>