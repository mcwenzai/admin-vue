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
				<el-button type="primary">查询</el-button>
				<el-button>重置</el-button>
			</el-col>
		</el-row>
		<el-row style="padding: 20px 0;">
			<el-col :lg="12" :md="12" :sm="24" :xs="24">
				<el-button
					icon="el-icon-plus"
					type="primary"
					@click="handleAddTag('add')"
					>添加标签</el-button
				>
				<el-button @click="handleRemove(checkedList.join(','))">批量删除</el-button>
			</el-col>
		</el-row>
		<el-row>
			<sht-table
				:tableData="tableData"
				:tableColumn="tableColumn"
				@handleSelectionChange="handleSelectionChange"
			>
				<template slot="type" slot-scope="scope">
					<el-tag style="color: #fff" effect="light" :color="scope.scope.rgb">{{
						scope.scope.type | tagType
					}}</el-tag>
				</template>
				<template slot="operate" slot-scope="scope">
					<el-button type="text" @click="handleEditTag(scope.scope)"
						>编辑</el-button
					>
					<el-button type="text" @click="handleRemove(scope.scope.id)"
						>删除</el-button
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
		<tag-operate
			:key="key"
			:title="title"
			:id="id"
			:drawer="visible"
			@handleClose="handleClose"
		></tag-operate>
	</div>
</template>

<script>
import { tagList, delTag } from '@/api/supplyManage/labelManage'
import tagOperate from './components/tagOperate'
export default {
	components: { tagOperate },
	name: 'labelManage',
	data() {
		return {
			queryParams: {
				name: '',
				pageNum: 1,
				pageSize: 10,
			},
			total: 0,
			key: 1,
			id: '',
			title: '添加标签',
			visible: false,
      labelName: '',
      checkedList: [],
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
					slotName: 'type',
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
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handleEditTag(val) {
			this.title = '编辑标签'
			this.id = val.id
			this.visible = true
		},
		handleAddTag(val) {
			this.title = '添加标签'
			this.visible = true
		},
		handleRemove(val) {
			this.$confirm('此操作将删除该标签信息?', '提示', {
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
							setTimeout(() => {
								this.getList()
							}, 500)
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
		getList() {
			tagList(this.queryParams).then((res) => {
				this.tableData = res.rows
				this.total = res.total
			})
		},
		handleSelectionChange(val) {
			this.checkedList = val.map(item => item.id)
		},
		handleClose(val) {
			this.visible = val.drawer
			if (this.title === '添加标签') {
				this.key++
			}
			if (val.init) {
				this.handleInit()
				this.getList()
			}
		},
		handleInit() {
			this.queryParams.name = ''
			this.queryParams.pageNum = 1
			this.queryParams.pageSize = 10
		},
	},
	filters: {
		tagType(val) {
			return val === 1 ? 'S2B' : 'B2C'
		},
	},
}
</script>

<style></style>
