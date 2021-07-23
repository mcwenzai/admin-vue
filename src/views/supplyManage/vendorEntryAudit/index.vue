<template>
	<div class="app-container">
		<el-row>
			<el-form :model="queryParams" :inline="true">
				<el-col :lg="8" :md="12" :xs="24" :sm="24">
					<el-form-item label="商户名称:">
						<el-input
							style="width: 250px;"
							placeholder="请输入厂商名称"
							v-model="queryParams.vendorName"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :lg="8" :md="12" :xs="24" :sm="24">
					<el-form-item label="法人代表:">
						<el-input
							style="width: 250px;"
							placeholder="请输入厂商名称"
							v-model="queryParams.legalPerson"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :lg="8" :md="12" :xs="24" :sm="24">
					<el-form-item label="申请时间:">
						<el-date-picker
							v-model="timeRange"
							type="datetimerange"
							align="right"
							value-format="yyyy-MM-dd HH:mm:ss"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:default-time="['00:00:00', '23:59:59']"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :lg="8" :md="12" :xs="24" :sm="24">
					<el-form-item label="审批状态:">
						<el-select v-model="queryParams.status">
							<el-option
								v-for="item in stateOptions"
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
				<el-col :lg="8" :md="12" :xs="24" :sm="24">
					<el-button type="primary" @click="getList">查询</el-button>
					<el-button @click="handleInit">重置</el-button>
				</el-col>
			</el-form>
		</el-row>
		<el-row>
			<sht-table
				:tableData="tableData"
				:tableColumn="tableColumn"
				:loading="loading"
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
					<div v-if="scope.scope.status === '待审核'">
						<el-button type="text" @click="handlePass(scope.scope)"
							>通过</el-button
						>
						<el-button type="text" @click="handleNoPass(scope.scope)"
							>不通过</el-button
						>
					</div>
					<el-button type="text" v-else @click="handleToDetail(scope.scope)"
						>查看</el-button
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
import { list } from '@/api/supplyManage/merchantEntryAudit'
import { filterState, filterPlace, parseTime } from '@/utils/util'
import PlaceCascader from '@/components/PlaceCascader'
export default {
	name: 'vendorEntryAudit',
	components: {
		PlaceCascader,
	},
	data() {
		return {
			queryParams: {
				vendorName: '',
				legalRepresentative: '',
				applyDateStart: '',
				applyDateEnd: '',
				status: '',
				place: '',
				type: 2,
				pageNum: 1,
				pageSize: 10,
			},
			stateOptions: [
				{
					value: '',
					label: '全部',
				},
				{
					value: '1',
					label: '待审核',
				},
				{
					value: '2',
					label: '审核通过',
				},
				{
					value: '3',
					label: '审核不通过',
				},
			],
			tableColumn: [
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
					name: '法人代表',
					key: 'legalRepresentative',
				},
				{
					name: '关联业务员',
					key: 'agentUserName',
				},
				{
					name: '申请时间',
					key: 'createTime',
				},
				{
					name: '商户来源',
					key: 'source',
				},
				{
					name: '所在地区',
					key: 'place',
				},
				{
					name: '状态',
					key: 'status',
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
			timeRange: [],
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handlePass(value) {
			this.$router.push({
				path: '/supplyManage/vendorEntryAudit/audit',
				query: {
					id: value.id,
				},
			})
		},
		handleNoPass(value) {
			this.$router.push({
				path: '/supplyManage/vendorEntryAudit/audit',
				query: {
					id: value.id,
				},
			})
		},
		getList() {
			this.loading = true
			this.queryParams.applyDateStart = this.timeRange[0]
			this.queryParams.applyDateEnd = this.timeRange[1]
			list(this.queryParams).then((res) => {
				this.loading = false
				let data = res.rows
				this.tableData = data.map((item) => {
					item.place = filterPlace(
						item.companyProvince,
						item.companyCity,
						item.companyArea,
						item.companyAddress
					)
					item.status = filterState(item.status)
					item.sourceType = item.sourceType === 0 ? '平台添加' : '自助申请'
					return item
				})
				this.total = res.total
			})
		},
		getPlaceInfo(val) {
			this.queryParams.place = val.place
		},
		handleToDetail(value) {
			this.$router.push({
				path: '/supplyManage/vendorEntryAudit/audit',
				query: {
					id: value.id,
				},
			})
		},
		handleInit() {
			this.queryParams = {
				vendorName: '',
				legalRepresentative: '',
				applyDateStart: '',
				applyDateEnd: '',
				status: '',
				place: '',
				type: 2,
				pageNum: 1,
				pageSize: 10,
			}
			this.timeRange = []
		},
	},
}
</script>

<style></style>
