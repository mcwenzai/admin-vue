<template>
	<el-drawer
		:title="title"
		:visible.sync="drawer"
		direction="rtl"
		:before-close="handleClose"
	>
		<el-row style="padding: 0 20px;">
			<el-form label-width="115px" v-model="paramsForm">
				<template v-if="title === '添加子类'">
					<el-form-item label="上级分类" prop="higherClass">
						<el-input
							style="width: 250px"
							v-model="categoryInfo.name"
							disabled
						></el-input>
					</el-form-item>
					<el-form-item label="商品子类名称" prop="childrenName">
						<el-input
							style="width: 250px"
							v-model="paramsForm.name"
							placeholder="请输入品类名称"
						></el-input>
					</el-form-item>
				</template>
				<el-form-item v-if="title !== '添加子类'" label="品类名称:" prop="name">
					<el-input
						style="width: 250px"
						v-model="paramsForm.name"
						placeholder="请输入品类名称"
					></el-input>
				</el-form-item>
				<el-form-item label="排序值:" prop="sort">
					<el-input
						style="width: 250px"
						placeholder="100"
						v-model="paramsForm.sort"
					></el-input>
				</el-form-item>
				<el-form-item
					:label="title === '添加子类' ? '商品子类图片:' : '品类图片:'"
					prop="groupImg"
				>
					<el-upload
						class="avatar-uploader"
						action="#"
						:show-file-list="false"
						:http-request="requestUpload"
						:before-upload="beforeUploadImageUrl"
					>
						<img
							v-if="paramsForm.imgUrl"
							:src="paramsForm.imgUrl"
							class="avatar"
						/>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<template v-if="title !== '添加子类'">
					<el-form-item label="上传品类许可证">
						<el-upload
							class="avatar-uploader"
							action="#"
							:show-file-list="false"
							:http-request="requestUpload"
							:before-upload="beforeUploadCategoryLicence"
						>
							<img
								v-if="paramsForm.bannerUrl"
								:src="paramsForm.bannerUrl"
								class="avatar"
							/>
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</template>
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
import { addCategory, editCategory } from '@/api/goodsManage/S2BcategoryManage'
import { upload } from '@/api/common'
export default {
	name: 'groupOperate',
	props: {
		title: {
			type: String,
			default: '添加品类',
		},
		drawer: {
			type: Boolean,
			default: false,
		},
		categoryInfo: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	data() {
		return {
			paramsForm: {
				name: '',
				sort: '',
				imgUrl: '',
				bannerUrl: '',
			},
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handleClose() {
			this.$emit('handleClose', { drawer: false, init: true })
		},
		beforeUploadImageUrl(file, fileList) {
			let formData = new FormData()
			formData.append('file', file)
			upload(formData).then((res) => {
				if (res.url) {
					this.paramsForm.imgUrl = res.url
				}
			})
		},
		beforeUploadCategoryLicence(file, fileList) {
			let formData = new FormData()
			formData.append('file', file)
			upload(formData).then((res) => {
				if (res.url) {
					this.paramsForm.bannerUrl = res.url
				}
			})
		},
		getList() {
			this.paramsForm = {
				name: this.categoryInfo.name,
				sort: this.categoryInfo.sort,
				imgUrl: this.categoryInfo.imgUrl,
				bannerUrl: this.categoryInfo.bannerUrl,
			}
		},
		handleSubmit() {
			this.title === '添加品类' || this.title === '添加子类'
				? this.handleAddCategory()
				: this.handleEditCateGory()
		},
		handleAddCategory() {
			const params = {
				parentId: this.categoryInfo.id ? this.categoryInfo.id : 0,
				...this.paramsForm,
			}
			if (this.categoryInfo.id) {
				delete params.bannerUrl
			}
			addCategory(params).then((res) => {
				this.$message({
					showClose: true,
					message: res.msg,
					type: res.code === 200 ? 'success' : 'error',
				})
				setTimeout(() => {
					this.$emit('handleClose', { drawer: false, init: true })
				}, 500)
			})
		},
		handleEditCateGory() {
			const params = {
				id: this.categoryInfo.id,
				...this.paramsForm,
			}
			editCategory(params).then((res) => {
				this.$message({
					showClose: true,
					message: res.msg,
					type: res.code === 200 ? 'success' : 'error',
				})
				setTimeout(() => {
					this.$emit('handleClose', { drawer: false, init: true })
				}, 500)
			})
		},
		requestUpload() {},
	},
	watch: {
		categoryInfo(newVal) {
			this.getList()
		},
	},
}
</script>

<style></style>
