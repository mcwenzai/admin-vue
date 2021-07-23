<template>
	<div class="app-container" v-loading="loading">
		<el-row>
			<el-col :lg="2" :md="3" :sm="6" :xs="6">
				<el-steps direction="vertical" :space="300">
					<el-step class="first" title="基本信息"></el-step>
					<el-step class="second" title="详细信息"></el-step>
					<el-step class="third" title="其他"></el-step>
				</el-steps>
			</el-col>
			<el-col
				style="padding: 40px 0px;margin-left: -65px;"
				:lg="21"
				:md="20"
				:sm="18"
				:xs="18"
			>
				<el-form :model="queryParams" :inline="true" label-width="125px">
					<el-col :span="20" :lg="20" :md="20" :sm="20" :xs="20">
						<el-form-item label="商户编号:">
							<el-input
								readonly
								style="width: 250px;"
								v-model="queryParams.id"
							></el-input>
						</el-form-item>
						<el-form-item label="经营者姓名:">
							<el-input
								readonly
								style="width: 250px;"
								v-model="queryParams.legalPerson"
							></el-input>
						</el-form-item>
						<el-form-item label="店铺名称:">
							<el-input
								readonly
								style="width: 250px;"
								v-model="queryParams.enterpriseName"
							></el-input>
						</el-form-item>
						<el-form-item label="手机号码:">
							<el-input
								readonly
								style="width: 250px;"
								v-model="queryParams.phone"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="所属行业:">
							<el-input
								readonly
								style="width: 250px;"
								v-model="queryParams.industry"
							></el-input>
						</el-form-item>
						<el-form-item label="账号状态:">
							<el-input readonly style="width: 250px;" v-model="ban"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="所在区域:">
							<el-input
								readonly
								style="width: 250px;"
								v-model="belongPlace"
							></el-input>
						</el-form-item>
						<el-form-item label="关联账号:">
							<el-input
								readonly
								style="width: 250px;"
								v-model="queryParams.nickname"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col style="margin-top: 50px;" :span="20">
						<el-form-item label="店铺LOGO:">
							<el-image
								style="width: 100px; height: 100px"
								fit="fill"
								:src="queryParams.logoUrl"
								:preview-src-list="[queryParams.logoUrl]"
							></el-image>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="经营地址:">
							<el-input
								readonly
								style="width: 500px;"
								v-model="queryParams.businessAddress"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="经营者身份证号:">
							<el-input
								readonly
								style="width: 500px;"
								v-model="queryParams.idCardNo"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="经营者身份证:">
							<el-image
								style="width: 100px; height: 100px;margin-right: 15px;"
								fit="fill"
								:src="queryParams.frontIdCardImage"
								:preview-src-list="[queryParams.frontIdCardImage]"
							></el-image>
							<el-image
								style="width: 100px; height: 100px;margin-right: 15px;"
								fit="fill"
								:src="queryParams.behindIdCardImage"
								:preview-src-list="[queryParams.behindIdCardImage]"
							></el-image>
							<el-image
								style="width: 100px; height: 100px;margin-right: 15px;"
								fit="fill"
								:src="queryParams.handIdCardImage"
								:preview-src-list="[queryParams.handIdCardImage]"
							></el-image>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="经营者银行卡:">
							<el-input
								readonly
								style="width: 500px;"
								v-model="queryParams.bankNum"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="营业执照注册号:">
							<el-input
								readonly
								style="width: 500px;"
								v-model="queryParams.registerNo"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="营业执照:">
							<el-image
								style="width: 100px; height: 100px"
								fit="fill"
								:src="queryParams.businessLicenseImage"
								:preview-src-list="[queryParams.businessLicenseImage]"
							></el-image>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="主营品类:">
							<el-input
								readonly
								style="width: 300px;"
								v-model="queryParams.mainCategory"
							></el-input>
							<br />
							<el-image
								style="width: 100px; height: 100px;margin-right: 15px;"
								v-for="(item, index) in queryParams.categoryLicense"
								:key="index"
								fit="fill"
								:src="item"
								:preview-src-list="[item]"
							></el-image>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="平台合作协议:">
							<el-image
								style="width: 100px; height: 100px;margin-right: 15px;"
								v-for="(item, index) in queryParams.platformAgreementFile"
								fit="fill"
								:key="index"
								:src="item"
								:preview-src-list="[item]"
							></el-image>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="品牌授权书:">
							<el-image
								style="width: 100px; height: 100px"
								v-for="(item, index) in queryParams.brandAuthorizationImage"
								fit="fill"
								:key="index"
								:src="item"
								:preview-src-list="[item]"
							></el-image>
						</el-form-item>
					</el-col>
					<el-col style="margin-top: 20px;" :span="20">
						<el-form-item label="店铺介绍:">
							<div>{{ queryParams.introduce }}</div>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="视频/图片:">
							<el-image
								style="width: 100px; height: 100px;margin-right: 15px;"
								v-for="(item, index) in queryParams.introduceFile"
								fit="fill"
								:key="index"
								:src="item"
								:preview-src-list="[item]"
							></el-image>
						</el-form-item>
					</el-col>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :offset="1">
				<el-button
					type="primary"
					@click="handlePass"
					v-if="flag && queryParams.status === 1"
					>通过</el-button
				>
				<el-button
					type="warning"
					@click="dialogVisible = true"
					v-if="flag && queryParams.status === 1"
					>驳回</el-button
				>
				<el-button type="info" plain @click="handleCancel">取消</el-button>
			</el-col>
		</el-row>
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
	getAuditDetailInfo,
	auditStoreInfo,
} from '@/api/supplyManage/merchantEntryAudit'
import { filterPlace, filterBan, filterState } from '@/utils/util'
export default {
	name: 'auditDetail',
	data() {
		return {
			queryParams: {},
			dialogVisible: false,
			rejectInfo: '',
			flag: true,
			loading: false,
			staticImg: require('@/assets/images/noImg.jpg'),
		}
	},
	created() {
		this.flag = this.$route.name.includes('VendorList') ? false : true
		const { id } = this.$route.query
		console.log(this.$route);
		this.getDetailById(id)
	},
	methods: {
		getDetailById(id) {
			this.loading = true
			getAuditDetailInfo(id).then((res) => {
				this.queryParams = res.data
				this.handleInitImg()
				this.loading = false
			})
		},
		handleInitImg() {
			this.queryParams.categoryLicense =
				this.queryParams.categoryLicense === null
					? [this.staticImg]
					: this.queryParams.categoryLicense.split(',')
			this.queryParams.brandAuthorizationImage =
				this.queryParams.brandAuthorizationImage === null
					? [this.staticImg]
					: this.queryParams.brandAuthorizationImage.split(',')
			this.queryParams.platformAgreementFile =
				this.queryParams.platformAgreementFile === null
					? [this.staticImg]
					: this.queryParams.platformAgreementFile
			this.queryParams.introduceFile =
				this.queryParams.introduceFile === null
					? [this.staticImg]
					: this.queryParams.introduceFile.split(',')
		},
		handlePass() {
			this.$confirm('此操作将通过该商户入驻, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					const params = {
						status: 2,
						storeId: this.queryParams.id,
					}
					auditStoreInfo(params).then((res) => {
						if (res.code === 200) {
							this.$message({
								type: res.code === 200 ? 'success' : 'error',
								message: res.msg,
							})
							this.$router.go(-1)
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
		handleReject() {
			this.$confirm('此操作将驳回该商户入驻, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					const params = {
						reason: this.rejectInfo,
						status: 3,
						storeId: this.queryParams.id,
					}
					auditStoreInfo(params).then((res) => {
						if (res.code === 200) {
							this.$message({
								type: res.code === 200 ? 'success' : 'error',
								message: res.msg,
							})
							this.$router.go(-1)
						}
						
					})
					.finally( () => {
						this.dialogVisible = false
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消驳回',
					})
				})
		},
		handleCancel() {
			this.$router.go(-1)
		},
	},
	computed: {
		belongPlace() {
			return filterPlace(
				this.queryParams.companyProvince,
				this.queryParams.companyCity,
				this.queryParams.companyArea,
				this.queryParams.companyAddress
			)
		},
		ban() {
			if (this.queryParams.status === '2') {
				return filterBan, filterState(this.queryParams.ban)
			} else {
				return filterState(this.queryParams.status)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
::v-deep {
	.second {
		.el-step__line {
			min-height: 1300px;
		}
	}
	.third {
		margin-top: 760px;
		.el-step__line {
			min-height: 700px;
		}
	}
}
</style>
