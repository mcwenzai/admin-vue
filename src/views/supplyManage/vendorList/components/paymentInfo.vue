<template>
  <div class="payment-info-wrap" v-loading="true"
		element-loading-text="正在开发中......">
    <el-row class="first">
      <span>缴纳凭证:</span>
      <el-image
        style="width: 100px; height: 100px"
        fit="fill"
        :src="paymentImg"
        :preview-src-list="[paymentImg]"
      ></el-image>
    </el-row>
    <el-row class="second">
      <span>缴纳金额:</span>
      <span>300.00</span>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'paymentInfo',
  props: {

  },
  data () {
    return {
      paymentImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-info-wrap {
  padding: 20px;
  ::v-deep {
    .first {
      span {
        transform: translateY(-80px);
      }
    }
    span {
      display: inline-block;
      padding: 5px;
      line-height: 30px;
      vertical-align: middle;
      font-weight: 700;
      margin-right: 15px;
    }
  }
}
</style>