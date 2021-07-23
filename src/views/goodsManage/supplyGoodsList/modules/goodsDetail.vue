<template>
	<div class="app-container">
		<div class="goods-detail-top">
			<div class="detail-title-row">
				<el-row>
					<h3 class="detail-title">
						货品名称:
						<h3>{{ infoList.name }}</h3>
					</h3>
					<div class="detail-btn-group">
						<el-button type="primary" @click="getCheckHistory"
							>审核历史</el-button
						>
						<el-button type="primary" v-if="infoList.status === 2" @click="handleOperate(false)">下架</el-button>
						<el-button type="primary" v-if="infoList.status === 9" @click="handleOperate(true)">上架</el-button>
					</div>
				</el-row>
			</div>
			<div class="detail-introduce-row">
				<el-row>
					<el-col :span="24">
						<span class="detail-intro-item">
							货品编号:
							<span>{{ infoList.goodsCode }}</span>
						</span>
						<span class="detail-intro-item">
							发布时间:
							<span>{{ infoList.createTime }}</span>
						</span>
					</el-col>
					<el-col :span="24">
						<span class="detail-intro-item">
							所属厂商:
							<span>{{ infoList.belongsManufacturer || '/' }}</span>
						</span>
						<span class="detail-intro-item">
							货品价格(元):
							<span>{{ infoList.price || '/' }}</span>
						</span>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="goods-detail-body">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="基本信息" name="baseInfo">
					<base-info :infoList="infoList" :key="infoKey"></base-info>
				</el-tab-pane>
				<el-tab-pane label="产品参数" name="property">
					<property :infoList="infoList" :key="proKey" @getPriceGroup="getPriceGroup"></property>
				</el-tab-pane>
				<el-tab-pane label="货品溯源" name="goodsTrace">
					<goods-trace :key="traceKey"></goods-trace>
				</el-tab-pane>
			</el-tabs>
		</div>
		<aduit-history
			:drawer="visible"
			:goodsId="infoList.id"
			:key="drawerKey"
			@handleClose="handleClose"
		></aduit-history>
	</div>
</template>

<script>
import baseInfo from '../components/baseInfo'
import property from '../components/property'
import goodsTrace from '../components/goodsTrace'
import aduitHistory from '../components/aduitHistory'
import {
	manufactureGoodsById,
	manufactureGoodsAudit,
} from '@/api/goodsManage/supplyAuditGoods'
export default {
	name: 'goodsDetail',
	components: {
		baseInfo,
		property,
		aduitHistory,
		goodsTrace,
	},
	data() {
		return {
			activeName: 'baseInfo',
			visible: false,
			infoList: {
				advanceSaleTime: '',
				belongsManufacturer: '',
				advanceSaleTime: '',
				brandName: '',
				categoryName: '',
				contactAddress: '',
				contactName: '',
				contactPhone: '',
				cover: '',
				deliverGoodsAddress: '',
				description: '',
				goodsCode: '',
				goodsSpecification: '',
				goodsSpecificationName: '',
				imgUrl: '',
				leastNum: '',
				logisticsType: '',
				name: '',
				otherBrandName: '',
				paramterMap: '',
				price: '',
				priceType: '',
				salesType: '',
				sort: '',
				status: '',
				topping: '',
				unit: '',
				videoUrl: '',
			},
			value: {},
			infoKey: 1,
			proKey: 1,
      drawerKey: 1,
      traceKey: 1
		}
	},
	created() {
    this.value = JSON.parse(this.$route.query.value)
    console.log(this.value);
		this.getList(this.value.id)
	},
	methods: {
		handleClick(val) {
      if (val.name === 'baseInfo') {
        this.proKey++
        this.traceKey++
			} else if(val.name === 'property') {
        this.infoKey++
        this.traceKey++
			} else {
        this.proKey++
        this.infoKey++
      }
    },
		getCheckHistory() {
			this.visible = true
		},
		handleOperate(flag) {
      let text = flag ? '上架' : '下架'
      let status = flag ? '2' : '9'
      this.$confirm(`此操作将${text}该商品, 是否继续?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					const param = {
						goodsId: this.value.id,
						status,
					}
					manufactureGoodsAudit(param).then((res) => {
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
						message: `取消${text}`,
					})
				})
    },
		handleClose(val) {
			this.visible = val
		},
		getList(id) {
			manufactureGoodsById(id).then((res) => {
        this.infoList = res.data
        console.log(res);
				let index = this.infoList.videoUrl.lastIndexOf('.')
				let fileName = this.infoList.videoUrl.substring(
					index + 1,
					this.infoList.videoUrl.length
				)
				this.infoList.videoList = [
					{
						src: this.infoList.videoUrl,
						type: `video/${fileName}`,
					},
				]
				this.infoList.imgList = this.infoList.imgUrl.split(',')
				this.infoList.poster = this.infoList.cover
				this.infoKey++
        this.proKey++
        this.traceKey++
			})
		},
		getPriceGroup(val) {
			if(val.length === 0) {
				this.infoList.price = '/'
			}else {
				this.infoList.price =	val[0] === val[1] ? val[0] : val.join('~')
			}
			
		}
	},
	filters: {
		noEmpty(val) {
			if (val === '' || val === 'undefined' || val === null) {
				let value = '/'
				return value
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.app-container {
	.goods-detail-top {
		width: 100%;
		.detail-title-row {
			padding: 12.5px;
			overflow: hidden;
			.detail-title {
				display: inline-block;
				font-size: 22px;
				font-weight: normal;
				h3 {
					font-weight: bold;
					display: inline-block;
					margin-left: 12.5px;
				}
			}
			.detail-btn-group {
				float: right;
			}
			h3 {
				margin: 0;
				padding: 15px 15px 15px 0;
			}
		}
		.detail-introduce-row {
			width: 100%;
			.detail-intro-item {
				display: inline-block;
				font-weight: bold;
				padding: 8px 25px 12px 15px;
				span {
					margin-left: 15px;
					font-weight: normal;
				}
			}
		}
	}
	.goods-detail-body {
		padding: 35px 15px;
	}
}
</style>
