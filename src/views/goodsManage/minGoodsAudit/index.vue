<template>
	<div
		class="app-container"
		v-loading="true"
		element-loading-text="正在开发中......"
	>
		<el-row :gutter="20" style="padding: 20px 0;">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="商品名称:" prop="goodsName">
						<el-input
							style="width: 200px;"
							placeholder="请输入货品名称"
							v-model="queryParams.goodsName"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="供应商编号:" prop="telNumber">
						<el-input
							style="width: 200px;"
							placeholder="请输入联系电话"
							v-model="queryParams.telNumber"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="8" :md="10" :sm="24" :xs="24">
					<el-form-item label="申请时间:" prop="times">
						<el-date-picker
							v-model="queryParams.times"
							type="date"
							placeholder="选择日期"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="店铺名称:" prop="firm">
						<el-input
							style="width: 200px;"
							placeholder="请输入厂商名称"
							v-model="queryParams.firm"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="8" :md="8" :sm="24" :xs="24">
					<el-form-item label="审批状态:" prop="state">
						<el-select v-model="queryParams.state">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8" :lg="6" :md="6" :sm="24" :xs="24">
					<el-button type="primary" @click="handelSearch">查询</el-button>
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
			<sht-table :tableData="tableData" :tableColumn="tableColumn">
				<template slot="goodsImg" slot-scope="scope">
					<el-image
						style="width: 100px; height: 100px"
						fit="fill"
						:src="scope.scope.goodsImg"
						:preview-src-list="[scope.scope.goodsImg]"
					></el-image>
				</template>
				<template slot="goodsNumber" slot-scope="scope">
					<el-button type="text" size="small" @click="getGoodsDetail(scope)">{{
						scope.scope.goodsNumber
					}}</el-button>
				</template>
				<template slot="operate" slot-scope="scope">
					<el-button type="text" size="small" @click="handlePass(scope)"
						>通过</el-button
					>
					<el-button type="text" size="small" @click="handleNoPass(scope)"
						>不通过</el-button
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
export default {
	name: 'minGoodsAudit',
	data() {
		return {
			options: [
				{
					value: 1,
					label: '全部',
				},
				{
					value: 2,
					label: '待审核',
				},
				{
					value: 3,
					label: '审核不通过',
				},
			],
			total: 10,
			queryParams: {
				goodsName: '',
				telNumber: '',
				goodsNumber: '',
				firm: '',
				state: '',
				times: '',
				pageNum: 1,
				pageSize: 10,
			},
			tableData: [
				{
					goodsNumber: '123',
					goodsImg:
						'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
					goodsName: '123',
					publishTime: '123',
					goodsGroup: '123',
					goodsBrand: '123',
					belongFirm: '123',
					state: '123',
				},
			],
			tableColumn: [
				{
					type: 'selection',
					width: 55,
				},
				{
					name: '商品编号',
					key: 'goodsNumber',
					slotName: 'goodsNumber',
					width: 180,
				},
				{
					name: '商品封面',
					key: 'goodsImg',
					slotName: 'goodsImg',
					width: 180,
				},
				{
					name: '商品名称',
					key: 'goodsName',
					width: 180,
				},
				{
					name: '发布时间',
					key: 'publishTime',
					width: 180,
				},
				{
					name: '商品品牌',
					key: 'goodsGroup',
					width: 180,
				},
				{
					name: '商品价格(元)',
					key: 'goodsBrand',
					width: 180,
				},
				{
					name: '所属店铺',
					key: 'belongFirm',
					width: 180,
				},
				{
					name: '状态',
					key: 'state',
					width: 180,
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
	methods: {
		handelSearch() {},
		handleInit() {},
		getList() {},
		getGoodsDetail(value) {
			const { goodsNumber } = value.scope
			this.$router.push({
				path: '/goodsManage/minGoodsAudit/detail',
				query: {
					goodsNumber,
				},
			})
		},
		handlePassMore() {},
		handleExportData() {},
		handleImportData() {},
		handlePass(val) {
			console.log(val)
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
