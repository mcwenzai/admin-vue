<template>
	<div class="app-container">
		<el-row>
			<el-form :model="queryParams" :inline="true">
				<el-col :lg="8" :md="12" :xs="24" :sm="24">
					<el-form-item label="商户名称:">
						<el-input
							style="width: 250px;"
							placeholder="请输入商户名称"
							v-model="queryParams.storeName"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :lg="8" :md="12" :xs="24" :sm="24">
					<el-form-item label="审批状态:">
						<el-select v-model="queryParams.ban">
							<el-option
								v-for="item in banOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :lg="8" :md="12" :xs="24" :sm="24">
					<el-form-item label="所在地区:">
						<place-cascader
							:place="queryParams.place"
							@getPlaceInfo="getPlaceInfo"
						></place-cascader>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		<el-row type="flex" justify="end">
			<el-col :lg="8" :md="12" :xs="24" :sm="24">
				<el-button type="primary" @click="getList">查询</el-button>
				<el-button @click="handleInit">重置</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :lg="12" :md="12" :xs="12" :sm="12">
				<el-button>群发短信</el-button>
				<el-button>群发站内信</el-button>
				<el-button>APP推送</el-button>
				<el-button>设置标签</el-button>
				<el-button>赠送优惠券</el-button>
				<el-button>导出数据</el-button>
			</el-col>
		</el-row>
		<el-row style="padding: 20px 0">
			<sht-table
				:tableData="tableData"
				:tableColumn="tableColumn"
				v-loading="loading"
				@handleSelectionChange="handleSelectionChange"
			>
				<template slot="storeName" slot-scope="scope">
					<el-button type="text" @click="handleToDetail(scope.scope)">{{
						scope.scope.storeName
					}}</el-button>
				</template>
				<template slot="logoUrl" slot-scope="scope">
					<el-image
						style="width: 100px; height: 100px"
						fit="fill"
						:src="scope.scope.logoUrl"
						:preview-src-list="[scope.scope.logoUrl]"
					></el-image>
				</template>
				<template slot="operate" slot-scope="scope">
					<el-button
						type="text"
						@click="handleToDetail(scope.scope)"
						v-if="scope.scope.ban === '正常'"
						>查看</el-button
					>
					<el-button
						type="text"
						@click="handleFreezeOperate(scope.scope, true)"
						v-if="scope.scope.ban === '正常'"
						>冻结</el-button
					>
					<el-button
						type="text"
						@click="handleFreezeOperate(scope.scope, false)"
						v-if="scope.scope.ban === '冻结'"
						>解冻</el-button
					>
					<el-button
						type="text"
						@click="handleNoPass(scope.scope)"
						v-if="scope.scope.ban === '断续'"
						>续约</el-button
					>
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
	</div>
</template>

<script>
import { list, freezeOperate } from '@/api/supplyManage/merchantEntryAudit'
import { filterBan, filterPlace } from '@/utils/util'
import PlaceCascader from '@/components/PlaceCascader'
export default {
	name: 'merchantEntryAudit',
	components: {
		PlaceCascader,
	},
	data() {
		return {
			queryParams: {
				storeName: '',
				status: 2,
				ban: '',
				place: '',
				type: 2,
				pageNum: 1,
				pageSize: 10,
			},
			banOptions: [
				{
					value: '',
					label: '全部',
				},
				{
					value: 0,
					label: '正常',
				},
				{
					value: 1,
					label: '冻结',
				},
				// {
				//   value: 2,
				//   label: '已断约'
				// }
			],
			tableColumn: [
				{
					type: 'selection',
					width: '55',
				},
				{
					name: '商户名称',
					key: 'storeName',
					slotName: 'storeName',
				},
				{
					name: '店铺logo',
					key: 'logoUrl',
					slotName: 'logoUrl',
				},
				{
					name: '关联业务员',
					key: 'agentUserName',
				},
				{
					name: '商户来源',
					key: 'sourceType',
				},
				{
					name: '详细地址',
					key: 'place',
				},
				{
					name: '入驻状态',
					key: 'ban',
				},
				{
					name: '操作',
					key: 'operate',
					slotName: 'operate',
				},
			],
			tableData: [],
			total: 0,
			loading: false,
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handleNoPass(val) {},
		getList(value) {
			this.loading = true
			list(this.queryParams).then((res) => {
				let data = res.rows
				this.tableData = data.map((item, index) => {
					item.place = filterPlace(
						item.companyProvince,
						item.companyCity,
						item.companyArea,
						item.companyAddress
					)
					item.ban = filterBan(item.ban)
					item.sourceType = item.sourceType === 0 ? '平台添加' : '自助申请'
					return item
				})
				this.total = res.total
				this.loading = false
			})
		},
		handleToDetail(value) {
			this.$router.push({
				path: '/supplyManage/vendorList/detail',
				query: {
					id: value.id,
				},
			})
		},
		handleFreezeOperate(value, type) {
			let title = type ? '冻结' : '解冻'
			this.$confirm(`此操作将${title}该商户, 是否继续?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					const params = {
						id: value.id,
						ban: type ? 1 : 0,
					}
					freezeOperate(params).then((res) => {
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
						message: `取消${title}`,
					})
				})
		},
		handleSelectionChange(val) {},
		getPlaceInfo(val) {
			this.queryParams.place = val.place
		},
		handleInit() {
			this.queryParams = {
				companyName: '',
				state: 2,
				ban: '',
				place: '',
				type: 2,
				pageNum: 1,
				pageSize: 10,
			}
		},
	},
}
</script>

<style></style>
