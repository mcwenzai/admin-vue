<template>
	<div class="app-container">
		<el-row>
			<el-col :lg="6" :md="12" :sm="24" :xs="24">
				<el-button type="primary" @click="handleAddGroup">添加品类</el-button>
				<el-button>导入</el-button>
				<el-button>导出</el-button>
			</el-col>
		</el-row>
		<el-row style="padding-top: 25px;">
			<el-col>
				<el-table
					row-key="id"
					:data="tableData"
					lazy
					v-loading="loading"
					:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				>
					<el-table-column
						prop="name"
						label="分类名称"
						align="center"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column label="品类许可证" align="center">
						<template slot-scope="scope">
							<el-image
								style="width: 100px; height: 100px"
								fit="fill"
								:src="scope.row.imgUrl"
								:preview-src-list="[scope.row.imgUrl]"
							></el-image>
						</template>
					</el-table-column>
					<el-table-column prop="operate" label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="handleAddChildren(scope.row)"
								>新建子分类</el-button
							>
							<el-button type="text" @click="handleEditGroup(scope.row)"
								>编辑</el-button
							>
							<el-button type="text" @click="handleRemoveGroup(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<group-operate
			@handleClose="handleClose"
			:categoryInfo="categoryInfo"
			:drawer="visable"
      :key="key"
			:title="title"
		></group-operate>
	</div>
</template>

<script>
import { categoryList, delCategory } from '@/api/goodsManage/S2BcategoryManage'
import groupOperate from './components/groupOperate'
export default {
	name: 'S2BcategoryManage',
	components: {
		groupOperate,
	},
	data() {
		return {
			title: '添加品类',
			visable: false,
			loading: false,
      key: 0,
			categoryInfo: {},
			queryParams: {
			},
			tableData: [],
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handleAddChildren(val) {
			this.title = '添加子类'
			this.visable = true
			this.categoryInfo = val
		},
		handleEditGroup(val) {
			this.title = '编辑品类'
			this.visable = true
			this.categoryInfo = val
		},
		handleRemoveGroup(val) {
      this.$confirm('此操作将删除该品牌信息?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',  
			})
				.then(() => {
					delCategory(val.id).then(res => {
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
		handleAddGroup() {
			this.title = '添加品类'
			this.visable = true
		},
		handleClose(val) {
      this.visable = val.drawer
      if (this.title === '添加品类' || this.title === '添加子类') {
        this.key++
      }
			if (val.init) {
				this.getList()
			}
		},
		getList() {
			this.loading = true
			categoryList().then((res) => {
				this.tableData = this.handleData(res.rows)
				this.loading = false
			})
		},
		handleData(data = []) {
			let result = []
			let parent = {}
			for (let index in data) {
				if (!parent[data[index].parentId]) {
					parent[data[index].parentId] = [data[index]]
				} else {
					parent[data[index].parentId].push(data[index])
				}
			}
			Object.keys(parent).forEach((item) => {
				for (let index in parent[item]) {
					if (Object.keys(parent).indexOf(parent[item][index].id)) {
						parent[item][index].children = parent[parent[item][index].id]
					}
				}
			})
			result = parent[0]
			return result
		},
	},
}
</script>

<style></style>
