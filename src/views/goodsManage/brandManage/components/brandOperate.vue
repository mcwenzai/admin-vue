<template>
	<el-drawer
		:title="title"
		:visible.sync="drawer"
		direction="rtl"
		:before-close="handleClose"
	>
		<el-row style="padding: 0 20px;">
			<el-form :model="queryParams" label-width="103px">
				<el-form-item label="品牌名称:" prop="name">
					<el-input
						style="width: 250px;"
						placeholder="请输入品牌名称"
						v-model="queryParams.name"
					></el-input>
				</el-form-item>
				<el-form-item label="品牌LOGO:" prop="logoUrl">
					<el-upload
						class="avatar-uploader"
						action="#"
						:show-file-list="false"
						:http-request="requestUpload"
						:before-upload="beforeAvatarUpload"
					>
						<img
							v-if="queryParams.logoUrl"
							:src="queryParams.logoUrl"
							class="avatar"
						/>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-row>
					<el-col :offset="5">
						<el-button
							style="width: 180px;"
							type="primary"
							@click="handleSubmit"
							>提交</el-button
						>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
	</el-drawer>
</template>

<script>
import {
	getBrandInfo,
	addBrand,
	editBrand,
} from '@/api/goodsManage/brandManage'
import { upload } from '@/api/common'
export default {
	name: 'brandOperate',
	props: {
		title: {
			type: String,
			default: '添加品牌',
		},
		drawer: {
			type: Boolean,
			default: false,
		},
		id: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			queryParams: {
				name: '',
				logoUrl: '',
			},
			options: [
				{
					value: 1,
					label: 'S2B',
				},
				{
					value: 2,
					label: 'B2C',
				},
			],
		}
	},
	methods: {
		handleClose() {
			this.$emit('handleClose', {drawer: false, init: false})
		},
		getBrandInfo(id) {
			getBrandInfo(id).then((res) => {
				let data = res.data
				this.queryParams = {
					name: data.name,
					logoUrl: data.logoUrl,
				}
			})
		},
		handleSubmit() {
			this.title === '添加品牌' ? this.handleAddBrand() : this.handleEditBrand()
		},
		handleAvatarSuccess(response, file, fileList) {
			console.log(response, file, fileList)
		},
		beforeAvatarUpload(file, fileList) {
			let formData = new FormData()
			formData.append('file', file)
			upload(formData).then((res) => {
				if (res.url) {
					this.queryParams.logoUrl = res.url
				}
			})
		},
		requestUpload() {},
		handleAddBrand() {
			addBrand(this.queryParams).then((res) => {
				this.$message({
					showClose: true,
					message: res.msg,
					type: res.code === 200 ? 'success' : 'error',
				})
				setTimeout(() => {
          this.$emit('handleClose', {drawer: false, init: true})
				}, 500)
			})
		},
		handleEditBrand() {
			const params = {
				id: this.id,
				...this.queryParams,
			}
			editBrand(params).then((res) => {
				this.$message({
					showClose: true,
					message: res.msg,
					type: res.code === 200 ? 'success' : 'error',
				})
				setTimeout(() => {
					this.$emit('handleClose', {drawer: false, init: true})
				}, 500)
			})
		},
	},
	watch: {
		title(newVal) {
			if (newVal === '编辑品牌') {
				this.getBrandInfo(this.id)
			} else {
				for (let i of Object.keys(this.queryParams)) {
					this.queryParams[i] = ''
				}
			}
		},
		id(newVal) {
			this.getBrandInfo(this.id)
		},
	},
}
</script>

<style></style>
