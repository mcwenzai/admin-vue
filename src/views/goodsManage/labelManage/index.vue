<template>
	<div class="app-container">
		<el-row>
			<el-col :lg="6" :md="12" :sm="24" :xs="24">
				<span>标签名称：</span>
				<el-input
					style="width: 250px;"
					placeholder="请输入标签名称"
					v-model="queryParams.name"
				></el-input>
			</el-col>
			<el-col :lg="6" :md="12" :sm="24" :xs="24">
				<el-button type="primary" @click="getList">查询</el-button>
				<el-button @click="handleInit">重置</el-button>
			</el-col>
		</el-row>
		<el-row style="padding: 20px 0;">
			<el-col :lg="12" :md="12" :sm="24" :xs="24">
				<el-button icon="el-icon-plus" type="primary" @click="handleAddLabel"
					>添加标签</el-button
				>
				<el-button @click="handleRemoveMore">批量删除</el-button>
			</el-col>
		</el-row>
		<el-row>
			<sht-table
				:tableData="tableData"
				:tableColumn="tableColumn"
        v-loading="loading"
				@handleSelectionChange="handleSelectionChange"
			>
				<template slot="operate" slot-scope="scope">
					<el-button type="text" @click="handleEditLabel(scope.scope)"
						>编辑</el-button
					>
					<el-button type="text" @click="handleRemove(scope.scope.id)">删除</el-button>
				</template>
			</sht-table>
			<pagination
				v-show="total > 0"
				:total="total"
				:page.sync="queryParams.pageNum"
				:limit.sync="queryParams.pageSize"
				@pagination="getList"
			></pagination>
		</el-row>
		<label-operate
			:title="title"
			:drawer="visible"
			:id="id"
			@handleClose="handleClose"
		></label-operate>
	</div>
</template>

<script>
import labelOperate from './components/labelOperate'
import { tagList, delTag } from '@/api/goodsManage/labelManage'
export default {
	name: 'labelManage',
	components: {
		labelOperate,
	},
	data() {
		return {
			queryParams: {
				name: '',
				pageNum: 1,
				pageSize: 10,
			},
			total: 1,
			title: '添加标签',
			labelName: '',
      visible: false,
      loading: false,
			id: 0,
			tableColumn: [
				{
					type: 'selection',
					width: 55,
				},
				{
					name: '标签名称',
					key: 'name',
				},
				{
					name: '标签类型',
					key: 'type',
				},
				{
					name: '上传时间',
					key: 'createTime',
				},
				{
					name: '操作',
					key: 'operate',
					slotName: 'operate',
				},
			],
      tableData: [],
      checkData: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handleEditLabel(val) {
			this.visible = true
			this.title = '编辑标签'
			this.id = val.id
		},
		handleAddLabel() {
			this.visible = true
			this.title = '添加标签'
		},
		handleRemove(val) {
			this.$confirm('此操作将删除该品牌信息?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					delTag(val).then((res) => {
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
      const ids = this.checkData.join(',')
      this.handleRemove(ids)
    },
		handleClose(val) {
			this.visible = val.drawer
			if (val.init) {
				this.queryParams.name = ''
				this.getList()
			}
			if (this.title === '添加标签') {
				this.key++
			}
		},
		getList() {
      this.loading = true
			tagList(this.queryParams).then((res) => {
        let data = res.rows
				this.total = res.total
        this.tableData = data.map(item => {
          item.type = item.type === "1" ? 'S2B' : 'B2C'
          return item
        })
        this.loading = false
			})
		},
		handleSelectionChange(val) {
      this.checkData = val.map(item => item.id)
		},
		handleInit() {
			this.queryParams.name = ''
		},
	},
}
</script>

<style></style>
