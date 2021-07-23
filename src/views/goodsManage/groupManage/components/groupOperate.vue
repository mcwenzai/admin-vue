<template>
  <el-drawer
    :title="title"
    :visible.sync="drawer"
    direction="rtl"
    :before-close="handleClose"
  >
    <el-row style="padding: 0 20px;">
      <el-form>
        <el-form-item
          label="分组名称:"
          prop="groupName"
        >
          <el-input
            style="width: 250px;"
            placeholder="请输入分组名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="分组图片:"
          prop="groupImg"
        >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-col :offset="3">
            <el-button
              style="width: 180px;"
              type="primary"
            >提交</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-drawer>
</template>

<script>
export default {
  name: 'groupOperate',
  props: {
    title: {
      type: String,
      default: '创建分组'
    },
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose', false)
    },
    handleAvatarSuccess () {

    },
    beforeAvatarUpload () {

    }
  }
}
</script>

<style>
</style>