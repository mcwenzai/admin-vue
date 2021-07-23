<template>
  <div class="app-container">
    <div class="goods-detail-top">
      <div class="detail-title-row">
        <el-row>
        <h3 class="detail-title">商品名称: <h3>红颜草莓</h3></h3>
        <div class="detail-btn-group">
          <el-button type="primary" @click="getCheckHistory">审核历史</el-button>
          <el-button type="primary" @click="handleNoPass">不通过</el-button>
          <el-button type="primary" @click="handlePass">通过</el-button>
        </div>
        </el-row>
      </div>
      <div class="detail-introduce-row">
        <el-row>
          <el-col :span="24">
          <span class="detail-intro-item">
            商品编号:
            <span>P535422287635935232</span>
          </span>
          <span class="detail-intro-item">
            发布时间:
            <span>2020-12-01 12:34</span>
          </span>
          <span class="detail-intro-item">
            商品审核状态:
            <span>上架/下架</span>
          </span>
          </el-col>
          <el-col :span="24">
          <span class="detail-intro-item">
            所属店铺:
            <span>小小德</span>
          </span>
          <span class="detail-intro-item">
            商品来源:
            <span>分销/发布</span>
          </span>
          <span class="detail-intro-item">
            商品价格(元):
            <span>12.00</span>
          </span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="goods-detail-body">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="baseInfo">
          <base-info></base-info>
        </el-tab-pane>
        <el-tab-pane label="产品参数" name="property">
          <property></property>
        </el-tab-pane>
      </el-tabs>
    </div>
    <aduit-history :drawer="visible" @handleClose="handleClose"></aduit-history>
  </div>
</template>

<script>
import baseInfo from '../components/baseInfo'
import property from '../components/property'
import aduitHistory from '../components/aduitHistory'
export default {
  name: 'goodsDetail',
  components: {
    baseInfo,
    property,
    aduitHistory
  },
  data() {
    return {
      activeName: 'baseInfo',
      visible: false
    }
  },
  created() {

  },
  methods: {
    handleClick() {

    },
    getCheckHistory() {
      this.visible = true
    },
    handleNoPass() {

    },
    handlePass() {

    },
    handleClose(val) {
      this.visible = val
    }
  }
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