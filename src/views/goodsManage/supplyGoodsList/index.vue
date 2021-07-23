<template>
	<div class="app-container">
		<el-row :gutter="20" style="padding: 20px 0;">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="供应货品名称:" prop="name">
						<el-input
							style="width: 200px;"
							placeholder="请输入货品名称"
							v-model="queryParams.name"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="联系电话:" prop="contactPhone">
						<el-input
							style="width: 200px;"
							placeholder="请输入联系电话"
							v-model="queryParams.contactPhone"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="货品编号:" prop="goodsCode">
						<el-input
							style="width: 200px;"
							placeholder="请输入货品编号"
							v-model="queryParams.goodsCode"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="厂商名称:" prop="belongsManufacturer">
						<el-input
							style="width: 200px;"
							placeholder="请输入厂商名称"
							v-model="queryParams.belongsManufacturer"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="货品状态:" prop="state">
						<el-select v-model="queryParams.status">
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
					<el-form-item label="申请时间:" prop="createTime">
						<el-date-picker
							v-model="dateRange"
							type="datetimerange"
							value-format="yyyy-MM-dd HH:mm:ss"
							align="right"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:default-time="['00:00:00', '23:59:59']"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :offset="16" :span="6" :lg="6" :md="6" :sm="24" :xs="24">
					<el-button type="primary" @click="getList">查询</el-button>
					<el-button @click="handleInit">重置</el-button>
				</el-col>
			</el-form>
		</el-row>
		<el-row>
			<el-col :span="6" :lg="6" :md="8" :sm="12" :xs="12">
				<el-button size="small" @click="handlePassMore">批量下架</el-button>
				<el-button size="small" @click="handlePassMore">批量上架</el-button>
				<el-button size="small" @click="handlePassMore">数据导出</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-top: 20px">
			<sht-table :tableData="tableData" :tableColumn="tableColumn">
				<template slot="goodsCode" slot-scope="scope">
					<el-button
						type="text"
						size="small"
						@click="getGoodsDetail(scope.scope)"
						>{{ scope.scope.goodsCode }}</el-button
					>
				</template>
				<template slot="operate" slot-scope="scope">
					<el-button
						type="text"
						size="small"
						v-if="
							scope.scope.status === '待审核' || scope.scope.status === '已下架'
						"
						@click="handleOperate(scope.scope, true)"
						>上架</el-button
					>
					<el-button
						type="text"
						size="small"
						v-else-if="
							scope.scope.status === '已通过' || scope.scope.status === '已上架'
						"
						@click="handleOperate(scope.scope, false)"
						>下架</el-button
					>
					<el-button
						type="text"
						size="small"
						@click="getGoodsDetail(scope.scope)"
						>查看</el-button
					>
				</template>
			</sht-table>
		</el-row>
		<pagination
			v-show="total > 0"
			:total="total"
			:page.sync="queryParams.pageNum"
			:limit.sync="queryParams.pageSize"
			@pagination="getList"
		></pagination>
	</div>
</template>

<script>
import {
	manufactureGoodsList,
	manufactureGoodsAudit,
	batchAudit,
} from '@/api/goodsManage/supplyAuditGoods'
import { filterGoodsState, parseTime } from '@/utils/util'
export default {
	name: 'supplyAuditGoods',
	data() {
		return {
			options: [
				{
					value: '888',
					label: '全部',
				},
				{
					value: 2,
					label: '上架',
				},
				{
					value: 9,
					label: '下架',
				},
			],
			total: 0,
			dateRange: [],
			queryParams: {
				name: '',
				contactPhone: '',
				goodsCode: '',
				belongsManufacturer: '',
				status: '888',
				createTime: '',
				pageNum: 1,
				pageSize: 10,
			},
			tableData: [],
			tableColumn: [
				{
					type: 'selection',
					width: 55,
				},
				{
					name: '供应货品编号',
					key: 'goodsCode',
					slotName: 'goodsCode',
				},
				{
					name: '供应货品名称',
					key: 'name',
				},
				{
					name: '联系电话',
					key: 'contactPhone',
				},
				{
					name: '发布时间',
					key: 'createTime',
				},
				{
					name: '商品分类',
					key: 'categoryName',
				},
				{
					name: '所属厂商',
					key: 'belongsManufacturer',
				},
				{
					name: '状态',
					key: 'status',
				},
				{
					name: '操作',
					key: 'operate',
					slotName: 'operate',
					align: 'center',
				},
			],
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handleInit() {
			this.queryParams = {
				name: '',
				contactPhone: '',
				goodsCode: '',
				belongsManufacturer: '',
				status: '888',
				pageNum: 1,
				pageSize: 10,
			},
			this.dateRange = []
		},
		getList() {
			manufactureGoodsList(this.addDateRange(this.queryParams, this.dateRange)).then((res) => {
				let data = res.rows
				this.tableData = data.map((item) => {
					item.status = filterGoodsState(item.status, 'list')
					return item
				})
				this.total = res.total
			})
		},
		getGoodsDetail(value) {
			this.$router.push({
				path: '/goodsManage/supplyGoodsList/detail',
				query: {
					value: JSON.stringify(value),
				},
			})
		},
		handlePassMore() {},
		handleOperate(val, flag) {
			let text = flag ? '上架' : '下架'
			let status = flag ? '2' : '9'
			this.$confirm(`此操作将${text}该商品, 是否继续?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					const param = {
						goodsId: val.id,
						status,
					}
					manufactureGoodsAudit(param).then((res) => {
						if (res.code === 200) {
							this.$message({
								type: res.code === 200 ? 'success' : 'error',
								message: res.msg,
							})
							this.handleInit()
							this.getList()
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: `取消${text}`,
					})
				})
		},
		handleNoPass(val) {
			console.log(val)
		},
	},
}
</script>

<style lang="scss" scoped>
.app-container {
	padding: 20px;
	.el-form--inline .el-form-item__label {
		width: 105px;
		text-align: right;
	}
}
</style>
