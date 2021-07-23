<template>
  <div class="app-container">
    <div class="info-wrap">
      <el-row>
        <el-col :lg="3" :md="12" :xs="24" :sm="24">
          <div>
            所属厂商:<span>{{ "小小德" }}</span>
          </div>
        </el-col>
        <el-col :lg="3" :md="12" :xs="24" :sm="24">
          <div>
            商品名称:<span>{{ "陕西苹果" }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="3" :md="12" :xs="24" :sm="24">
          <div>
            商品编码:<span>{{ "xxxxxxx" }}</span>
          </div>
        </el-col>
        <el-col :lg="3" :md="12" :xs="24" :sm="24">
          <div>
            发布时间:<span>{{ "2020-11-22" }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="3" :md="12" :xs="24" :sm="24">
          <div>
            状态:<span>{{ "正常" }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <el-row style="padding-top: 30px;">
      <goods-trace></goods-trace>
    </el-row>
  </div>
</template>

<script>
import goodsTrace from "@/views/goodsManage/supplyGoodsList/components/goodsTrace";
export default {
  name: "listDetail",
  components: {
    goodsTrace
  },
  data() {
    return {
      dataList: {}
    };
  },
  created() {
    this.dataList = this.$route.query.value;
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .info-wrap {
    font-weight: 600;
    div{
      padding: 3px 0;
      font-size: 16px;
      span {
        display: inline-block;
        padding: 5px;
        margin-left: 15px;
        font-weight: normal;
      }
    }
  }
}
</style>
