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
					<el-form-item label="厂商名称:" prop="firm">
						<el-input
							style="width: 200px;"
							placeholder="请输入厂商名称"
							v-model="queryParams.firm"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="审批状态:" prop="status">
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
				<el-button size="small" @click="handlePassMore">批量通过</el-button>
				<el-button size="small" @click="handleExportData">数据导入</el-button>
				<el-button size="small" @click="handleImportData">数据导出</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-top: 20px">
			<sht-table
				:tableData="tableData"
				:tableColumn="tableColumn"
				@handleSelectionChange="handleSelectionChange"
			>
				<template slot="goodsCode" slot-scope="scope">
					<el-button
						type="text"
						size="small"
						@click="getGoodsDetail(scope.scope)"
						>{{ scope.scope.goodsCode }}</el-button
					>
				</template>
				<template slot="operate" slot-scope="scope">
					<div
						v-if="
							scope.scope.status === '待审核'
						"
					>
						<el-button type="text" size="small" @click="handlePass(scope.scope)"
							>通过</el-button
						>
						<el-button
							type="text"
							size="small"
							@click="handleNoPass(scope.scope)"
							>不通过</el-button
						>
					</div>
					<el-button
						v-else
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
		<el-dialog title="驳回信息" :visible.sync="dialogVisible" width="30%">
			<span style="display: inline-block; padding: 10px 0;">审核意见:</span>
			<el-input
				type="textarea"
				:autosize="{ minRows: 2, maxRows: 4 }"
				v-model="rejectInfo"
			></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleReject">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import {
	manufactureGoodsList,
  manufactureGoodsAudit,
  batchAudit
} from '@/api/goodsManage/supplyAuditGoods'
import { filterGoodsState } from '@/utils/util'
export default {
	name: 'supplyAuditGoods',
	data() {
		return {
			options: [
				{
					value: '999',
					label: '全部',
				},
				{
					value: '1',
					label: '待审核',
				},
				{
					value: '3',
					label: '审核不通过',
				},
			],
			total: 0,
			dialogVisible: false,
			selectedRows: {},
			selectedList: [],
			dateRange: [],
			rejectInfo: '',
			queryParams: {
				name: '',
				contactPhone: '',
				goodsCode: '',
				belongsManufacturer: '',
				status: '999',
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
					name: '货品分类',
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
		getList() {
			console.log(this.addDateRange(this.queryParams, this.dateRange));
			manufactureGoodsList(this.addDateRange(this.queryParams, this.dateRange)).then((res) => {
				let data = res.rows
				this.total = res.total
				this.tableData = data.map((item) => {
					item.status = filterGoodsState(item.status)
					return item
				})
				
			})
		},
		handleInit() {
			this.queryParams = {
				name: '',
				contactPhone: '',
				goodsCode: '',
				belongsManufacturer: '',
				status: '999',
				pageNum: 1,
				pageSize: 10,
			}
			this.rejectInfo = ''
			this.dateRange = []
		},
		getGoodsDetail(value) {
			this.$router.push({
				path: '/goodsManage/supplyAuditGoods/detail',
				query: {
					value: JSON.stringify(value),
				},
			})
		},
		handleReject() {
			const param = {
				goodsId: this.selectedRows.id,
				status: '3',
				reason: this.rejectInfo,
			}
			manufactureGoodsAudit(param).then((res) => {
				if (res.code === 200) {
					this.$message({
						type: res.code === 200 ? 'success' : 'error',
						message: res.msg,
					})
					this.dialogVisible = false
					this.handleInit()
					this.getList()
				}
			})
		},
		handlePassMore() {
			this.$confirm('此操作将审核通过已选择的商品, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
          // this.selectedList
					batchAudit({ids: this.selectedList.join(',')}).then((res) => {
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
						message: '取消通过',
					})
				})
		},
		handlePass(val) {
			this.$confirm('此操作将审核通过该商品, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					const param = {
						goodsId: val.id,
						status: '2',
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
						message: '取消通过',
					})
				})
		},
		handleNoPass(val) {
			this.dialogVisible = true
			this.selectedRows = val
		},
		handleExportData() {},
		handleImportData() {},
		handleSelectionChange(val) {
      this.selectedList = val.map((item) => item.id)
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
