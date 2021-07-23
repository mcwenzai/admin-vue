<template>
	<div class="app-container">
		<el-row>
			<el-col :lg="6" :md="12" :sm="24" :xs="24">
				<span>品牌名称：</span>
				<el-input
					style="width: 250px;"
					placeholder="请输入品牌名称"
					v-model="queryParams.name"
				></el-input>
			</el-col>
			<el-col :lg="6" :md="12" :sm="24" :xs="24">
				<el-button type="primary" @click="getList">查询</el-button>
				<el-button @click="queryParams.name = ''">重置</el-button>
			</el-col>
		</el-row>
		<el-row style="padding: 20px 0;">
			<el-col :lg="12" :md="12" :sm="24" :xs="24">
				<el-button icon="el-icon-plus" type="primary" @click="handleAddBrand"
					>添加商品品牌</el-button
				>
			</el-col>
		</el-row>
		<el-row>
			<sht-table
				:tableData="tableData"
				:tableColumn="tableColumn"
				v-loading="loading"
				@handleSelectionChange="handleSelectionChange"
			>
				<template slot="logoUrl" slot-scope="scope">
					<el-image
						style="width: 100px; height: 100px"
						fit="fill"
						:src="scope.scope.logoUrl"
						:preview-src-list="[scope.scope.logoUrl]"
					></el-image>
				</template>
				<template slot="operate" slot-scope="scope">
					<el-button type="text" @click="handleEditBrand(scope.scope)"
						>编辑</el-button
					>
					<el-button type="text" @click="handleRemove(scope.scope)"
						>删除</el-button
					>
				</template>
			</sht-table>
			<pagination
				v-show="total > 0"
				:total="total"
				:loading="loading"
				:page.sync="queryParams.pageNum"
				:limit.sync="queryParams.pageSize"
				@pagination="getList"
			></pagination>
		</el-row>
		<brand-operate
			:title="title"
			:drawer="visible"
			:id="brandId"
			:key="key"
			@handleClose="handleClose"
		></brand-operate>
	</div>
</template>

<script>
import { list, delBrand } from '@/api/goodsManage/brandManage'
import brandOperate from './components/brandOperate'
export default {
	name: 'labelManage',
	components: {
		brandOperate,
	},
	data() {
		return {
			queryParams: {
				name: '',
				pageNum: 1,
				pageSize: 10,
			},
			loading: false,
			total: 1,
			brandId: 0,
			title: '添加品牌',
			visible: false,
			key: 1,
			tableColumn: [
				{
					type: 'selection',
					width: 55,
				},
				{
					name: '品牌名称',
					key: 'name',
				},
				{
					name: '品牌LOGO',
					key: 'logoUrl',
					slotName: 'logoUrl',
				},
				{
					name: '添加时间',
					key: 'createTime',
				},
				{
					name: '操作',
					key: 'operate',
					slotName: 'operate',
				},
			],
			tableData: [],
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handleEditBrand(val) {
			this.visible = true
			this.title = '编辑品牌'
			this.brandId = val.id
		},
		handleAddBrand() {
			this.visible = true
			this.title = '添加品牌'
		},
		handleRemove(val) {
			this.$confirm('此操作将删除该品牌信息?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',  
			})
				.then(() => {
					delBrand(val.id).then((res) => {
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
		handleRemoveMore() {},
		handleClose(val) {
			this.visible = val.drawer
			if (val.init) {
				this.queryParams.name = ''
				this.getList()
			}
			if (this.title === '添加品牌') {
				this.key++
			}
		},
		getList() {
			this.loading = true
			list(this.queryParams).then((res) => {
				this.tableData = res.rows
				this.total = res.total
				this.loading = false
			})
		},
		handleSelectionChange(val) {
			console.log(val)
		},
	},
}
</script>

<style></style>
