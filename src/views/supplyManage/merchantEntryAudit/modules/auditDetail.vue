<template>
	<div class="app-container" v-loading="loading">
		<el-row>
			<el-col :lg="2" :md="3" :sm="6" :xs="6">
				<el-steps direction="vertical" :space="300">
					<el-step class="first" title="基本信息"></el-step>
					<el-step class="second" title="详细信息"></el-step>
					<el-step class="third" title="基本账户信息"></el-step>
					<el-step class="fourth" title="其他"></el-step>
				</el-steps>
			</el-col>
			<el-col
				style="padding: 40px 0px;margin-left: -65px;"
				:lg="21"
				:md="20"
				:sm="18"
				:xs="18"
			>
				<el-form :model="queryParams" :inline="true">
					<el-col :span="20" :lg="20" :md="20" :sm="20" :xs="20">
						<el-form-item class="base-info-row" label="厂商编号:">
							{{queryParams.id}}
						</el-form-item>
						<el-form-item class="base-info-row" label="手机号码:">
							{{queryParams.phone}}
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item class="base-info-row" label="企业名称:">
							{{queryParams.enterpriseName}}
						</el-form-item>
						<el-form-item class="base-info-row" label="法人代表邮箱:">
							{{queryParams.email}}
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item class="base-info-row" label="所属行业:">
							{{queryParams.industry}}
						</el-form-item>
						<el-form-item class="base-info-row" label="关联账号:">
							{{queryParams.nickname}}
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item class="base-info-row" label="所属地区:">
							{{belongPlace}}
						</el-form-item>
						<el-form-item class="base-info-row" label="账号状态:">
							{{ban}}
						</el-form-item>
					</el-col>
					<el-col style="margin-top: 50px;" :span="20">
						<el-form-item label="公司LOGO:">
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
							{{queryParams.businessAddress}}
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="法人身份证号:">
							{{queryParams.idCardNo}}
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="法人身份证:">
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
						<el-form-item label="营业执照注册号:">
							{{queryParams.registerNo}}
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
							{{queryParams.mainCategory}}
							<br />
							<el-image
								style="width: 100px; height: 100px;margin-right: 15px;"
								v-for="(item, index) in queryParams.categoryLicense"
								:key="index"
								fit="fill"
								:src="item"
								:preview-src-list="[queryParams.categoryLicense]"
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
								:preview-src-list="[queryParams.brandAuthorizationImage]"
							></el-image>
						</el-form-item>
					</el-col>
					<el-col style="margin-top: 120px;" :span="20">
						<el-form-item label="账户名:">
							<div>{{ queryParams.holdName }}</div>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="账号:">
							<div>{{ queryParams.bankNum }}</div>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="开户银行:">
							<div>{{ queryParams.bankName }}</div>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="法定代表人(单位负责人):">
							<div>{{ queryParams.legalPerson }}</div>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="基本存款账户编号:">
							<div>{{ queryParams.baseAccountNo }}</div>
						</el-form-item>
					</el-col>
					<el-col style="margin-top: 20px;" :span="20">
						<el-form-item label="厂商介绍:">
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
								:preview-src-list="[queryParams.introduceFile]"
							></el-image>
						</el-form-item>
					</el-col>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :offset="1">
				<el-button type="primary" @click="handleReport">查看诚信报告</el-button>
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
import { auditDetailMixin } from '../../merchantList/mixins/auditDetail'
import { filterPlace, filterBan, filterState } from '@/utils/util'
export default {
	name: 'auditDetail',
	mixins: [auditDetailMixin],
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
		this.flag = this.$route.name.includes('MerchantList') ? false : true
		const { id } = this.$route.query
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
			this.queryParams.introduceFile =
				this.queryParams.introduceFile === null
					? [this.staticImg]
					: this.queryParams.introduceFile.split(',')
		},
		handleReport() {},
		handlePass() {
			this.$confirm('此操作将通过该厂商入驻, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					const params = {
						status: '2',
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
			this.$confirm('此操作将驳回该厂商入驻, 是否继续?', '提示', {
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
				return filterBan
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
			min-height: 1040px;
		}
	}
	.third {
		margin-top: 710px;
		.el-step__line {
			min-height: 550px;
		}
	}
	.fourth {
		margin-top: 30px;
	}
	.base-info-row {
		width: 300px;
		text-align: left;
	}
	.el-form-item__label {
		text-align: left;
	}
}
</style>
