<template>
  <div class="app-container">
    <el-row>
      <el-col :lg="6" :md="12" :sm="24" :xs="24">
        <span>属性名称：</span>
        <el-input style="width: 250px;" placeholder="请输入品牌名称" v-model="queryParams.name"></el-input>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xs="24">
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>
    <el-row style="padding: 20px 0;">
      <el-col :lg="12" :md="12" :sm="24" :xs="24">
        <el-button icon="el-icon-plus" type="primary" @click="dialogVisible = true">添加SKU属性</el-button>
      </el-col>
    </el-row>
    <el-row>
      <sht-table :tableData="tableData" :tableColumn="tableColumn" v-loading="loading" @handleSelectionChange="handleSelectionChange">
        <template slot="name" slot-scope="scope">
          <el-button type="text" @click="handleToDetail(scope.scope)">{{scope.scope.name}}</el-button>
        </template>
        <template slot="operate" slot-scope="scope">
          <el-button type="text" @click="handleEditProperty(scope.scope)">编辑</el-button>
          <el-button type="text" @click="handleRemove(scope.scope)">删除</el-button>
        </template>
      </sht-table>
      <pagination 
      v-show="total>0" 
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"></pagination>
    </el-row>
    <el-dialog
      title="添加SKU属性"
      :visible.sync="dialogVisible"
      width="30%">
      <span style="margin-right: 20px;">属性名:</span>
      <el-input style="width: 80%;" placeholder="请输入属性名" v-model="attributeName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddProperty">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {attributeList, addAttribute, delAttribute} from '@/api/goodsManage/goodsPropertyLib'
export default {
  name: 'labelManage',
  data() {
    return {
      queryParams: {
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 1,
      labelName: '',
      attributeName: '',
      loading: false,
      dialogVisible: false,
      tableColumn: [
        {
          type: 'selection',
          width: 55
        },{
          name: '创建时间',
          key: 'createTime',
        },{
          name: '属性名称',
          key: 'name',
          slotName: 'name'
        },{
          name: '操作',
          key: 'operate',
          slotName: 'operate'
        }
      ],
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleEditProperty(val) {
      this.$router.push({
        path: '/goodsManage/goodsPropertyLib/edit',
        query: {
          val
        }
      })
    },
    handleToDetail(val) {
      this.$router.push({
        path: '/goodsManage/goodsPropertyLib/edit',
        query: {
          val
        }
      })
    },
    handleAddProperty() {
      const params = {
        name: this.attributeName
      }
      addAttribute(params).then(res => {
        console.log(res);
      })
      this.dialogVisible = false
      this.handleInit()
      this.getList()
    },
    handleRemove(val) {
      this.$confirm('此操作将删除该商品属性信息?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',  
			})
				.then(() => {
					delAttribute(val.id).then(res => {
						this.$message({
							showClose: true,
							message: res.msg,
							type: res.code === 200 ? 'success' : 'error',
						})
						if (res.code === 200) {
							this.getList()
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					})
				})
    },
    handleRemoveMore() {

    },
    handleInit() {
      this.queryParams.name = ''
      this.attributeName = ''
    },
    getList() {
      this.loading = true
      attributeList(this.queryParams).then(res => {
        this.tableData = res.rows
        this.total = res.total
        this.loading = false
      })
    },
    handleSelectionChange(val) {
      console.log(val);
    }
  }
}
</script>

<style>

</style>