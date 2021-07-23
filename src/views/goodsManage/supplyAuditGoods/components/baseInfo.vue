<template>
	<div class="product-info-wrap">
		<el-form>
			<el-form-item label="货品编号:" prop="goodsCode">
				{{ baseInfo.goodsCode }}
			</el-form-item>
			<el-form-item label="联系人:" prop="contactName">
				{{ baseInfo.contactName }}
			</el-form-item>
			<el-form-item label="现货预售:" prop="salesType">
				{{ baseInfo.salesType | filterType }}
			</el-form-item>
			<el-form-item label="货品名称:" prop="name">
				{{ baseInfo.name }}
			</el-form-item>
			<el-form-item label="联系电话:" prop="contactPhone">
				{{ baseInfo.contactPhone }}
			</el-form-item>
			<el-form-item label="所属厂商:" prop="belongsManufacturer">
				{{ baseInfo.belongsManufacturer }}
			</el-form-item>
			<el-form-item label="预售时间:" prop="advanceSaleTime">
				{{ baseInfo.advanceSaleTime }}
			</el-form-item>
			<el-form-item label="商品标签:" prop="goodsTags">
				<el-tag
					style="margin-right: 5px;"
					v-for="(item, index) in baseInfo.tagList"
					:key="index"
				>
					{{ item }}
				</el-tag>
			</el-form-item>
			<el-form-item label="商品品牌:" prop="brandName">
				<el-tag effect="plain">{{ baseInfo.brandName }}</el-tag>
			</el-form-item>
			<el-form-item label="货品封面:" prop="cover">
				<el-image
					style="width: 100px; height: 100px"
					fit="fill"
					:src="baseInfo.cover"
					:preview-src-list="[baseInfo.cover]"
				></el-image>
			</el-form-item>
			<el-form-item label="货品视频:" prop="videoUrl">
				<video-player
					class="video-player"
					:sources="baseInfo.videoList"
					:poster="baseInfo.poster"
				></video-player>
			</el-form-item>
			<el-form-item label="货品图片:" prop="imgUrl">
				<el-image
					style="width: 100px; height: 100px; margin-left: 15px;"
					fit="fill"
					v-for="(item, index) in baseInfo.imgList"
					:key="index"
					:src="item"
					:preview-src-list="[item]"
				></el-image>
			</el-form-item>
			<el-form-item label="货源地:" prop="goodsPlace">
				{{ baseInfo.deliverGoodsAddress }}
			</el-form-item>
			<el-form-item label="货源描述:" prop="description">
				<el-input
					type="textarea"
					:rows="4"
					:readonly="true"
					v-model="baseInfo.description"
				>
				</el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'
export default {
	name: 'baseInfo',
	components: {
		VideoPlayer,
	},
	props: {
		infoList: {
			type: Object,
			default: {},
		},
	},
	data() {
		return {
			baseInfo: this.infoList,
		}
	},
	created() {},
	filters: {
		filterType(val) {
			return val === 1 ? '现货' : '预售'
		},
	},
	watch: {
		infoList(newVal) {
			this.baseInfo = this.infoList
		},
	},
}
</script>

<style lang="scss" scoped>
::v-deep {
	.video-player {
		.video-js {
			display: inline-block;
		}
		.video-js.vjs-fluid,
		.video-js.vjs-16-9,
		.video-js.vjs-4-3 {
			width: 300px;
			padding-top: 16.52%;
		}
	}
}
</style>
