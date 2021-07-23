<template>
  <div class="app-container">
    <h3>{{$route.meta.title}}</h3>
    <el-divider></el-divider>
    <el-form
      :model="queryParams"
      ref="queryForm"
      label-width="103px"
    >
      <el-form-item label="类型:">
        <el-radio-group v-model="queryParams.type">
          <el-radio :label="1">供应端</el-radio>
          <el-radio :label="2">采购端</el-radio>
          <el-radio :label="3">小程序端</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="位置:">
        <el-select v-model="queryParams.loaction">
          <el-option
            v-for="item in locationOptopns"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放日期:">
        <el-date-picker
          v-model="queryParams.times"
          style="width: 355px;"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="排序:">
        <el-input
          v-model="queryParams.sort"
          placeholder="100"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="广告栏图片:">
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
      <el-form-item label="选择跳转链接:">
        <el-select v-model="queryParams.link">
          <el-option v-for="item in linkOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <br><br>
        <el-input v-show="queryParams.link === '网站'" style="width: 200px;" placeholder="请填写网站路径" v-model="queryParams.webUrl"></el-input>
      </el-form-item>

    </el-form>
    <div class="bottom-tool-row">
      <div class="tool-group-col">
        <el-button @click="handleCancle">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addOrEditADColumn',
  data () {
    return {
      locationOptopns: [
        {
          value: '选项1',
          label: '首页',
        },
        {
          value: '选项2',
          label: 'banner图',
        }
      ],
      linkOptions: [
        {
          value: '商品详情页',
          label: '商品详情页'
        },
        {
          value: '店铺详情页',
          label: '店铺详情页'
        },
        {
          value: '网站',
          label: '网站'
        },
        {
          value: '营销管理',
          label: '营销管理'
        },
        {
          value: '优惠券领取中心',
          label: '优惠券领取中心'
        },
        {
          value: '不跳转',
          label: '不跳转'
        },
        
      ],
      queryParams: {
        type: 1,
        loaction: '',
        times: '',
        link: '',
        webUrl: ''
      },
      imageUrl: ''
    }
  },
  mounted () {
    console.log(this.$route);
  },
  methods: {
    handleAvatarSuccess () {

    },
    beforeAvatarUpload () {

    },
    handleCancle() {
      this.$router.go(-1)
    },
    handleSubmit() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .bottom-tool-row {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 56px;
    background-color: #fff;
    box-shadow: 1px 1px 1px #333;
    .tool-group-col {
      z-index: 999;
      position: fixed;
      bottom: 8px;
      right: 34px;
    }
  }
}
</style>