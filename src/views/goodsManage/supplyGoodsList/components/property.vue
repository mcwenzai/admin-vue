<template>
	<div class="goods-property-wrap">
		<el-form>
			<el-form-item
				class="goods-property-item"
				label="货品分类:"
				prop="goodsGroup"
			>
				{{ infoList.categoryName }}
			</el-form-item>
			<el-form-item class="goods-property-item" label="货品属性:">
				<br />
				<el-row v-if="priceType.length === 2 || priceType[0] === '批发价'">
					<span>货品规格: {{ infoList.goodsAttribute }}</span>
					<span>属性值: {{ infoList.goodsAttributeValue }}</span>
					<span>价格类型: 批发价</span>
					<br />
					<sht-table
						:border="true"
						:tableColumn="wholesaleColumn"
						:tableData="wholesaleData"
					>
					<template slot="goodsName">
						{{infoList.goodsName}}
					</template>
						<template slot="ladderNum" slot-scope="scope">
							<div
								class="table-row-item"
								v-for="(item, index) in scope.scope.goodsLadderPriceList"
								:key="index"
							>
								{{ item.ladderNum }}
							</div>
						</template>
						<template slot="price" slot-scope="scope">
							<div
								class="table-row-item"
								v-for="(item, index) in scope.scope.goodsLadderPriceList"
								:key="index"
							>
								{{ item.price }}
							</div>
						</template>
						<template slot="specificationImage" slot-scope="scope">
							<el-image
								style="width: 100px; height: 100px"
								fit="fill"
								:src="scope.scope.specificationImage"
								:preview-src-list="[scope.scope.specificationImage]"
							></el-image>
						</template>
					</sht-table>
				</el-row>
				<el-row v-if="priceType.length === 2 || priceType[0] === '一件代发'">
					<span>货品规格: {{ infoList.goodsAttribute }}</span>
					<span>属性值: 件</span>
					<span>价格类型: 一件代发</span>
					<br />
					<sht-table
						:border="true"
						:tableColumn="replaceColumn"
						:tableData="replaceData"
					>
					<template slot="goodsName">
						{{infoList.goodsName}}
					</template>
						<template slot="specificationImage" slot-scope="scope">
							<el-image
								style="width: 100px; height: 100px"
								fit="fill"
								:src="scope.scope.specificationImage"
								:preview-src-list="[scope.scope.specificationImage]"
							></el-image>
						</template>
					</sht-table>
				</el-row>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { SpecificationList } from '@/api/goodsManage/supplyAuditGoods'
export default {
	name: 'property',
	props: {
		infoList: {
			type: Object,
			default: {},
		},
	},
	data() {
		return {
			property: {
				wholesale: {
					weight: '',
				},
			},
			wholesale: {
				weight: 1,
				property: 1,
			},
			tableColumn: [],
			wholesaleColumn: [
				{
					name: '货品名称',
					key: 'goodsName',
					slotName: 'goodsName'
				},
				{
					name: '规格',
					key: 'goodsSpecificationName',
				},
				{
					name: '起批量',
					key: 'ladderNum',
					slotName: 'ladderNum',
				},
				{
					name: '价格',
					key: 'price',
					slotName: 'price',
				},
				{
					name: '库存量',
					key: 'quantity',
				},
				{
					name: '图片',
					key: 'specificationImage',
					slotName: 'specificationImage',
				},
			],
			replaceColumn: [
				{
					name: '货品名称',
					key: 'goodsName',
					slotName: 'goodsName'
				},
				{
					name: '规格',
					key: 'goodsSpecificationName',
				},
				{
					name: '建议售价',
					key: 'suggestPrice',
				},
				{
					name: '拿货价',
					key: 'price',
				},
				{
					name: '库存量',
					key: 'quantity',
				},
				{
					name: '图片',
					key: 'specificationImage',
					slotName: 'specificationImage',
				},
			],
			wholesaleData: [],
			replaceData: [],
			priceType: [],
			priceGroup: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		getList() {
			const params = {
				goodsId: this.infoList.id,
			}
			SpecificationList(params).then((res) => {
				console.log(res)
				if (Object.keys(res.data).length === 2) {
					this.priceType = ['一件代发', '批发价']
					this.wholesaleData = res.data['1']
					this.replaceData = res.data['2']
				} else if (Object.keys(res.data).length === 1) {
					this.priceType =
						Object.keys(res.data)[0] === '1' ? ['批发价'] : ['一件代发']
					Object.keys(res.data)[0] === '1'
						? (this.wholesaleData = res.data[0])
						: (this.replaceData = res.data[0])
				} else {
					this.priceType = []
				}
				this.wholesaleData.forEach((item, index) => {
					item.goodsLadderPriceList.sort(function(valueA, valueB) {
						if (valueA.ladderNum < valueB.ladderNum) return -1
						else if (valueA.ladderNum > valueB.ladderNum) return 1
						else return 0
					})
					for (let key = 0; key < item.goodsLadderPriceList.length; key++) {
						if (item.goodsLadderPriceList.length > 0) {
							maxPrice = item.goodsLadderPriceList[0].price
							minPrice = item.goodsLadderPriceList[0].price
						}
						if (maxPrice < item.goodsLadderPriceList[key].price) {
							maxPrice = item.goodsLadderPriceList[key].price
						}
						if (minPrice > item.goodsLadderPriceList[key].price) {
							minPrice = item.goodsLadderPriceList[key].price
						}
						if (item.goodsLadderPriceList[key + 1] !== undefined) {
							item.goodsLadderPriceList[key].ladderNum +=
								' ~ ' + (item.goodsLadderPriceList[key + 1].ladderNum - 1)
						} else {
							item.goodsLadderPriceList[key].ladderNum += ' 以上'
						}
					}
				})
				this.replaceData.forEach((item) => {
					if(maxPrice < item.price) {
						maxPrice = item.price
					}
					if(minPrice > item.price) {
						minPrice = item.price
					}
				})
				this.priceGroup = [minPrice, maxPrice]
				this.$emit('getPriceGroup', this.priceGroup)
			})
		},
	},
	filters: {
		sellType(val) {
			return val === 1 ? '批发价' : '一件代发'
		},
	},
}
</script>

<style lang="scss" scoped>
.goods-property-wrap {
	::v-deep {
		.el-form-item__label {
			font-size: 16px;
		}
	}
	span {
		display: inline-block;
		font-size: 14px;
		padding: 5px 25px 5px 0;
	}
}
::v-deep {
	.el-table .cell {
		padding: 0;
	}
}
.table-row-item {
	padding: 5px 0;
	border-bottom: 1px solid #dfe6ec;
	&:nth-child(1) {
		border-top: 1px solid #dfe6ec;
	}
}
</style>
