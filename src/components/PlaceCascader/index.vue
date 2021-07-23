<template>
	<el-cascader
		style="width: 250px;"
		v-model="localPlace"
		:options="placeOptions"
		:lazy="true"
		:key="key"
		@expand-change="handleChangePlace"
	>
	</el-cascader>
</template>

<script>
import {
	getProvince,
	getCityList,
	getDistrictList,
	getTownList,
} from '@/api/position'
export default {
	name: 'PlaceCascader',
	props: {
		place: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			localPlace: '',
			keyList: {
				provinceKey: null,
				cityKey: null,
				districtKey: null,
			},
			placeOptions: [],
			key: 1,
			visible: true,
		}
	},
	created() {
		this.handleFilterPlaceOption()
		this.localPlace = this.place
	},
	methods: {
		async handleFilterPlaceOption() {
			let { data } = await getProvince()
			data = data.map((item) => {
				item.value = item.provinceCode
				item.label = item.provinceName
				item.children = []
				return item
			})
			this.placeOptions = [...data]
		},
		async getPlaceInfo(type, id) {
			switch (type) {
				case 'city':
					let city = await getCityList(id)
					let cityData = city.data.map((item) => {
						item.value = item.cityCode
						item.label = item.cityName
						item.children = []
						return item
					})
					const cityKey = this.placeOptions.findIndex(
						(item) => item.value === id
					)
					this.keyList.cityKey = cityKey
					this.placeOptions[cityKey].children = [...cityData]
					break
				case 'district':
					let district = await getDistrictList(id)
					let districtData = district.data.map((item) => {
						item.value = item.districtCode
						item.label = item.districtName
						item.children = []
						return item
					})
					const districtKey = this.placeOptions[
						this.keyList.cityKey
					].children.findIndex((item) => item.value === id)
					this.keyList.districtKey = districtKey
					this.placeOptions[this.keyList.cityKey].children[
						districtKey
					].children = [...districtData]
					break
				case 'town':
					let town = await getTownList(id)
					let townData = town.data.map((item) => {
						item.value = item.townCode
						item.label = item.townName
						return item
					})
					const townKey = this.placeOptions[this.keyList.cityKey].children[
						this.keyList.districtKey
					].children.findIndex((item) => item.value === id)
					this.keyList.townKey = townKey
					this.placeOptions[this.keyList.cityKey].children[
						this.keyList.districtKey
					].children[townKey].children = [...townData]
					break
			}
			this.$emit('getPlaceInfo', {
				place: this.localPlace,
			})
		},
		handleVisible(val) {
			this.visible = val ? true : false
		},
		handleChangePlace(val) {
			if (val.length === 1) {
				this.getPlaceInfo('city', val[0])
			} else if (val.length === 2) {
				this.getPlaceInfo('district', val[1])
			} else if (val.length === 3) {
				this.getPlaceInfo('town', val[2])
      }
      this.localPlace = val[val.length - 1]
		},
	},
}
</script>

<style></style>
