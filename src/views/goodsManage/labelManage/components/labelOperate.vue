<template>
  <el-drawer
    :title="title"
    :visible.sync="drawer"
    direction="rtl"
    :before-close="handleClose"
  >
  <el-row style="padding: 0 20px;">
    <el-form :model="queryParams" label-width="103px">
      <el-form-item
        label="商品标签名称:"
        prop="labelName"
      >
        <el-input
          style="width: 250px;"
          placeholder="请输入标签名称"
          v-model="queryParams.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="色值:"
        prop="color"
      >
        <el-color-picker v-model="queryParams.rgb"></el-color-picker>
      </el-form-item>
      <el-form-item
        label="商品标签类型:"
        prop="labelType"
      >
        <el-select v-model="queryParams.type">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :offset="5">
          <el-button
            style="width: 180px;"
            type="primary"
            @click="handleSubmit"
          >提交</el-button>
        </el-col>
      </el-row>
    </el-form>
    </el-row>
  </el-drawer>
</template>

<script>
import {addTag, editTag, tagInfo} from '@/api/goodsManage/labelManage'
export default {
  name: 'labelOperate',
  props: {
    title: {
      type: String,
      default: '添加标签'
    },
    drawer: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      queryParams: {
        name: '',
        rgb: '#409EFF',
        type: ''
      },
      options: [
        {
          value: "1",
          label: 'S2B'
        }, {
          value: "2",
          label: 'B2C'
        }
      ]
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose', false)
    },
    handleSubmit() {
      this.title === '添加标签' ? this.handleAddTag() : this.handleEditTag()
    },
    handleAddTag() {
      addTag(this.queryParams).then(res => {
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
    handleEditTag() {
      const params = {
        id: this.id,
        ...this.queryParams
      }
      editTag(params).then(res => {
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
    getTagInfo(id) {
      tagInfo(id).then(res => {
        let {name, rgb, type} = res.data
        this.queryParams= {name, rgb, type}
      })
    }
  },
  watch: {
    title(newVal) {
			if (newVal === '编辑标签') {
				this.getTagInfo(this.id)
			} else {
				for (let i of Object.keys(this.queryParams)) {
					this.queryParams[i] = ''
				}
			}
		},
    id(newVal) {
      this.getTagInfo(this.id)
    }
  }
}
</script>

<style>
</style>