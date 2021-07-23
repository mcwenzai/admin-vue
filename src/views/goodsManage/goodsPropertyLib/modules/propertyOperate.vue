<template>
	<div class="app-container">
		<el-row>
			<el-col :lg="18" :md="12" :sm="24" :xs="24">
				<span>属性名称:</span>
				<el-input
					style="width: 250px;margin-right: 15px;"
					placeholder="请输入货品规格"
					v-model="queryParams.name"
				></el-input>
			</el-col>
			<el-col :lg="6" :md="12" :sm="24" :xs="24">
				<el-button type="primary" @click="drawer = true">添加属性值</el-button>
			</el-col>
		</el-row>
		<el-row style="padding: 20px 0;">
			<sht-table
				v-loading="loading"
				:tableData="tableData"
				:tableColumn="tableColumn"
			>
				<template slot="operate" slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.scope)"
						>编辑</el-button
					>
					<el-button type="text" @click="handleRemove(scope.scope)">删除</el-button>
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
		<el-drawer :title="title" :visible.sync="drawer" direction="rtl">
			<el-form style="padding: 20px;" label-width="90px">
				<el-form-item label="属性值名称:">
					<el-input
						style="width: 200px;"
						placeholder="请输入属性值"
						v-model="formData.data"
					></el-input>
				</el-form-item>
				<el-form-item label="排序:">
					<el-input
						style="width: 200px;"
						placeholder="100"
						v-model="formData.sort"
					></el-input>
				</el-form-item>
				<el-col :offset="4">
					<el-button type="primary" @click="handleSubmit">提交</el-button>
				</el-col>
			</el-form>
		</el-drawer>
	</div>
</template>

<script>
import {
	valueList,
	addValue,
  valueInfo,
  editValue,
  delValue
} from '@/api/goodsManage/goodsPropertyLib'
export default {
	name: 'labelManage',
	data() {
		return {
			queryParams: {
				name: '',
				pageNum: 1,
				pageSize: 10,
			},
			formData: {
				data: '',
				sort: 100,
			},
			valueInfo: {},
			total: 0,
			drawer: false,
			loading: false,
			title: '添加属性值',
			tableColumn: [
				{
					name: '属性值',
					key: 'data',
				},
				{
					name: '排序',
					key: 'sort',
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
		this.valueInfo = this.$route.query.val
		this.queryParams.name = this.valueInfo.name
		this.getList()
	},
	methods: {
		handleEdit(val) {
      this.title = "编辑属性值"
			this.drawer = true
			valueInfo(val.id).then((res) => {
				this.formData.data = res.data.data
				this.formData.sort = res.data.sort
			})
		},
		handleRemove(val) {
      this.$confirm('此操作将删除该属性值信息?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					delValue(val.id).then((res) => {
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
		handleSave(val) {},
		handleRemoveMore() {},
		handleSubmit() {
			const params = {
				attributeId: this.valueInfo.id,
				...this.formData,
			}
			if (this.title === '添加属性值') {
				addValue(params).then((res) => {
					this.$message({
						showClose: true,
						message: res.msg,
						type: res.code === 200 ? 'success' : 'error',
					})
					if (res.code === 200) {
            setTimeout(() => {
              this.drawer = false
              this.getList()
            }, 500);
					}
				})
			} else {
				editValue(params).then((res) => {
					this.$message({
						showClose: true,
						message: res.msg,
						type: res.code === 200 ? 'success' : 'error',
					})
					if (res.code === 200) {
            setTimeout(() => {
              this.drawer = false
              this.getList()
            }, 500);
					}
				})
			}
		},
		getList() {
			this.loading = true
			const params = {
				attributeId: this.valueInfo.id,
			}
			valueList(params).then((res) => {
				this.tableData = res.rows
				this.total = res.total
				this.loading = false
			})
		},
	},
	watch: {
		drawer(newVal) {
			if (newVal === true) {
        this.formData.data = '',
        this.formData.sort = 100
			}
		},
	},
}
</script>

<style></style>
